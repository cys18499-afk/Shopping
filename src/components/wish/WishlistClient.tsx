"use client";

import { Heart } from "lucide-react";
import { useWishStore } from "@/src/store/wishStore";
import { Product } from "@/src/types/product";
import ProductList from "@/src/components/product/ProductList";
import { useAlert } from "@/src/hooks/useAlert";
import Modal from "@/src/components/common/modals/Modal";
import clsx from "clsx";

export default function WishlistClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  // const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();

  // const clearAll = useWishStore((s) => s.clearAll);
  const wishedIds = useWishStore((s) => s.wishedIds);
  const products = initialProducts.filter((p) => wishedIds.has(p.id));

  // const handleDelete = async () => {
  //   const isConfirmed = await openAlert({
  //     title: "전체삭제",
  //     message: "정말로 삭제하시겠습니까?",
  //     isCancelActive: true,
  //   });

  //   if (isConfirmed) {
  //     clearAll();
  //   }
  // };

  return (
    <>
      <div className="mx-auto max-w-5xl">
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className="flex flex-col items-center justify-center py-40">
            <Heart size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-500 text-[14px] mb-6">
              찜한 상품이 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* {isAlertOpen && (
        <Modal isOpen={true} onClose={cancel!} backdropBlur={true}>
          <div className="bg-white p-6  shadow-xl w-80 text-center">
            <p className="text-gray-500 my-4 text-sm leading-relaxed">
              {alertMessage}
            </p>
            <div className="flex gap-2">
              {cancel && (
                <button
                  onClick={cancel}
                  className="flex-1 py-2 bg-gray-100 rounded text-sm cursor-pointer"
                >
                  취소
                </button>
              )}
              <button
                onClick={confirm}
                className="flex-1 py-2 bg-black text-white rounded text-sm cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )} */}
    </>
  );
}
