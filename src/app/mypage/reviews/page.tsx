import ReviewClient from "@/src/components/review/ReviewClient";
import { getMyReviews } from "@/src/lib/data/review";

export default async function MyPageReviews() {
  const myReviews = await getMyReviews();

  return <ReviewClient reviews={myReviews} />;
}
