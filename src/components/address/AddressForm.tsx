"use client";

import { FormProvider, useForm } from "react-hook-form";
import Form from "@/src/components/common/ui/Form";
import Input from "@/src/components/common/ui/Input";
import FormRowVertical from "../common/ui/FormRowVertical";
import clsx from "clsx";
import React, { useEffect } from "react";
import { AddressInput, UpdateAddressRequest } from "@/src/types/address";
import AddressFields from "./AddressFields";

interface AddressFormProps {
  onSuccess: (data: any) => void;
  isFirstAddress?: boolean;
  initialData?: UpdateAddressRequest | null;
  action?: (isValid: boolean) => React.ReactNode;
  hideHeader?: boolean;
}

export default function AddressForm({
  onSuccess,
  isFirstAddress,
  initialData,
  action,
  hideHeader = false,
}: AddressFormProps) {
  const methods = useForm<AddressInput>({
    mode: "onChange",
    defaultValues: initialData || {
      addressName: "",
      receiverName: "",
      receiverPhoneNumber: "",
      // secondaryPhone: "",
      postcode: "",
      address: "",
      detailAddress: "",
      isDefault: false,
    },
  });
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = methods;
  const watchedIsDefault = watch("isDefault");

  useEffect(() => {
    if (isFirstAddress) {
      setValue("isDefault", true);
    }
  }, [isFirstAddress, setValue]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSuccess)}>
        <div className="w-[440px] bg-white  border border-gray-200 shadow-xl overflow-hidden">
          {!hideHeader && (
            <div className="flex items-center px-3 py-2 border-b border-gray-200">
              <span className="text-[14px] font-medium mx-auto">
                {initialData ? "수정" : "작성"}
              </span>
            </div>
          )}
          <div className="px-3">
            <AddressFields />

            <div className="flex gap-1 items-center mt-4">
              <input
                className={clsx(
                  "cursor-default",
                  isValid && "accent-black cursor-pointer",
                )}
                type="checkbox"
                id="is_default"
                {...methods.register("isDefault")}
                disabled={!isValid}
                checked={isFirstAddress ? true : watchedIsDefault}
              />
              <label
                htmlFor="is_default"
                className={clsx(
                  "text-[12px] cursor-default",
                  watchedIsDefault && isValid ? "text-black" : "text-gray-500",
                  isValid && "cursor-pointer",
                )}
              >
                기본배송지로 등록
              </label>
            </div>

            <div className="p-5">
              {typeof action === "function" ? action(isValid) : action}
            </div>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
