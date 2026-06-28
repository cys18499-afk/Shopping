"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

const logError = (context: string, error: unknown) => {
  console.error(`[${context}]`, error instanceof Error ? error.message : error);
};

export async function toggleWishlist(productId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error();

  try {
    const { data: existing } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabase.from("wishlists").insert({
        user_id: user.id,
        product_id: productId,
      });

      if (error) throw error;
    }

    revalidatePath("/wishlist");
    revalidatePath("/");
  } catch (error) {
    throw new Error();
  }
}

export async function clearWishlist(): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error();

  try {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/mypage/wishlist");
    revalidatePath("/");
  } catch (error) {
    throw new Error();
  }
}
