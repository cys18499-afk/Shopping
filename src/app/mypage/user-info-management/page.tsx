"use client";

import Form from "@/src/components/common/ui/Form";
import FormRowVertical from "@/src/components/common/ui/FormRowVertical";
import Input from "@/src/components/common/ui/Input";
import { verifyCurrentPassword } from "@/src/lib/actions/user";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserInfoPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setIsPending(true);

    try {
      await verifyCurrentPassword({ password });
      router.push("user-info-management/edit");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="mb-10 border-b-2 border-black text-[14px] py-1 "></div>

      <div className="flex flex-col items-center justify-center mt-20  p-10 ">
        <div className="flex flex-col justify-center items-center mb-10">
          <h2 className="mb-6 text-xl font-semibold">
            회원님의 비밀번호를 입력해 주세요
          </h2>
          <span className="w-57 text-center text-gray-500">
            회원님의 개인 정보 보호를 위한 본인 확인 절차를 위해 사용됩니다
          </span>
        </div>

        <Form onSubmit={handleSubmit} className="w-90">
          <FormRowVertical error={error && error}>
            <Input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormRowVertical>

          <button
            type="submit"
            disabled={password.length < 8 || isPending}
            className={clsx(
              "w-full py-1 mt-4 text-white",
              password.length >= 8 && !isPending
                ? "bg-black cursor-pointer"
                : "bg-gray-200",
            )}
          >
            확인
          </button>
        </Form>
      </div>
    </>
  );
}
