"use client";

import Image from "next/image";
import { MdChevronRight } from "react-icons/md";
import { Review } from "@/src/types/review";
import { flattenReviewImages } from "@/src/lib/utils";

interface ReviewGalleryProps {
  reviews: Review[];
  onImageClick: (review: Review, img: string) => void;
}

export default function ReviewGallery({
  reviews,
  onImageClick,
}: ReviewGalleryProps) {
  const flattenReview = flattenReviewImages(reviews);
  return (
    <div className="py-10 ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-bold">
            사진 ({flattenReview.length})
          </span>
        </div>

        <button
          className="flex items-center text-sm text-gray-500 hover:text-black transition-colors cursor-pointer"
          onClick={() => {
            if (flattenReview.length > 0)
              onImageClick(flattenReview[0].review, "");
          }}
        >
          전체보기
          <MdChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {flattenReview.slice(0, 5).map((imageItem, index) => (
          <button
            key={`${imageItem.review.id}-img-${index}`}
            className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
            onClick={() =>
              onImageClick(imageItem.review, imageItem.review.images[index])
            }
          >
            <Image
              src={imageItem.imgUrl}
              alt={`리뷰 이미지 ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 150px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
