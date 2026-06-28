"use client";

import { useState } from "react";
import ProductList from "@/src/components/product/ProductList";
// import ProductListHeader from "@/src/components/search/ProductListHeader";

export default function CategoryClient({ products }: { products: any[] }) {
  return (
    <div className="py-10">
      <div className="py-2 mb-4 text-[18px] font-medium text-black">
        총 {products.length}건
      </div>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div className="flex items-center justify-center h-125">
          <span className="text-gray-400">상품이 존재하지 않습니다.</span>
        </div>
      )}
    </div>
  );
}
