import ReviewClient from "@/src/components/review/ReviewClient";
import { getMyReviews } from "@/src/lib/data/review";
import { Suspense } from "react";

export default function MyPageReviews() {
  return (
    <div className="w-full">
      <div className="mb-5 border-b-2 border-black text-[14px] py-1 "></div>

      <Suspense fallback={<div></div>}>
        <ReviewListContent />
      </Suspense>
    </div>
  );
}

async function ReviewListContent() {
  const myReviews = await getMyReviews();
  return <ReviewClient reviews={myReviews} />;
}
