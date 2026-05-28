"use client";

import clsx from "clsx";
import { useState } from "react";
import { Address, UpdateAddressRequest } from "@/src/types/address";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { useRouter } from "next/navigation";
import {
  addAddress,
  deleteAddress,
  patchAddress,
} from "@/src/lib/actions/address";
import { useAlert } from "@/src/hooks/useAlert";
import ConfirmModal from "../common/modals/ConfirmModal";

type AddressMode = "list" | "manual";

export default function AddressManagement({
  defaultAddressId,
  addresses,
  onConfirm,
  closeModal,
}: {
  defaultAddressId: string;
  addresses: Address[];
  onConfirm: (selectedId: string) => void;
  closeModal: () => void;
}) {
  const [addressMode, setAddressMode] = useState<AddressMode>("list");
  const [selectedId, setSelectedId] = useState<string>(defaultAddressId);
  const [localAddresses, setLocalAddresses] = useState<Address[]>(addresses);
  const [editingAddress, setEditingAddress] =
    useState<UpdateAddressRequest | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();
  const router = useRouter();

  const handleConfirm = () => {
    onConfirm(selectedId);
    router.refresh();
  };

  const handleAddressSave = async (addr: Address) => {
    const previousAddresses = localAddresses;

    try {
      if (isEdit && editingAddress) {
        // 주소 수정
        const updatedAddresses = localAddresses.map((a) =>
          a.id === editingAddress.id ? (addr as Address) : a,
        );
        setLocalAddresses(updatedAddresses);
        onConfirm(addr.id);

        await patchAddress(addr as Address, editingAddress.id);
      } else {
        // 주소 추가
        setLocalAddresses([...localAddresses, addr]);
        onConfirm(addr.id);

        await addAddress(addr);
      }

      setEditingAddress(null);
      setIsEdit(false);
      closeModal();
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      setLocalAddresses(previousAddresses);
    }
  };

  const handleAddressDelete = async (id: string) => {
    const previousAddresses = localAddresses;
    setLocalAddresses((prev) => prev.filter((a) => a.id !== id));

    try {
      await deleteAddress(id);
      router.refresh();
    } catch (error) {
      console.error("삭제 실패", error);
      setLocalAddresses(previousAddresses);
    }
  };

  // const handleEditClick = (addr: Address) => {
  //   console.log(addr);
  //   setEditingAddress(addr);
  //   setIsEdit(true);
  // };

  // const handleDelete = async (e: React.MouseEvent, id: string) => {
  //   e.preventDefault();
  //   const isConfirmed = await openAlert({
  //     title: "주소 삭제",
  //     message: "정말로 삭제하시겠습니까?",
  //     isCancelActive: true,
  //   });
  //   if (!isConfirmed) return;
  //   setLocalAddresses((prev) => prev.filter((a) => a.id !== id));

  //   await deleteAddress(id);
  //   router.refresh();
  // };

  return (
    <div className="bg-white w-[440px]">
      <div className="flex items-center py-2 border-b border-gray-200">
        <span className="text-[14px] font-medium mx-auto">배송지 관리</span>
      </div>

      <div className="flex border-b border-gray-200">
        {(["list", "manual"] as AddressMode[]).map((mode) => {
          const label = mode === "list" ? "내 배송지" : "새로 입력";
          return (
            <button
              key={mode}
              className={clsx(
                "flex-1 text-center py-3 text-[14px] cursor-pointer relative",
                addressMode === mode
                  ? "text-black font-medium"
                  : "text-gray-400",
              )}
              onClick={() => {
                setEditingAddress(null);
                setIsEdit(false);
                setAddressMode(mode);
              }}
            >
              {label}
              {addressMode === mode && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          );
        })}
      </div>

      {addressMode === "list" ? (
        <div className="flex flex-col">
          <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
            {!isEdit ? (
              localAddresses.map((addr) => (
                <label
                  key={addr.id}
                  className="flex items-start  gap-4 px-6 py-5 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="selectedAddressId"
                    value={addr.id}
                    checked={selectedId === addr.id}
                    onChange={() => setSelectedId(addr.id)}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <AddressCard
                      address={addr}
                      onDelete={handleAddressDelete}
                      onUpdate={(updatedAddr) => {
                        setLocalAddresses((prev) =>
                          prev.map((a) =>
                            a.id === updatedAddr.id ? updatedAddr : a,
                          ),
                        );
                      }}
                    />
                  </div>
                </label>
              ))
            ) : (
              <AddressForm
                onSuccess={handleAddressSave}
                initialData={editingAddress}
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
            )}
          </div>
          {!isEdit && (
            <div className="p-6">
              <button
                onClick={handleConfirm}
                className="w-full bg-black text-white py-3 text-[14px] font-medium hover:opacity-80 cursor-pointer"
              >
                확인
              </button>
            </div>
          )}
        </div>
      ) : (
        <AddressForm
          hideHeader={true}
          onSuccess={handleAddressSave}
          action={(isValid) => (
            <button
              type="submit"
              disabled={!isValid}
              className={clsx(
                "w-full py-3 text-sm font-medium ",
                isValid
                  ? "bg-black text-white cursor-pointer"
                  : "bg-gray-200 text-black cursor-default",
              )}
            >
              확인
            </button>
          )}
        />
      )}

      {isAlertOpen && (
        <ConfirmModal
          isOpen={isAlertOpen}
          message={alertMessage}
          onConfirm={confirm}
          onCancel={cancel}
        />
      )}
    </div>
  );
}
