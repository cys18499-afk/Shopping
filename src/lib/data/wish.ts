import { Product } from "@/src/types/product";
import { createClient } from "../supabase/server";

export async function getWishIds(): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlists")
    .select("product_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("위시 ID 로딩 실패:", error.message);
    return [];
  }

  return data.map((item) => item.product_id);
}

export async function getWishProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlists")
    .select(
      `
      id,
      product:products!inner (
        id, 
        productName:product_name, 
        description, 
        slug, 
        stock, 
        colors, 
        sizes,
        categoryId:category_id,
        unitPrice:unit_price,
        discountRate:discount_rate,
        thumbnail:product_images!inner (url)
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("product.product_images.image_type", "thumbnail")
    .in("product.product_images.sort_order", [0, 1])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("위시리스트 로딩 실패:", error.message);
    return [];
  }

  return (data as any[]).map((item) => {
    const product = item.product;
    return {
      ...product,
      thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
      images: [],
      wishlistId: item.id,
    };
  });
}
