"use server";
import { Product } from "@/src/types/product";
import { createClient } from "../supabase/server";

export async function getProducts({
  type,
  categoryName = "ALL",
}: {
  type?: string;
  categoryName?: string;
}): Promise<Product[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(
      `
  id, description, slug, stock, colors, sizes,
  productName:product_name,
  unitPrice:unit_price,
  discountRate:discount_rate,
  categories!inner (
    name
  ),
  thumbnail:product_images!inner(url,sort_order)
`,
    )
    .eq("product_images.image_type", "thumbnail")
    .order("created_at", { ascending: false })
    .order("sort_order", { foreignTable: "thumbnail", ascending: true })
    .limit(10);

  if (type) {
    query = query.eq(type, true);
  }
  const cleanedCategory = categoryName.trim();

  if (cleanedCategory && cleanedCategory.toUpperCase() !== "ALL") {
    query = query.ilike("categories.name", cleanedCategory);
  }

  const { data, error } = await query;

  if (error) {
    console.error("조회 에러", error.message);
    return [];
  }

  return (data as any[]).map((product) => ({
    ...product,
    thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
    categoryName: product.categories?.name,
  })) as Product[];
}

export async function getProductDetail(slug: string): Promise<Product> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, description, slug, stock, colors, sizes,
      productName:product_name,
      categoryId:category_id,
      unitPrice:unit_price,
      discountRate:discount_rate,
      product_images (url, sort_order, image_type)
    `,
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("제품을 찾을 수 없습니다:", error?.message);
    throw new Error("Product not found");
  }
  const allImages = data.product_images || [];

  return {
    ...data,
    thumbnail: allImages
      .filter((img: any) => img.image_type === "thumbnail")
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((img: any) => img.url),
    images: allImages
      .filter((img: any) => img.image_type === "detail")
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((img: any) => img.url),
  } as unknown as Product;
}

export async function getProductSearch(
  query: string,
  sort?: string,
): Promise<Product[]> {
  if (!query.trim()) return [];
  const supabase = await createClient();

  let orderColumn = "created_at";
  let isAscending = false;

  if (sort === "price_asc") {
    orderColumn = "unit_price";
    isAscending = true;
  } else if (sort === "price_desc") {
    orderColumn = "unit_price";
    isAscending = false;
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, description, slug, stock, colors, sizes,
      productName:product_name,
      categoryId:category_id,
      unitPrice:unit_price,
      discountRate:discount_rate,
      thumbnail:product_images!inner (url)
    `,
    )
    .ilike("product_name", `%${query}%`)
    .eq("product_images.image_type", "thumbnail")
    .order(orderColumn, { ascending: isAscending });

  if (error) {
    console.error("상품 검색 에러:", error.message);
    return [];
  }

  return (data as any[]).map((product) => ({
    ...product,
    thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
    images: [],
  })) as Product[];
}
