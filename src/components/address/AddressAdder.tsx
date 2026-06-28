"use client";
import clsx from "clsx";

import Modal from "../common/modals/Modal";
import AddressForm from "./AddressForm";
import { useModal } from "@/src/hooks/useModal";
import { addAddress } from "@/src/lib/actions/address";
import { Address } from "@/src/types/address";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/AuthStore";
import { useTransition } from "react";

export default function AddressAdder({
  isFirstAddress,
  onSaveSuccess,
}: {
  isFirstAddress?: boolean;
  onSaveSuccess?: (newAddress: Address) => void;
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();
  const [, startTransition] = useTransition();

  const handleAddressSave = async (addr: Address) => {
    try {
      if (!user) {
        const anonymousAddress = {
          ...addr,
          id: `anonymous-${Date.now()}`,
        };

        sessionStorage.setItem(
          "anonymous-address",
          JSON.stringify(anonymousAddress),
        );

        if (onSaveSuccess) {
          onSaveSuccess(anonymousAddress);
        }

        closeModal();
        return;
      }

      if (onSaveSuccess) {
        onSaveSuccess(addr);
      }

      closeModal();

      startTransition(async () => {
        try {
          await addAddress(addr);
          router.refresh();
        } catch (error) {
          console.error("배송지 추가 중 오류 발생:", error);
          alert("배송지 추가에 실패했습니다. 다시 시도해 주세요.");
        }
      });
    } catch (error) {
      console.error("배송지 추가 중 오류 발생:", error);
      alert("배송지 추가에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <button
        className="text-center px-5 py-2 text-white bg-black cursor-pointer"
        onClick={openModal}
      >
        <span className="text-[14px]">배송지 추가</span>
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <AddressForm
          onSuccess={handleAddressSave}
          isFirstAddress={isFirstAddress}
          action={(isValid) => (
            <div className="flex justify-center">
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
                확인
              </button>
            </div>
          )}
        />
      </Modal>
    </>
  );
}
