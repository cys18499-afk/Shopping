"use server";

import { CreateOrderPayload } from "@/src/types/order";
import { createClient } from "../supabase/server";
import { calculateDisplayPrice, getRawPhone } from "../utils";
import { revalidatePath } from "next/cache";
import { addAddress } from "./address";

export async function createOrder(
  formData: CreateOrderPayload,
): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orderData, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user ? user.id : null,
        customer_name: formData.customerName,
        customer_number: getRawPhone(formData.customerNumber),
        email: formData.email,

        receiver_name: formData.receiverName,
        receiver_phone_number: getRawPhone(formData.receiverPhoneNumber),

        original_price: formData.originalPrice,
        discount_price: formData.discountPrice,
        total_price: formData.totalPrice,
        payment_method: formData.paymentMethod,

        status: "pending",

        address: formData.address,
        postcode: formData.postcode,
        detail_address: formData.detailAddress,
        shipping_message: formData.shippingMessage,
        used_credit: formData.usedCredit ?? 0,
      },
    ])
    .select("id")
    .single();

  if (error) {
    throw new Error(`DB 저장 실패: ${error.message} (코드: ${error.code})`);
  }
  if (user) {
    const { data: existingAddress } = await supabase
      .from("addresses")
      .select("id")
      .eq("user_id", user.id)
      .eq("address", formData.address)
      .eq("postcode", formData.postcode)
      .maybeSingle();

    if (!existingAddress) {
      await supabase.from("addresses").insert({
        user_id: user.id,
        address_name: formData.receiverName + "의 배송지",
        receiver_name: formData.receiverName,
        phone_number: getRawPhone(formData.receiverPhoneNumber),
        postcode: formData.postcode,
        address: formData.address,
        detail_address: formData.detailAddress,
        is_default: true,
      });
    }
  }

  const itemsToInsert = formData.orderItems.map((item) => ({
    order_id: orderData.id,
    product_id: item.productId,
    product_name: item.productName,
    unit_price: item.unitPrice,
    discount_rate: item.discountRate,
    quantity: item.quantity,
    subtotal:
      calculateDisplayPrice(item.unitPrice, item.discountRate) * item.quantity,
    thumbnail: item.thumbnail,
    slug: item.slug,
    size: item.size,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsToInsert);
  if (itemsError) throw new Error("주문 상세 생성 실패");

  return orderData.id;
}

export async function approveTossPayment(
  paymentKey: string,
  orderId: string,
  amount: number,
): Promise<any> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: order } = await supabase
    .from("orders")
    .select("totalPrice:total_price, usedCredit:used_credit")
    .eq("id", orderId)
    .single();

  if (!order || order.totalPrice !== Number(amount)) {
    await supabase
      .from("orders")
      .update({ status: "failed" })
      .eq("id", orderId)
      .select();
    throw new Error("결제 금액이 일치하지 않습니다.");
  }

  const secretKey = process.env.TOSSPAY_SECRET_KEY;
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    },
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "결제 승인 API 호출 실패");
  }
  const result = await response.json();

  if (result.status === "DONE") {
    await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("id", orderId);

    if (user?.id) {
      const usedCredit = order.usedCredit || 0;
      const earnedCredit = Math.floor(amount * 0.03);
      const creditChange = earnedCredit - usedCredit;

      const { data: userData } = await supabase
        .from("users")
        .select("availableCredit:available_credit")
        .eq("id", user.id)
        .single();

      const currentCredit = userData?.availableCredit ?? 0;
      const newCredit = Math.max(0, currentCredit + creditChange);

      await supabase
        .from("users")
        .update({ available_credit: newCredit })
        .eq("id", user.id);

      if (earnedCredit > 0) {
        await supabase.from("credit").insert([
          {
            user_id: user.id,
            type: "earn",
            amount: earnedCredit,
            description: `주문 #${orderId} 구매 적립`,
            created_at: new Date().toISOString(),
          },
        ]);
      }

      if (usedCredit > 0) {
        await supabase.from("credit").insert([
          {
            user_id: user.id,
            type: "use",
            amount: usedCredit,
            description: `주문 #${orderId} 적립금 사용`,
            created_at: new Date().toISOString(),
          },
        ]);
      }

      await supabase.from("carts").delete().eq("user_id", user?.id);
    }
  }

  revalidatePath("/cart");
  return result;
}

export async function getOrderInfo(orderId: string): Promise<any> {
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("availableCredit:available_credit, usedCredit:used_credit")
    .eq("id", orderId)
    .single();

  return order;
}
