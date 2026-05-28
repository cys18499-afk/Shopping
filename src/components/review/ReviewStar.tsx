"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface ReviewStarProps {
  rating: number;
  setRating: (rating: number) => void;
}

export default function ReviewStar({ rating, setRating }: ReviewStarProps) {
  const [tempRating, setTempRating] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const isFull = tempRating
          ? tempRating >= starValue
          : rating >= starValue;

        return (
          <button
            key={i}
            type="button"
            className="cursor-pointer"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setTempRating(starValue)}
            onMouseLeave={() => setTempRating(0)}
          >
            <Star
              size={35}
              strokeWidth={1.5}
              className={clsx(
                "transition-colors duration-150",
                isFull ? "fill-black text-black" : "text-gray-200",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
