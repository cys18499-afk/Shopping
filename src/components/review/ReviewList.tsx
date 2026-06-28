import { Review } from "@/src/types/review";
import ReviewItem from "./ReviewItem";

export default function ReviewList({
  reviews,
  onImageClick,
}: {
  reviews: Review[];
  onImageClick: (review: Review, img: string) => void;
}) {
  return (
    <div className="mt-4">
      <div className="flex flex-col">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onImageClick={onImageClick}
          />
        ))}
      </div>
      <div className="hidden"></div>
    </div>
  );
}
