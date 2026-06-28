"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/src/components/common/ui/Input";
import Modal from "@/src/components/common/modals/Modal";
import FormRowVertical from "@/src/components/common/ui/FormRowVertical";
import { useModal } from "@/src/hooks/useModal";
import { updatePassword } from "@/src/lib/actions/user";

type PasswordForm = {
  password: string;
  confirmPassword: string;
};

interface Props {
  initialUserInfo: any;
}

export default function UserInfoEditForm({ initialUserInfo }: Props) {
  const [emailPrefix, setEmailPrefix] = useState<string>("");
  const [emailDomain, setEmailDomain] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const email = initialUserInfo.email.split("@");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordForm>({ mode: "onChange" });

  const onSubmit = async (data: PasswordForm) => {
    try {
      await updatePassword({ newPassword: data.password });
      closeModal();
    } catch (err: any) {
      alert("기존 비밀번호와 다른 비밀번호를 입력해주세요");
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "직접 입력") {
      setIsCustom(true);
      setEmailDomain("");
    } else {
      setIsCustom(false);
      setEmailDomain(value);
    }
  };
  useEffect(() => {
    setEmailPrefix(email[0]);
    setEmailDomain(email[1]);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 px-4">
        {/* <span className="w-32 font-medium text-gray-600">아이디</span>
          <span className="text-gray-900">
            {initialUserInfo?.email || "cys23568@k"}
          </span> */}
        <div className="flex items-start">
          <span className="w-32 font-medium text-gray-600 mt-2">
            이메일 <span className="text-red-500">*</span>
          </span>
          <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={emailPrefix}
                onChange={(e) => setEmailPrefix(e.target.value)}
              />
              <span className="text-gray-500">@</span>
              <Input
                type="text"
                value={emailDomain}
                readOnly={!isCustom}
                onChange={(e) => setEmailDomain(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-200 w-full bg-white px-4 py-2 outline-none"
              onChange={handleDomainChange}
              value={isCustom ? "직접 입력" : emailDomain}
            >
              <option value="직접 입력">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="kakao.com">kakao.com</option>
            </select>
          </div>
        </div>

        <div className="flex items-start">
          <span className="w-32 font-medium text-gray-600 mt-1">비밀번호</span>
          <div className="flex flex-col gap-3">
            <span className="text-gray-900">********</span>
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 bg-white w-max cursor-pointer hover:border-black"
              onClick={openModal}
            >
              비밀번호 변경하기
            </button>
          </div>
        </div>
      </div>

      {/* 비밀번호 변경 모달 */}
      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-[430px]">
            <div className="flex items-center px-6 py-2 border-b border-gray-200">
              <span className="text-[14px] font-medium mx-auto">
                비밀번호 변경
              </span>
            </div>
            <div className="p-7">
              <p className="text-[17px] py-3">
                새로운 비밀번호를 설정해 주세요
              </p>
              <FormRowVertical
                label="비밀번호"
                required
                error={errors.password?.message}
              >
                <Input
                  isPassword
                  placeholder="8자리 이상"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: { value: 8, message: "8자 이상 입력해주세요" },
                  })}
                  error={!!errors.password}
                />
              </FormRowVertical>
              <FormRowVertical error={errors.confirmPassword?.message}>
                <Input
                  isPassword
                  placeholder="비밀번호를 확인해 주세요"
                  {...register("confirmPassword", {
                    required: "비밀번호 확인을 입력해주세요",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "비밀번호가 일치하지 않습니다.",
                  })}
                  error={!!errors.confirmPassword}
                />
              </FormRowVertical>
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full bg-black text-white py-3 text-[14px] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "변경 중..." : "확인"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
