"use client";

import { Product } from "@/src/types/product";
import ProductCard from "./ProductCard";
import clsx from "clsx";

export default function ProductList({
  products,
  cols,
}: {
  products: Product[];
  cols: number;
}) {
  const gridCols =
    {
      5: "grid-cols-5",
      7: "grid-cols-7",
    }[cols] || "grid-cols-5";

  return (
    <div>
      <div className={clsx("grid gap-x-2 gap-y-6", gridCols)}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
