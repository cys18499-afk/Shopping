"use client";

import dynamic from "next/dynamic";
import { Review } from "@/src/types/review";

const ReviewContent = dynamic(
  () => import("@/src/components/review/ReviewContent"),
  {
    ssr: false,
    loading: () => (
      <div className="py-10 text-gray-400">리뷰를 불러오는 중입니다...</div>
    ),
  },
);

export default function ReviewWrapper({
  reviews,
  slug,
}: {
  reviews: Review[];
  slug: string;
}) {
  return <ReviewContent reviews={reviews} slug={slug} />;
}
