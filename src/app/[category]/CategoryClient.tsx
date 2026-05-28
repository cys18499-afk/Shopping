"use client";

import { useState } from "react";
import ProductList from "@/src/components/product/ProductList";
import ProductListHeader from "@/src/components/search/ProductListHeader";

export default function CategoryClient({ products }: { products: any[] }) {
  const [cols, setCols] = useState(5);

  return (
    <div className="py-10">
      <ProductListHeader
        length={products.length}
        currentCols={cols}
        onColChange={setCols}
      />
      {products.length > 0 ? (
        <ProductList products={products} cols={cols as 5 | 6} />
      ) : (
        <div className="flex items-center justify-center h-125">
          <span className="text-gray-400">상품이 존재하지 않습니다.</span>
        </div>
      )}
    </div>
  );
}
