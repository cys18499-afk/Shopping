"use server";

import { Review } from "@/src/types/review";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

const BUCKET = "reviews_images";

export async function createReview(
  formData: Omit<
    Review,
    | "id"
    | "userId"
    | "createdAt"
    | "reviewImages"
    | "userName"
    | "productName"
    | "productImage"
  > & {
    imageFiles: File[];
    orderId: string;
  },
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: reviewData, error: reviewError } = await supabase
    .from("reviews")
    .insert([
      {
        user_name: user.user_metadata.name,
        product_id: formData.productId,
        order_id: formData.orderId,
        user_id: user.id,
        rating: formData.rating,
        content: formData.content,
        size: formData.size,
      },
    ])
    .select()
    .single();

  if (reviewError) {
    throw new Error(`리뷰 저장 실패: ${reviewError.message}`);
  }

  const reviewId = reviewData.id;

  if (formData.imageFiles && formData.imageFiles.length > 0) {
    for (const file of formData.imageFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${formData.productId}/${Date.now()}-${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file);

      if (uploadError) {
        console.error("Storage 업로드 에러:", uploadError.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);

      const { error: imageDbError } = await supabase
        .from("review_images")
        .insert([{ review_id: reviewId, url: publicUrl }]);

      if (imageDbError) {
        console.error("이미지 DB 저장 에러:", imageDbError.message);
      }
    }
  }

  revalidatePath(`/mypage/order/list`);
}

export async function updateReview(
  reviewId: string,
  updateData: {
    rating: number;
    content: string;
    size: string;
    existingImages: string[];
    newImages?: File[];
  },
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { error: reviewError } = await supabase
    .from("reviews")
    .update({
      rating: updateData.rating,
      content: updateData.content,
      size: updateData.size,
    })
    .eq("id", reviewId)
    .eq("user_id", user.id);

  if (reviewError) throw new Error(`리뷰 수정 실패: ${reviewError.message}`);

  const { data: oldImages } = await supabase
    .from("review_images")
    .select("url")
    .eq("review_id", reviewId);

  if (oldImages) {
    const deletedUrls = oldImages
      .map((img) => img.url)
      .filter((url) => !updateData.existingImages.includes(url));

    if (deletedUrls.length > 0) {
      await deleteStorageFiles(deletedUrls);
      for (const url of deletedUrls) {
        await supabase
          .from("review_images")
          .delete()
          .eq("review_id", reviewId)
          .eq("url", url);
      }
    }
  }

  if (updateData.newImages && updateData.newImages.length > 0) {
    const uploadPromises = updateData.newImages.map(async (file) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${reviewId}/${Date.now()}_${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file);

      if (uploadError)
        throw new Error(`이미지 업로드 실패: ${uploadError.message}`);

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);

      return { review_id: reviewId, url: publicUrl };
    });

    const newImageObjects = await Promise.all(uploadPromises);
    await supabase.from("review_images").insert(newImageObjects);
  }

  revalidatePath("/mypage/order/list");
}

export async function deleteReview(reviewId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "권한이 없습니다." };

  const { data: images } = await supabase
    .from("review_images")
    .select("url")
    .eq("review_id", reviewId);

  if (images && images.length > 0) {
    await deleteStorageFiles(images.map((img) => img.url));
  }

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/mypage/reviews");
}

async function deleteStorageFiles(urls: string[]) {
  const supabase = await createClient();

  const paths = urls
    .map((url) => {
      const parts = url.split(`/storage/v1/object/public/${BUCKET}/`);
      return parts[1];
    })
    .filter(Boolean);

  if (paths.length > 0) {
    await supabase.storage.from(BUCKET).remove(paths);
  }
}
