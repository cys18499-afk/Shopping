"use client";

import { useModal } from "@/src/hooks/useModal";
import { Address } from "@/src/types/address";
import { deleteAddress, patchAddress } from "@/src/lib/actions/address";
import Modal from "../common/modals/Modal";
import AddressForm from "./AddressForm";
import clsx from "clsx";
import ConfirmModal from "../common/modals/ConfirmModal";
import { useAlert } from "@/src/hooks/useAlert";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AddressCard({
  address,
  actions,
  onDelete,
  onUpdate,
}: {
  address: Address;
  actions?: React.ReactNode;
  onDelete?: (id: string) => void;
  onUpdate?: (updatedAddress: Address) => void;
}) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();
  const [, startTransition] = useTransition();

  const handleAddressUpdate = async (updatedData: any) => {
    try {
      if (onUpdate) {
        onUpdate(updatedData);
      }
      closeModal();

      startTransition(async () => {
        try {
          await patchAddress(updatedData, updatedData.id);
        } catch (error) {
          console.error("수정 실패:", error);

          if (onUpdate) {
            onUpdate(address);
          }
        }
      });
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const isConfirmed = await openAlert({
      title: "주소 삭제",
      message: "정말로 삭제하시겠습니까?",
      isCancelActive: true,
    });
    if (!isConfirmed) return;

    if (onDelete) {
      onDelete(id);
    } else {
      startTransition(async () => {
        try {
          await deleteAddress(id);
          router.refresh();
        } catch (error) {
          console.error("삭제 실패", error);
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-1 relative border-b border-gray-200 pb-5">
      <div className="flex items-center gap-2">
        {address.isDefault && (
          <span className="bg-gray-200 text-gray-500 text-[11px] px-1.5 py-0.5 font-bold">
            기본
          </span>
        )}
        <span className="font-bold text-[16px] text-black">
          {address.addressName} / {address.receiverName}
        </span>
        {actions && <div className="ml-auto">{actions}</div>}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[14px] text-black   break-all">
          ({address.postcode}) {address.address} {address.detailAddress}
        </div>
        <div className="flex gap-1">
          <button
            onClick={openModal}
            className="text-xs text-gray-400 cursor-pointer p-1 shrink-0"
          >
            수정
          </button>
          {!address.isDefault && (
            <button
              onClick={(e) => handleDelete(e, address.id)}
              className="text-xs text-gray-400 cursor-pointer p-1 shrink-0"
            >
              삭제
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 ">
        <div className="text-[14px] text-gray-500">
          {address.receiverPhoneNumber}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <AddressForm
          onSuccess={handleAddressUpdate}
          initialData={address}
          action={(isValid) => (
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isValid}
                className={clsx(
                  "w-full py-3 text-sm font-medium transition-colors",
                  isValid
                    ? "bg-black text-white cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-default",
                )}
              >
                확인
              </button>
            </div>
          )}
        />
      </Modal>
      <ConfirmModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </div>
  );
}
