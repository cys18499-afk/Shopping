"use client";
import Link from "next/link";
import Image from "next/image";
import Modal from "../common/modals/Modal";
import { useModal } from "@/src/hooks/useModal";
import ChangeOptionModal from "../cart/ChangeOptionModal";
import clsx from "clsx";
import { calculateDisplayPrice, formatCurrency } from "@/src/lib/utils";
import ReviewWriteModal from "../review/ReviewWriteModal";
import { OrderItem } from "@/src/types/order";
import { CartItem } from "@/src/types/cart";
import { Review } from "@/src/types/review";

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
  const existingReview = myReviews?.find(
    (r) =>
      r.orderId === (product as OrderItem).orderId &&
      r.productId === product.productId &&
      r.size === product.size,
  );

  const { isOpen, openModal, closeModal } = useModal();

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
        <Link className="text-sm" href={`/product/${product.slug}`}>
          {product.productName}
        </Link>

        <p className="text-xs text-black mt-1">
          사이즈: {product.size} / 수량: {product.quantity} 개
        </p>
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
            onClick={openModal}
          >
            옵션 변경
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
          {existingReview ? (
            <div className="flex flex-col gap-1">
              <button
                className="border border-gray-200 bg-gray-100 px-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
                onClick={openModal}
              >
                리뷰 수정
              </button>
              <button className="border border-gray-200 bg-gray-100 px-4 py-2 text-xs cursor-pointer hover:bg-gray-50">
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
        {cart && <ChangeOptionModal product={product} />}
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
      </Modal>
    </div>
  );
}
