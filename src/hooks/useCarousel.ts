"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  MouseEvent,
  RefObject,
} from "react";

export type UseCarouselOptions = {
  itemsPerView?: number;
  loop?: boolean;
};

export type UseCarouselReturn = {
  containerRef: RefObject<HTMLDivElement | null>;
  slideIndex: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  hasMoved: boolean;
  goTo: (index: number) => void;
  goPrev: () => void;
  goNext: () => void;
  forceGoTo: (index: number) => void;
  itemWidthRef: RefObject<number>;
  dragHandlers: {
    onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
};

export function useCarousel(
  itemCount: number,
  { itemsPerView = 1, loop = false }: UseCarouselOptions = {},
): UseCarouselReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef<number>(0);
  const dragInfo = useRef({ startX: 0, scrollLeft: 0 });
  const hasMoveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioning = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // loop 모드면 앞뒤에 클론이 1개씩 추가되므로 실제 DOM 아이템 수가 itemCount + 2
  const cloneOffset = loop ? 1 : 0;
  const maxIndex = loop ? itemCount - 1 : Math.max(0, itemCount - itemsPerView);

  const canGoPrev = loop ? true : slideIndex > 0;
  const canGoNext = loop ? true : slideIndex < maxIndex;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const firstItem = container.querySelector<HTMLElement>(
        "[data-carousel-item]",
      );
      itemWidthRef.current = firstItem
        ? firstItem.offsetWidth
        : container.offsetWidth / itemsPerView;

      if (loop) {
        // 클론이 앞에 있으므로 실제 첫 번째 아이템(index 1)으로 이동
        container.scrollLeft = itemWidthRef.current;
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [itemsPerView, loop]);

  // loop 경계 처리: 클론에 도달하면 실제 아이템으로 순간이동
  useEffect(() => {
    if (!loop) return;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isTransitioning.current) return;
      const w = itemWidthRef.current;
      if (w === 0) return;

      // 마지막 클론(오른쪽 끝) 도달 → 실제 첫 번째로
      if (container.scrollLeft >= (itemCount + 1) * w - 1) {
        isTransitioning.current = true;
        container.style.scrollBehavior = "auto";
        container.scrollLeft = w; // 실제 item[0] 위치
        setSlideIndex(0);
        requestAnimationFrame(() => {
          container.style.scrollBehavior = "";
          isTransitioning.current = false;
        });
      }

      if (container.scrollLeft <= 1) {
        isTransitioning.current = true;
        container.style.scrollBehavior = "auto";
        container.scrollLeft = itemCount * w;
        setSlideIndex(itemCount - 1);
        requestAnimationFrame(() => {
          container.style.scrollBehavior = "";
          isTransitioning.current = false;
        });
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loop, itemCount]);

  const scrollToIndex = useCallback(
    (index: number, isSmooth: boolean = true) => {
      const container = containerRef.current;
      if (!container) return;

      const targetScroll = (index + cloneOffset) * itemWidthRef.current;

      container.scrollTo({
        left: targetScroll,
        behavior: isSmooth ? "smooth" : "auto",
      });
    },
    [cloneOffset],
  );

  const forceGoTo = useCallback(
    (index: number) => {
      const next = loop
        ? ((index % itemCount) + itemCount) % itemCount
        : Math.min(Math.max(index, 0), maxIndex);
      setSlideIndex(next);
      const container = containerRef.current;
      if (!container) return;
      const targetScroll = (next + cloneOffset) * itemWidthRef.current;
      container.scrollLeft = targetScroll;
    },
    [itemCount, loop, maxIndex, cloneOffset],
  );

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      scrollToIndex(index, true);
      setTimeout(() => {
        if (loop) {
          const container = containerRef.current;
          if (!container) return;

          if (index >= itemCount) {
            container.scrollTo({
              left: itemWidthRef.current,
              behavior: "auto",
            });
            setSlideIndex(0);
          } else if (index < 0) {
            container.scrollTo({
              left: itemCount * itemWidthRef.current,
              behavior: "auto",
            });
            setSlideIndex(itemCount - 1);
          } else {
            setSlideIndex(index);
          }
        } else {
          setSlideIndex(index);
        }
        setIsAnimating(false);
      }, 300);
    },
    [loop, itemCount, scrollToIndex, isAnimating],
  );

  const goPrev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);
  const goNext = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);

  const snapToNearest = useCallback(() => {
    const container = containerRef.current;
    if (!container || itemWidthRef.current === 0) return;
    const rawIndex = Math.round(container.scrollLeft / itemWidthRef.current);
    // loop 모드면 클론 오프셋 빼서 실제 인덱스로
    const realIndex = loop
      ? Math.min(Math.max(rawIndex - cloneOffset, 0), itemCount - 1)
      : Math.min(rawIndex, maxIndex);
    setSlideIndex(realIndex);
    scrollToIndex(realIndex);
  }, [loop, cloneOffset, itemCount, maxIndex, scrollToIndex]);

  const endDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToNearest();
    if (hasMoveTimeout.current) clearTimeout(hasMoveTimeout.current);
    hasMoveTimeout.current = setTimeout(() => setHasMoved(false), 50);
  }, [isDragging, snapToNearest]);

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    dragInfo.current = {
      startX: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    };
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !isDragging || e.buttons !== 1) return;
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = x - dragInfo.current.startX;
      if (Math.abs(walk) > 3) {
        setHasMoved(true);
        containerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
      }
    },
    [isDragging],
  );

  return {
    containerRef,
    slideIndex,
    canGoPrev,
    canGoNext,
    hasMoved,
    goTo,
    goPrev,
    goNext,
    forceGoTo,
    itemWidthRef,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: endDrag,
      onMouseLeave: endDrag,
    },
  };
}
