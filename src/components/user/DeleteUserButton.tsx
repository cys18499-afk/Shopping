"use client";

import { useAlert } from "@/src/hooks/useAlert";
import ConfirmModal from "../common/modals/ConfirmModal";
import { deleteUser, signOut } from "@/src/lib/actions/user";
import React from "react";
import { useAuthStore } from "@/src/store/AuthStore";

export default function DeleteUserButton() {
  const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();
  const { user } = useAuthStore();
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user?.email === "test@example.com") {
      await openAlert({
        title: "회원 탈퇴",
        message: "샘플 계정은 탈퇴할 수 없습니다.",
        isCancelActive: false,
      });
      return;
    }
    const isConfirmed = await openAlert({
      title: "회원 탈퇴",
      message: "정말로 회원 탈퇴하시겠습니까?",
      isCancelActive: true,
    });
    if (!isConfirmed) return;
    if (isConfirmed) {
      alert("회원탈퇴가 완료되었습니다.");
      await signOut();
      window.location.href = "/";
      await deleteUser();
    }
  };

  return (
    <div>
      <button
        className="text-[13px] text-gray-500 underline cursor-pointer"
        onClick={handleDelete}
      >
        회원 탈퇴하기
      </button>
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
