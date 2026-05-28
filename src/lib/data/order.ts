"use server";

import { OrderWithItems } from "@/src/types/order";
import { createClient } from "../supabase/server";
import { formatPhone } from "../utils";
import { OrderSummaryItem } from "@/src/components/order/OrderStatusSummary";

export async function getOrderDetails(
  orderId: string,
): Promise<OrderWithItems> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
    id,
    status,
    address,
    createdAt:created_at,
    originalPrice:original_price,
    discountPrice:discount_price,
    totalPrice:total_price,

    customerName:customer_name,          
    customerNumber:customer_number,      
    receiverName:receiver_name,          
    receiverPhoneNumber:receiver_phone_number, 

    detailAddress:detail_address,
    shippingMessage:shipping_message,
    paymentMethod:payment_method,
    updatedAt:updated_at,
    orderItems:order_items (
      id,
      productName:product_name,
      quantity,
      size,
      slug,
      subtotal,
      thumbnail,
      orderId:order_id,
      productId:product_id,
      unitPrice:unit_price,
      discountRate:discount_rate
    )
  `,
    )
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("주문 내역 조회 실패:", error.message);
  }

  return {
    ...data,
    customerNumber: formatPhone(data?.customerNumber),
  } as OrderWithItems;
}

export async function getOrderList(): Promise<OrderWithItems[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
    id,
    status,
    address,
    createdAt:created_at,
    originalPrice:original_price,
    discountPrice:discount_price,
    totalPrice:total_price,

    customerName:customer_name,          
    customerNumber:customer_number,      
    receiverName:receiver_name,          
    receiverPhoneNumber:receiver_phone_number, 

    detailAddress:detail_address,
    shippingMessage:shipping_message,
    paymentMethod:payment_method,
    updatedAt:updated_at,
    orderItems:order_items (
      id,
      productName:product_name,
      quantity,
      size,
      slug,
      subtotal,
      thumbnail,
      orderId:order_id,
      productId:product_id,
      unitPrice:unit_price,
      discountRate:discount_rate
    )
  `,
    )
    .eq("user_id", user.id)
    .in("status", [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "completed",
    ])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("주문 내역 조회 실패:", error.message);
  }

  return data?.map((item) => ({
    ...item,
    customerNumber: formatPhone(item.customerNumber),
  })) as OrderWithItems[];
}

export async function getOrderStatus(): Promise<OrderSummaryItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("orders")
    .select("id, status,updatedAt:updated_at,createdAt:created_at")
    .eq("user_id", user.id)
    .in("status", ["pending", "completed"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("주문 내역 조회 실패:", error.message);
    throw new Error(error.message);
  }

  return (data as OrderSummaryItem[]) || [];
}
