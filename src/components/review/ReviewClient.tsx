"use client";
import { useModal } from "@/src/hooks/useModal";
import { dateOnly } from "@/src/lib/utils";
import { Review } from "@/src/types/review";
import { Star } from "lucide-react";
import Image from "next/image";
import Modal from "../common/modals/Modal";
import ReviewWriteModal from "./ReviewWriteModal";
import { deleteReview } from "@/src/lib/actions/review";
import { useState, useTransition } from "react";
import { useAlert } from "@/src/hooks/useAlert";
import ConfirmModal from "../common/modals/ConfirmModal";

export default function ReviewClient({
  reviews: initialReviews,
}: {
  reviews: Review[];
}) {
  const { isOpen, openModal, closeModal } = useModal();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [, startTransition] = useTransition();
  const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    openModal();
  };

  const handleDelete = async (reviewId: string) => {
    const isConfirmed = await openAlert({
      title: "삭제",
      message: "정말로 해당 리뷰를 삭제 하시겠습니까?",
      isCancelActive: true,
    });
    if (isConfirmed) {
      const previousReviews = reviews;
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));

      startTransition(async () => {
        try {
          await deleteReview(reviewId);
        } catch (error) {
          console.error("리뷰 삭제 실패", error);
          setReviews(previousReviews);
        }
      });
    }
  };

  const handleReviewUpdate = (updatedReview: Review) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === updatedReview.id ? updatedReview : r)),
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 py-4 relative"
          >
            <div className="flex items-start gap-4">
              <div className="w-30 h-30 flex-shrink-0 bg-gray-50 border border-gray-100 overflow-hidden">
                <Image
                  src={review.productImage}
                  alt={review.productName}
                  className="w-full h-full object-cover"
                  width={120}
                  height={120}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-gray-400">
                  작성일 : {dateOnly(review.createdAt)}
                </div>
                <h3 className="text-[14px] font-medium text-gray-900 truncate">
                  {review.productName}
                </h3>
                <div className="text-[12px] text-gray-500">
                  Size: {review.size}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(review.rating)
                        ? "fill-black text-black"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap w-[600px] break-words">
                {review.content}
              </p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-1 pt-2">
                  {review.images.slice(0, 3).map((img, idx) => (
                    <div
                      key={idx}
                      className="w-17.5 h-17.5 shrink-0 border border-gray-100 overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`리뷰 이미지 ${idx + 1}`}
                        className="w-full h-full object-cover"
                        width={70}
                        height={70}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="text-[14px] text-gray-400  cursor-pointer border px-2 py-1 border-gray-200 hover:border-black"
                onClick={() => handleEdit(review)}
              >
                수정
              </button>
              <button
                className="text-[14px] text-gray-400  cursor-pointer border px-2 py-1 border-gray-200 hover:border-black"
                onClick={() => handleDelete(review.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40">
            <p className="text-gray-500 text-[14px] mb-6">
              작성한 리뷰가 없습니다.
            </p>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        {selectedReview && (
          <ReviewWriteModal
            productId={selectedReview.productId}
            productImage={selectedReview.productImage}
            onClose={closeModal}
            onReviewUpdate={handleReviewUpdate}
            orderId={selectedReview.id}
            productName={selectedReview.productName}
            size={selectedReview.size}
            initialData={selectedReview}
          />
        )}
      </Modal>
      {isAlertOpen && (
        // <Modal isOpen={true} onClose={cancel!} backdropBlur={true}>
        //   <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
        //     <p className="text-gray-500 my-4 text-sm leading-relaxed">
        //       {alertMessage}
        //     </p>
        //     <div className="flex gap-2">
        //       {cancel && (
        //         <button
        //           onClick={cancel}
        //           className="flex-1 py-2 bg-gray-100 rounded text-sm cursor-pointer"
        //         >
        //           취소
        //         </button>
        //       )}
        //       <button
        //         onClick={confirm}
        //         className="flex-1 py-2 bg-black text-white rounded text-sm cursor-pointer"
        //       >
        //         확인
        //       </button>
        //     </div>
        //   </div>
        // </Modal>
        <ConfirmModal
          isOpen={isAlertOpen}
          message={alertMessage}
          onConfirm={confirm}
          onCancel={cancel}
          backdropBlur
        ></ConfirmModal>
      )}
    </div>
  );
}
