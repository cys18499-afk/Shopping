"use client";

import Link from "next/link";
import Input from "@/src/components/common/ui/Input";
import { signUp } from "@/src/lib/actions/user";
import { useRouter } from "next/navigation";
import FormRowVertical from "@/src/components/common/ui/FormRowVertical";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { SignupForm } from "@/src/types/user";
import { getRawPhone } from "@/src/lib/utils";

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupForm>({
    mode: "onChange",
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        userName: data.userName,
        phoneNumber: getRawPhone(data.phoneNumber),
      });
      router.replace("/");
    } catch (error: any) {
      if (error.message.includes("already registered")) {
        alert("이미 사용 중인 이메일입니다.");
      } else {
        alert("가입 중 오류 발생: " + error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-start pt-30 justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            계정 만들기
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            정보를 입력하여 회원가입을 완료하세요.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormRowVertical
              label="이름"
              required
              error={errors.userName?.message}
            >
              <Input
                {...register("userName", {
                  required: "이름을 입력해주세요",
                })}
                error={!!errors.userName}
              />
            </FormRowVertical>

            <FormRowVertical
              label="이메일"
              required
              error={errors.email?.message}
            >
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
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

            <FormRowVertical
              label="연락처"
              required
              error={errors.phoneNumber?.message}
            >
              <Input
                type="tel"
                placeholder="연락처를 입력해 주세요"
                {...register("phoneNumber", {
                  required: "연락처를 입력해주세요",
                  pattern: {
                    value: /^01[0-9]-?\d{3,4}-?\d{4}$/,
                    message: "연락처가 정확한지 확인해 주세요.",
                  },
                })}
                error={!!errors.phoneNumber?.message}
              />
            </FormRowVertical>

            <FormRowVertical
              label="비밀번호"
              required
              error={errors.password?.message}
            >
              <Input
                isPassword
                placeholder="8자 이상 입력"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자 이상이어야 합니다.",
                  },
                })}
                error={!!errors.password}
              />
            </FormRowVertical>

            <FormRowVertical
              label="비밀번호 확인"
              required
              error={errors.passwordConfirm?.message}
            >
              <Input
                placeholder="비밀번호 재입력"
                {...register("passwordConfirm", {
                  required: "비밀번호 확인을 입력해주세요",
                  validate: (value, formValues) =>
                    value === formValues.password ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                error={!!errors.passwordConfirm}
                isPassword
              />
            </FormRowVertical>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={clsx(
              "w-full py-3 text-sm font-medium",
              isValid
                ? "bg-black text-white cursor-pointer"
                : "bg-gray-200 text-black cursor-default",
            )}
          >
            가입하기
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium text-black hover:underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
