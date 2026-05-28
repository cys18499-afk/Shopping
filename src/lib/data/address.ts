import { Address } from "@/src/types/address";
import { createClient } from "../supabase/server";
import { formatPhone } from "../utils";

export async function getAddress(): Promise<Address[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("addresses")
    .select(
      `
      id,
      userId:user_id,
      addressName:address_name,
      receiverName:receiver_name,
      receiverPhoneNumber:phone_number,
      postcode,
      address,
      detailAddress:detail_address,
      isDefault:is_default,
      createdAt:created_at
    `,
    )
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("주소 불러오기 실패:", error.message);
    return [];
  }

  return data?.map((item) => ({
    ...item,
    receiverPhoneNumber: formatPhone(item.receiverPhoneNumber),
  })) as Address[];
}
