"use client";

import React, { useEffect, useRef } from "react";
import { useCarousel, UseCarouselOptions } from "@/src/hooks/useCarousel";
import SliderButton from "./common/buttons/SliderButton";

interface CarouselProps extends UseCarouselOptions {
  children: React.ReactNode;
  className?: string;
  scrollbar?: boolean;
  externalIndex?: number;
  onHasMovedChange?: (hasMoved: boolean) => void;
  onIndexChange?: (index: number) => void;
}

export default function Carousel({
  children,
  className = "",
  itemsPerView = 1,
  onHasMovedChange,
  loop = false,
  scrollbar = false,
  externalIndex = 0,
  onIndexChange,
}: CarouselProps) {
  const childArray = React.Children.toArray(children);
  const itemCount = childArray.length;

  const displayItems = loop
    ? [childArray[itemCount - 1], ...childArray, childArray[0]]
    : childArray;

  const {
    containerRef,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
    forceGoTo,
    dragHandlers,
    hasMoved,
    slideIndex,
  } = useCarousel(itemCount, { itemsPerView, loop });

  const isExternalUpdate = useRef(false);
  const forceGoToRef = useRef(forceGoTo);

  const scrollbarWidth = (1 / (itemCount / itemsPerView)) * 100;
  const scrollbarLeft = (slideIndex / itemCount) * 100;

  useEffect(() => {
    forceGoToRef.current = forceGoTo;
  }, [forceGoTo]);

  useEffect(() => {
    forceGoToRef.current(externalIndex);
    isExternalUpdate.current = true;
  }, [externalIndex]);

  useEffect(() => {
    if (isExternalUpdate.current) {
      isExternalUpdate.current = false;
      return;
    }
    onIndexChange?.(slideIndex);
  }, [slideIndex, onIndexChange]);

  useEffect(() => {
    onHasMovedChange?.(hasMoved);
  }, [hasMoved, onHasMovedChange]);

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        {...dragHandlers}
        className="overflow-hidden h-full"
      >
        <div
          className="flex h-full"
          style={{ width: `${(displayItems.length / itemsPerView) * 100}%` }}
        >
          {displayItems.map((child, i) => (
            <div
              key={i}
              data-carousel-item
              style={{ width: `${100 / displayItems.length}%` }}
              className="shrink-0"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        {canGoPrev && <SliderButton direction="prev" onClick={goPrev} />}
        {canGoNext && (
          <div className="ml-auto">
            <SliderButton direction="next" onClick={goNext} />
          </div>
        )}
      </div>

      {scrollbar && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{
              width: `${scrollbarWidth}%`,
              left: `${scrollbarLeft}%`,
              transform: `translateX(${slideIndex * (100 / itemsPerView)}%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
