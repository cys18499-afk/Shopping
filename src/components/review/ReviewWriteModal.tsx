"use client";

import { useState, useEffect } from "react";
import ReviewStar from "./ReviewStar";
import ReviewImageUploader from "./ReviewImageUploader";
import { createReview, updateReview } from "@/src/lib/actions/review";
import { Review } from "@/src/types/review";
import Image from "next/image";

interface ReviewWriteModalProps {
  productId: string;
  orderId: string;
  productName: string;
  productImage: string;
  size: string;
  initialData?: Review;
  onClose: () => void;
  onReviewUpdate?: (review: Review) => void;
}

export default function ReviewWriteModal({
  productId,
  onClose,
  onReviewUpdate,
  orderId,
  productName,
  productImage,
  size,
  initialData,
}: ReviewWriteModalProps) {
  const [content, setContent] = useState(initialData?.content || "");
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = async () => {
    try {
      if (initialData) {
        await updateReview(initialData.id, {
          rating,
          content,
          size,
          existingImages: images,
          newImages: imageFiles,
        });

        if (onReviewUpdate) {
          onReviewUpdate({
            ...initialData,
            rating,
            content,
            images,
          });
        }
      } else {
        await createReview({
          productId,
          orderId,
          rating,
          content,
          images,
          size,
          imageFiles,
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[430px] bg-white  border border-gray-200 shadow-xl overflow-hidden">
      {/* <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
        <span className="text-[11px] font-medium tracking-widest text-gray-400 uppercase">
          {initialData ? "수정" : "작성"}
        </span>
      </div> */}
      <div className="flex items-center px-6 py-2 border-b border-gray-200">
        <span className="text-[14px] font-medium mx-auto">
          {initialData ? "수정" : "작성"}
        </span>
      </div>

      <div className="px-7 py-6 flex flex-col gap-6">
        <div className="flex items-center gap-3 bg-gray-50  px-4 py-3">
          <div className="w-17.5 h-17.5 flex-shrink-0 border border-gray-100 overflow-hidden">
            <Image
              src={productImage}
              alt="상품이미지"
              className="w-full h-full object-cover"
              width={70}
              height={70}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{productName}</p>
            <p className="text-xs text-gray-400 mt-0.5">사이즈: {size}</p>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium tracking-widest text-gray-400 uppercase mb-2.5">
            평점
          </label>
          <ReviewStar rating={rating} setRating={setRating} />
        </div>

        <div>
          <label className="block text-[11px] font-medium tracking-widest text-gray-400 uppercase mb-2.5">
            리뷰 내용
          </label>
          <textarea
            placeholder="상품에 대한 솔직한 리뷰를 남겨주세요."
            className="w-full h-28 border border-gray-200  px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-300 bg-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <ReviewImageUploader
          images={images}
          setImages={setImages}
          setImageFiles={setImageFiles}
        />
      </div>

      <div className="flex gap-2 px-7 pb-6">
        <button
          onClick={onClose}
          className="flex-1 py-3 text-xs font-medium tracking-wide text-gray-500 border border-gray-200  hover:bg-gray-50 transition-colors cursor-pointer"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="flex-[2] py-3 text-xs font-medium tracking-wide text-white bg-black  hover:bg-gray-700 transition-colors cursor-pointer"
        >
          {initialData ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
