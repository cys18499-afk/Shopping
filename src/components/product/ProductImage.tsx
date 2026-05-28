"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import SliderButton from "../common/buttons/SliderButton";
import { useCarousel } from "@/src/hooks/useCarousel";

interface ProductImageProps {
  images: string[];
}

export default function ProductImage({ images = [] }: ProductImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    containerRef,
    dragHandlers,
    slideIndex,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
  } = useCarousel(images.length, { itemsPerView: 2 });

  if (!images.length) return null;

  return (
    <div className="flex w-full justify-center">
      <div
        className="flex-1 overflow-hidden relative max-w-[900px] max-h-[600px] w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={containerRef}
          {...dragHandlers}
          className="relative w-full aspect-[3/2] flex overflow-x-auto 
          snap-x snap-mandatory scrollbar-hide bg-gray-100 
          cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              data-carousel-item
              className="relative shrink-0 w-1/2 h-full snap-start"
            >
              <Image
                alt={`이미지 ${index}`}
                src={img}
                fill
                draggable="false"
                priority={index < 2}
                sizes="450px"
                className="object-cover select-none"
              />
            </div>
          ))}
        </div>

        <div
          className={clsx(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300",
            isHovered && canGoPrev
              ? "opacity-100"
              : "opacity-0 pointer-events-none",
          )}
        >
          <SliderButton direction="prev" onClick={goPrev} />
        </div>

        <div
          className={clsx(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300",
            isHovered && canGoNext
              ? "opacity-100"
              : "opacity-0 pointer-events-none",
          )}
        >
          <SliderButton direction="next" onClick={goNext} />
        </div>
      </div>
    </div>
  );
}
