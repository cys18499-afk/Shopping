"use server";

import { LoginInput, SignUpInput } from "@/src/types/user";
import { createClient } from "../supabase/server";
import { getRawPhone } from "../utils";
import { User } from "@supabase/supabase-js";

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
        isActive: true,
      },
    },
  });

  if (error) {
    console.error("DB 저장 에러 상세:", error);
    throw new Error(`Database error: ${error.message}`);
  }
}

export async function login({ email, password }: LoginInput): Promise<User> {
  if (!email || !password)
    throw new Error("이메일과 비밀번호를 모두 입력해주세요.");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("유저 정보를 가져올 수 없습니다.");
  }

  if (data.user.user_metadata?.isActive === false) {
    await supabase.auth.signOut(); // 발급된 세션 즉시 파기
    throw new Error("탈퇴 처리된 계정입니다.");
  }

  return data.user;
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

export async function deleteUser(): Promise<void> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    data: { isActive: false },
  });

  if (error) {
    throw new Error(error.message || "탈퇴 실패!!");
  }
}
