"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Form from "@/src/components/common/ui/Form";
import FormRowVertical from "@/src/components/common/ui/FormRowVertical";
import Input from "@/src/components/common/ui/Input";
import { login } from "@/src/lib/actions/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
  saveEmail: boolean;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      saveEmail: false,
    },
  });

  useEffect(() => {
    const savedCheck = localStorage.getItem("saveEmail");
    const savedEmail = localStorage.getItem("email");

    if (savedCheck === "true" && savedEmail) {
      setValue("email", savedEmail);
      setValue("saveEmail", true);
    }
  }, []);

  const onSubmit = async (data: LoginForm) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });

      if (data.saveEmail) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("saveEmail", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("saveEmail");
      }

      router.replace("/");
    } catch (err) {
      console.error("로그인 실패");
    }
  };

  return (
    <div className="flex min-h-screen items-start pt-30 justify-center bg-white">
      <div className="w-full max-w-md bg-white p-10">
        <h1 className="text-2xl font-semibold text-center mb-8">로그인</h1>

        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormRowVertical label="아이디" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="이메일"
              autoComplete="userName"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
              error={!!errors.email}
            />
          </FormRowVertical>

          <FormRowVertical label="비밀번호" error={errors.password?.message}>
            <Input
              isPassword
              placeholder="비밀번호"
              autoComplete="current-password"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
              })}
              error={!!errors.password}
            />
          </FormRowVertical>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black text-white text-[11px] cursor-pointer hover:bg-[#2b2b2b] transition-colors"
          >
            로그인
          </button>

          <div className="flex justify-between items-center mt-1 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-black"
                {...register("saveEmail")}
              />
              <span className="text-xs text-black">이메일 저장하기</span>
            </label>

            {/* <div className="flex gap-3">
              <Link href="/find-id" className="text-xs text-black">
                아이디 찾기
              </Link>
              <Link href="/find-password" className="text-xs text-black">
                비밀번호 찾기
              </Link>
            </div> */}
          </div>
        </Form>

        <div className="flex flex-col gap-2 my-3">
          <Link
            href="/signup"
            className="text-center px-4 py-2 text-[12px] text-gray-600 border border-gray-200"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
