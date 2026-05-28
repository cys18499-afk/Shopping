"use client";

import { useState } from "react";
import { Review } from "@/src/types/review";
import { useModal } from "@/src/hooks/useModal";
import ReviewSummary from "./ReviewSummary";
import ReviewGallery from "./ReviewGallery";
import ReviewFilter from "./ReviewFilter";
import ReviewDetailModal from "./ReviewDetailModal";
import InfiniteScrollList from "../InfiniteScrollList";
import { useFilter } from "@/src/hooks/useFilter";

export default function ReviewContent({
  reviews,
  slug,
}: {
  reviews: Review[];
  slug: string;
}) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { isOpen, openModal, closeModal } = useModal();
  const filter = useFilter();

  const handleImageClick = (review: Review, img: string) => {
    setSelectedReview(review);
    setSelectedImage(img);
    openModal();
  };

  return (
    <div className=" py-10">
      <ReviewSummary reviews={reviews} />
      <ReviewGallery reviews={reviews} onImageClick={handleImageClick} />
      <ReviewFilter filter={filter} />
      <InfiniteScrollList
        slug={slug}
        onImageClick={handleImageClick}
        appliedValues={filter.appliedValues}
      />
      <ReviewDetailModal
        isOpen={isOpen}
        onClose={closeModal}
        selectedImage={selectedImage}
        selectedReview={selectedReview}
        onImageClick={handleImageClick}
        reviews={reviews}
      />
    </div>
  );
}
