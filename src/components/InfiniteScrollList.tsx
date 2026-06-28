"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getReviewsByProductPaged } from "../lib/data/review";
import { FilterState, Review } from "../types/review";
import ReviewItem from "./review/ReviewItem";

export default function InfiniteScrollList({
  slug,
  onImageClick,
  appliedValues,
}: {
  slug: string;
  onImageClick: (review: Review, img: string) => void;
  appliedValues: FilterState;
}) {
  const [items, setItems] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  const fetchItems = useCallback(
    async (currentPage: number) => {
      if (isFetching.current || !hasMore) return;
      isFetching.current = true;
      setLoading(true);
      try {
        const reviews = await getReviewsByProductPaged(
          slug,
          currentPage,
          appliedValues,
        );
        if (reviews.length < 10) {
          setHasMore(false);
        }
        setItems((prev) =>
          currentPage === 0 ? reviews : [...prev, ...reviews],
        );
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [slug, appliedValues, hasMore],
  );

  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
  }, [appliedValues]);

  useEffect(() => {
    fetchItems(0);
  }, [appliedValues, fetchItems]);

  useEffect(() => {
    if (page === 0) return;
    fetchItems(page);
  }, [page, fetchItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching.current && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="w-full">
      {items.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onImageClick={onImageClick}
        />
      ))}

      <div
        ref={observerRef}
        className="h-20 w-full flex items-center justify-center"
      >
        {loading && "로딩 중..."}
      </div>
    </div>
  );
}
