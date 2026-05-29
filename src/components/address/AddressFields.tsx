"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AddressInput } from "@/src/types/address";
import FormRowVertical from "../common/ui/FormRowVertical";
import Input from "@/src/components/common/ui/Input";
import { useAuthStore } from "@/src/store/AuthStore";

export default function AddressFields() {
  const {
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useFormContext<AddressInput>();

  const [isChecked, setIsChecked] = useState(false);

  const { user } = useAuthStore();
  const { watch } = useFormContext();

  const customerName = watch("customerName");
  const customerNumber = watch("customerNumber");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSearchAddress = () => {
    if (!window.daum) {
      alert("주소검색 서비스를 불러오는 중입니다.");
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setValue("postcode", data.zonecode, { shouldValidate: true });
        setValue("address", data.address, { shouldValidate: true });
        setFocus("detailAddress");
      },
    }).open();
  };

  const handleToggleSameAsOrderer = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked) {
      setValue("receiverName", customerName || "", { shouldValidate: true });
      setValue("receiverPhoneNumber", customerNumber || "", {
        shouldValidate: true,
      });
    } else {
      setValue("receiverName", "", { shouldValidate: true });
      setValue("receiverPhoneNumber", "", { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {user && (
        <FormRowVertical label="배송지명">
          <Input placeholder="예: 우리집, 회사" {...register("addressName")} />
        </FormRowVertical>
      )}

      <div className="flex items-center gap-2">
        <label htmlFor="id" className="text-[14px] cursor-pointer">
          주문자와 동일
        </label>
        <input
          type="checkbox"
          id="id"
          className="accent-black cursor-pointer"
          checked={isChecked}
          onChange={handleToggleSameAsOrderer}
        />
      </div>

      <FormRowVertical
        label="받는 분"
        required
        error={errors.receiverName?.message}
      >
        <Input
          placeholder="받는 분의 이름을 입력해 주세요"
          {...register("receiverName", {
            required: "받는 분의 이름은 필수입니다",
          })}
          error={!!errors.receiverName?.message}
        />
      </FormRowVertical>

      <FormRowVertical
        label="연락처"
        required
        error={errors.receiverPhoneNumber?.message}
      >
        <Input
          type="tel"
          placeholder="연락처를 입력해 주세요"
          {...register("receiverPhoneNumber", {
            required: "연락처를 입력해주세요",
            pattern: {
              value: /^01[0-9]-?\d{3,4}-?\d{4}$/,
              message: "연락처가 정확한지 확인해 주세요.",
            },
          })}
          error={!!errors.receiverPhoneNumber?.message}
        />
      </FormRowVertical>

      <FormRowVertical>
        <div className="space-y-1">
          <div className="relative">
            <p className="block w-full text-[14px]">주소</p>
            <div className="absolute w-[3px] h-[4px] top-1 left-7 rounded-sm border-red-500 bg-red-500 "></div>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="우편번호"
              {...register("postcode", { required: true })}
              readOnly
            />
            <button
              type="button"
              className="bg-black text-white text-[12px] px-4 py-2 shrink-0 whitespace-nowrap cursor-pointer"
              onClick={handleSearchAddress}
            >
              주소찾기
            </button>
          </div>
          <Input
            placeholder="주소"
            readOnly
            {...register("address", { required: true })}
          />

          <Input
            placeholder="상세주소"
            {...register("detailAddress", {
              required: "우편번호/주소/상세주소를 입력해주세요.",
            })}
            error={!!errors.detailAddress?.message}
          />
        </div>
      </FormRowVertical>
    </div>
  );
}
