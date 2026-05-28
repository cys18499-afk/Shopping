"use server";
import { CartItem } from "@/src/types/cart";
import { createClient } from "../supabase/server";

export async function getCartItem(): Promise<CartItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("carts")
    .select(
      `
      id,
      size,
      quantity,
      product:products!inner (
        id,
        productName:product_name,
        unitPrice:unit_price,
        discountRate:discount_rate,
        slug,
        thumbnail:product_images!inner (url)
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("product.thumbnail.image_type", "thumbnail")
    .eq("product.thumbnail.sort_order", 0)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("카트 로딩 실패:", error.message);
    return [];
  }

  return data.map(({ id, size, quantity, product }: any) => ({
    id,
    productId: product.id,
    productName: product.productName,
    unitPrice: product.unitPrice,
    discountRate: product.discountRate ?? undefined,
    size,
    quantity,
    slug: product.slug,
    thumbnail: product.thumbnail[0]?.url ?? "",
  }));
}
