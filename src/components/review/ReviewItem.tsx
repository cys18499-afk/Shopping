import Image from "next/image";
import { Star } from "lucide-react";
import { Review } from "@/src/types/review";
import { dateOnly, maskUserName } from "@/src/lib/utils";

export default function ReviewItem({
  review,
  onImageClick,
}: {
  review: Review;
  onImageClick: (review: Review, img: string) => void;
}) {
  return (
    <div className="py-8 border-b border-gray-200  flex gap-4 items-center w-full ">
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < review.rating ? "fill-black text-black" : "text-gray-200"
              }
            />
          ))}
        </div>
        <p className="text-xs text-gray-500">구매 사이즈: {review.size}</p>
        {/*  break-words 숫자단어 무시 all 사용*/}
        <p className="text-sm leading-relaxed  text-gray-800 break-all w-[500px] line-clamp-2">
          {review.content}
        </p>

        {review.images && review.images.length > 0 && (
          <div className="flex gap-1 mt-1">
            {review.images.map((img, index) => (
              <button
                key={index}
                className="relative w-20 h-20 shrink-0 cursor-pointer"
                onClick={() => onImageClick(review, img)}
              >
                <Image
                  src={img}
                  alt="리뷰 이미지"
                  fill
                  sizes="80px"
                  className="object-cover hover:opacity-80"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 shrink-0 min-w-[100px] text-right">
        <span className="text-[13px] font-bold text-gray-400">
          {maskUserName(review.userName)}
        </span>
        <span className="text-gray-400 text-[13px]">
          {dateOnly(review.createdAt)}
        </span>
      </div>
    </div>
  );
}
