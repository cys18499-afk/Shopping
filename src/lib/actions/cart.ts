"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { CartItem } from "@/src/types/cart";

export async function addToCart(item: CartItem): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다");

  try {
    const { data: existing } = await supabase
      .from("carts")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", item.productId)
      .eq("size", item.size)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("carts")
        .update({ quantity: existing.quantity + item.quantity })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("carts")
        .insert({
          user_id: user.id,
          product_id: item.productId,
          product_name: item.productName,
          unit_price: item.unitPrice,
          discount_rate: item.discountRate,
          thumbnail: item.thumbnail,
          size: item.size,
          quantity: item.quantity,
          slug: item.slug,
        })
        .select();
    }

    revalidatePath("/cart");
  } catch (error) {
    console.error("장바구니 담기 실패", error);
    throw new Error("장바구니에 상품을 담지 못했습니다.");
  }
}

export async function updateCartItem(
  id: string,
  quantity: number,
  newSize?: string,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const updateData: { quantity: number; size?: string } = { quantity };
    if (newSize) updateData.size = newSize;

    const { error } = await supabase
      .from("carts")
      .update(updateData)
      .eq("user_id", user.id)
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/cart");
  } catch (error) {
    console.error("장바구니 수정 실패", error);
    throw new Error("장바구니 상품을 수정하지 못했습니다.");
  }
}

export async function removeItemsFromCart(ids: string[]): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || ids.length === 0) return;

  try {
    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("user_id", user.id)
      .in("id", ids);

    if (error) throw error;

    revalidatePath("/cart");
  } catch (error) {
    console.error("장바구니 삭제 실패", error);
    throw new Error("장바구니에서 상품을 삭제하지 못했습니다.");
  }
}
