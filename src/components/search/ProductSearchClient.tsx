"use client";

import { useState } from "react";
import ProductListHeader from "./ProductListHeader";

import { Product } from "@/src/types/product";
import ProductList from "../product/ProductList";

export default function ProductSearchClient({
  products,
}: {
  products: Product[];
}) {
  const [cols, setCols] = useState(5);

  return (
    <div>
      <ProductListHeader
        length={products.length}
        currentCols={cols}
        onColChange={setCols}
      />
      {products.length > 0 ? (
        <ProductList products={products} cols={cols} />
      ) : (
        <div className="flex items-center justify-center h-125 ">
          <span className="text-gray-500">검색 결과가 없습니다.</span>
        </div>
      )}
    </div>
  );
}
