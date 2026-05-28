"use client";

import Modal from "../common/modals/Modal";
import Image from "next/image";
import { Star } from "lucide-react";
import { Review } from "@/src/types/review";
import { dateOnly, maskUserName } from "@/src/lib/utils";
import clsx from "clsx";

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedReview: Review | null;
  selectedImage: string;
  onImageClick: (review: Review, img: string) => void;
  reviews: Review[];
}

export default function ReviewDetailModal({
  isOpen,
  onClose,
  selectedReview,
  selectedImage,
  reviews,
  onImageClick,
}: ReviewDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdropBlur>
      <div className="bg-white w-[900px] flex p-4 h-[600px] gap-4">
        <div className="grid grid-cols-3 gap-2 w-[450px] overflow-y-auto pr-2 content-start">
          {reviews.map((item) =>
            item.images.map((img, index) => (
              <button
                key={`${item.id}-${index}`}
                className={clsx(
                  "relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer border-2 transition-all",
                  {
                    "border-black": selectedImage === img,
                    "border-transparent": selectedImage !== img,
                  },
                )}
                onClick={() => {
                  onImageClick(item, img);
                }}
              >
                <Image
                  src={img}
                  alt={`리뷰 썸네일 ${index + 1}`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </button>
            )),
          )}
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          {selectedReview ? (
            <>
              <div className="relative w-full aspect-square mb-4 bg-black rounded-sm overflow-hidden">
                <Image
                  src={selectedReview.images[0]}
                  alt="상세 이미지"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <div className="flex-1 px-1">
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={clsx(
                          i < selectedReview.rating
                            ? "fill-black text-black"
                            : "text-gray-200",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs">
                    {dateOnly(selectedReview.createdAt)}
                  </p>
                </div>

                <div className="mt-4 p-3 bg-gray-50 ">
                  <p className="text-[13px] font-bold text-black mb-1">
                    {maskUserName(selectedReview.userName)}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    구매 사이즈: {selectedReview.size}
                  </p>
                  <p className="text-[14px] py-4 line-clamp-3 w-[370px] break-all ">
                    {selectedReview.content}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              좌측에서 이미지를 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
