"use client";

import { Review } from "@/src/types/review";
import { Star } from "lucide-react";

export default function ReviewSummary({ reviews }: { reviews: Review[] }) {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((score) => {
    const count = reviews.filter((r) => r.rating === score).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

    return {
      label: `${score}점`,
      count,
      percentage,
    };
  });

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 py-6 ">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-center justify-center gap-1">
          <Star size={36} className="fill-black text-black" />
          <span className="text-[40px] font-bold text-black leading-tight">
            {averageRating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{totalReviews}개의 리뷰</p>
      </div>

      <div className="flex-1 w-full space-y-2">
        {ratingDistribution.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs font-medium w-8 whitespace-nowrap text-gray-600">
              {item.label}
            </span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-8 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
