"use server";

import { LoginInput, SignUpInput } from "@/src/types/user";
import { createClient } from "../supabase/server";
import { getRawPhone } from "../utils";

export async function signUp({
  email,
  password,
  userName,
  phoneNumber,
}: SignUpInput): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: userName,
        phone_number: getRawPhone(phoneNumber),
      },
    },
  });

  if (error) {
    console.error("DB 저장 에러 상세:", error);
    throw new Error(`Database error: ${error.message}`);
  }
}

export async function login({ email, password }: LoginInput): Promise<void> {
  if (!email || !password)
    throw new Error("이메일과 비밀번호를 모두 입력해주세요.");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
}

export async function verifyCurrentPassword({
  password,
}: {
  password: string;
}): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password,
  });

  if (error) throw new Error("현재 비밀번호가 일치하지 않습니다.");
}

export async function updatePassword({
  newPassword,
}: {
  newPassword: string;
}): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error)
    throw new Error(error.message || "비밀번호 변경 중 오류가 발생했습니다.");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
