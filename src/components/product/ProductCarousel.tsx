// components/ProductCarousel.tsx
"use client";

import { useState } from "react";
import Carousel from "../Carousel";
import ProductCard from "./ProductCard";
import { Product } from "@/src/types/product";

interface ProductCarouselProps {
  products: Product[];
  itemsPerView?: number;
  loop?: boolean;
  scrollbar?: boolean;
}

export default function ProductCarousel({
  products,
  itemsPerView = 5,
  loop = false,
  scrollbar = false,
}: ProductCarouselProps) {
  const [hasMoved, setHasMoved] = useState(false);

  return (
    <div className="w-full relative  ">
      <Carousel
        itemsPerView={itemsPerView}
        loop={loop}
        onHasMovedChange={setHasMoved}
        scrollbar={scrollbar}
        className=""
      >
        {products.map((product) => (
          <div key={product.id} className="w-full mx-auto h-full pr-1">
            <ProductCard product={product} hasMoved={hasMoved} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
