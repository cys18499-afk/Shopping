"use server";
import { Address, AddressInput } from "@/src/types/address";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { getRawPhone } from "../utils";

export async function addAddress(formData: AddressInput): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  if (formData.isDefault) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);
  }

  const { error } = await supabase.from("addresses").insert([
    {
      user_id: user.id,
      address_name: formData.addressName || formData.receiverName,
      receiver_name: formData.receiverName,
      phone_number: getRawPhone(formData.receiverPhoneNumber),
      // secondary_phone: formData.secondaryPhone || null,
      postcode: formData.postcode,
      address: formData.address,
      detail_address: formData.detailAddress,
      is_default: formData.isDefault || false,
    },
  ]);

  if (error) {
    console.error("배송지 추가 실패:", error.message);
    throw new Error("배송지 저장 중 오류가 발생했습니다.");
  }
}

export async function deleteAddress(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("user_id", user.id)
    .eq("id", id);

  if (error) {
    console.error("배송지 삭제 실패:", error.message);
    throw new Error("배송지 삭제 중 오류가 발생했습니다.");
  }
}

export async function patchAddress(
  formData: Address,
  id: string,
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  if (formData.isDefault) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);
  }

  const { error } = await supabase
    .from("addresses")
    .update({
      address_name: formData.addressName,
      receiver_name: formData.receiverName,
      phone_number: getRawPhone(formData.receiverPhoneNumber),
      // secondary_phone: formData.secondaryPhone || null,
      postcode: formData.postcode,
      address: formData.address,
      detail_address: formData.detailAddress,
      is_default: formData.isDefault,
    })
    .eq("user_id", user.id)
    .eq("id", id);

  if (error) {
    console.error("배송지 수정 실패:", error.message);
    throw new Error("배송지 수정 중 오류가 발생했습니다.");
  }
  revalidatePath("/mypage/address");
}
