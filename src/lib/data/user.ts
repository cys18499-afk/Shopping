import { UserInfo } from "@/src/types/user";
import { createClient } from "../supabase/server";
import { User } from "@supabase/supabase-js";
import { formatPhone } from "../utils";

export async function getUserInfo(): Promise<UserInfo | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select(
      "id,email, userName:user_name, phoneNumber:phone_number, availableCredit:available_credit",
    )
    .eq("id", user.id)
    .single();

  if (!data || error) {
    console.log(data);
    console.error(error);
    throw new Error(`문제가 생겼어요: ${error?.message || error}`);
  }

  return {
    ...data,
    phoneNumber: formatPhone(data.phoneNumber),
  } as UserInfo;
}

export async function getAuthUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return user;
}
