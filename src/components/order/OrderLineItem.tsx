"use client";
import Link from "next/link";
import Image from "next/image";
import Modal from "../common/modals/Modal";
import { useModal } from "@/src/hooks/useModal";
import clsx from "clsx";
import { calculateDisplayPrice, formatCurrency } from "@/src/lib/utils";
import ReviewWriteModal from "../review/ReviewWriteModal";
import { OrderItem } from "@/src/types/order";
import { Review } from "@/src/types/review";
import { useEffect, useState, useTransition } from "react";
import { useAlert } from "@/src/hooks/useAlert";
import ConfirmModal from "../common/modals/ConfirmModal";
import { deleteReview } from "@/src/lib/actions/review";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/store/CartStore";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function OrderLineItem({
  product,
  className = "",
  cart = false,
  order = false,
  readOnly = false,
  myReviews,
  handleDelete,
}: {
  product: any;
  className?: string;
  myReviews?: Review[];
  cart?: boolean;
  order?: boolean;
  readOnly?: boolean;
  handleDelete?: (type: "single", key: string) => Promise<void>;
}) {
  const router = useRouter();
  const [isOptimisticallyDeleted, setIsOptimisticallyDeleted] = useState(false);
  const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();
  const { isOpen, openModal, closeModal } = useModal();
  const [, startTransition] = useTransition();
  const updateItem = useCartStore((state) => state.updateItem);
  const [quantity, setQuantity] = useState<number>(product.quantity ?? 1);

  useEffect(() => {
    setQuantity(product.quantity ?? 1);
  }, [product.id, product.quantity]);

  const handleQuantityChange = (delta: number) => {
    const nextQuantity = Math.min(Math.max(quantity + delta, 1), 50);
    if (nextQuantity === quantity) return;

    setQuantity(nextQuantity);
    void updateItem({ id: product.id, quantity: nextQuantity });
  };

  const existingReview = myReviews?.find(
    (r) =>
      r.orderId === (product as OrderItem).orderId &&
      r.productId === product.productId &&
      r.size === product.size,
  );

  const shouldShowReview = existingReview && !isOptimisticallyDeleted;

  const handleDeleteReview = async (reviewId: string) => {
    const isConfirmed = await openAlert({
      title: "삭제",
      message: "정말로 해당 리뷰를 삭제 하시겠습니까?",
      isCancelActive: true,
    });
    if (isConfirmed) {
      setIsOptimisticallyDeleted(true);

      startTransition(async () => {
        try {
          await deleteReview(reviewId);
          router.refresh();
        } catch (error) {
          console.error("리뷰 삭제 실패", error);
          setIsOptimisticallyDeleted(false);
        }
      });
    }
  };

  return (
    <div
      className={clsx(
        "flex justify-between items-center gap-4 w-full",
        className,
      )}
    >
      <div className="w-28 h-28 bg-gray-200 relative shrink-0">
        <Image
          src={product.thumbnail}
          alt={product.productName}
          fill
          className="object-cover"
        />
      </div>
      <div
        className={clsx(
          "flex-1 flex flex-col justify-center",
          readOnly ? "pointer-events-none" : "",
        )}
      >
        <Link className="text-sm" href={`/product-detail/${product.slug}`}>
          {product.productName}
        </Link>

        <div className="flex items-center gap-1 mt-1">
          <p className="text-xs text-black">사이즈: {product.size}</p>
          <div className="flex items-center gpa-1">
            <span className="text-xs text-black">/ 수량</span>
            <div className="text-xs text-black">: {quantity}</div>
            {cart && (
              <div className="ml-1 flex border border-gray-200">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={clsx(
                    "w-4 h-4 flex items-center justify-center cursor-pointer",
                    "text-black",
                    quantity === 1 && "text-gray-400 cursor-not-allowed",
                  )}
                  disabled={quantity === 1}
                >
                  <FaMinus size={10} />
                </button>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className={clsx(
                    "w-4 h-4 flex items-center justify-center cursor-pointer",
                    "text-black",
                    quantity === 50 && "text-gray-400 cursor-not-allowed",
                  )}
                  disabled={quantity === 50}
                >
                  <FaPlus size={10} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5">
          {!product.discountRate ||
            (product.discountRate > 0 && (
              <span className="text-[14px] text-red-500 font-bold">
                {product.discountRate}%
              </span>
            ))}
          <p className="text-[15px] font-bold">
            {formatCurrency(
              calculateDisplayPrice(product.unitPrice, product.discountRate),
            )}
          </p>
        </div>
      </div>
      {cart && !readOnly && (
        <div className="flex flex-col gap-2 justify-center">
          {/* <button
            className="border border-gray-300 px-4 py-1 text-xs hover:bg-gray-50 cursor-pointer"
            onClick={handleSaveQuantity}
          >
            수량 저장
          </button> */}
          <button
            className="border border-gray-300 px-4 py-1 text-xs hover:bg-gray-50 cursor-pointer"
            onClick={() => handleDelete?.("single", product.id)}
          >
            삭제
          </button>
        </div>
      )}
      {order && (
        <div className="flex flex-col gap-2">
          {shouldShowReview ? (
            <div className="flex flex-col gap-1">
              <button
                className="border border-gray-200 bg-gray-100 px-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
                onClick={openModal}
              >
                리뷰 수정
              </button>
              <button
                className="border border-gray-200 bg-gray-100 px-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
                onClick={() => handleDeleteReview(existingReview.id)}
              >
                리뷰 삭제
              </button>
            </div>
          ) : (
            <button
              className="border text-black border-gray-200 px-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
              onClick={openModal}
            >
              리뷰 작성
            </button>
          )}
        </div>
      )}
      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        {/* {cart && <ChangeOptionModal product={product} onClose={closeModal} />} */}
        {order && (
          <ReviewWriteModal
            onClose={closeModal}
            productImage={product.thumbnail}
            orderId={(product as OrderItem).orderId}
            productId={product.productId}
            productName={product.productName}
            size={(product as OrderItem).size}
            initialData={existingReview}
          />
        )}
      </Modal>{" "}
      <ConfirmModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onConfirm={confirm}
        onCancel={cancel}
        backdropBlur
      ></ConfirmModal>
    </div>
  );
}
