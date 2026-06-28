"use server";
import { FilterState, Review } from "@/src/types/review";
import { createClient } from "../supabase/server";

export async function getReviewsByProduct(slug: string): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      productId: product_id,
      userId: user_id,
      rating,
      content,
      size,
      images:review_images (
        url
      ),
      userName: user_name,
      products!inner(slug),
      createdAt: created_at
    `,
    )
    .eq("products.slug", slug)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  const formattedData: Review[] = (data || []).map((review: any) => ({
    ...review,
    images: review.images?.map((img: { url: string }) => img.url) || [],
  }));

  return formattedData as Review[];
}

export async function getReviewsByProductPaged(
  slug: string,
  page: number = 0,
  filters?: FilterState,
): Promise<Review[]> {
  const supabase = await createClient();

  let query = supabase
    .from("reviews")
    .select(
      `
      id, productId: product_id, userId: user_id,
      rating, content, size,
      images: review_images (url),
      userName: user_name,
      products!inner(slug),
      createdAt: created_at
    `,
    )
    .eq("products.slug", slug);

  const sortBy = filters?.sortBy ?? "latest";
  if (sortBy === "rating") {
    query = query
      .order("rating", { ascending: false })
      .order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  if (filters?.rating && filters.rating.length > 0) {
    query = query.in("rating", filters.rating);
  }

  if (filters?.size && filters.size.length > 0) {
    query = query.in("size", filters.size);
  }

  if (filters?.keyword && filters.keyword.trim() !== "") {
    query = query.ilike("content", `%${filters.keyword.trim()}%`);
  }

  // photoOnly 필터 사용 시 더 많은 데이터를 가져와서 필터링 후 페이지네이션 적용
  const itemsPerPage = 10;
  const fetchSize = filters?.photoOnly ? itemsPerPage * 3 : itemsPerPage;
  const offset = filters?.photoOnly ? page * itemsPerPage : page * itemsPerPage;

  const { data, error } = await query.range(offset, offset + fetchSize - 1);
  if (error) throw new Error(error.message);

  let formattedData: Review[] = (data || []).map((review: any) => ({
    ...review,
    images: review.images?.map((img: { url: string }) => img.url) || [],
  }));

  if (filters?.photoOnly) {
    formattedData = formattedData.filter((r) => r.images.length > 0);
    formattedData = formattedData.slice(0, itemsPerPage);
  }

  return formattedData;
}

export async function getMyReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      orderId:order_id,
      productId: product_id,
      userId: user_id,
      rating,
      content,
      size,
      userName: user_name,
      createdAt: created_at,
      images: review_images (url),
      products!inner (
        product_name,
        product_images!inner (
          url,
          sort_order
        )
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("products.product_images.sort_order", 0)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // 매핑 로직
  const formattedData: Review[] = (data as any[]).map((review) => {
    const pImage =
      review.products?.product_images?.find((img: any) => img.sort_order === 0)
        ?.url || "";

    return {
      id: review.id,
      orderId: review.orderId,
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      content: review.content,
      size: review.size,
      userName: review.userName,
      createdAt: review.createdAt,
      productName: review.products?.product_name || "",
      productImage: pImage,
      images: review.images?.map((img: any) => img.url) || [],
    };
  });

  return formattedData;
}
