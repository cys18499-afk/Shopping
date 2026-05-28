"use client";

import { useState } from "react";
import CategoryNav from "../category/CategoryNav";
import ProductCarousel from "./ProductCarousel";
import { Categories } from "@/src/types/category";
import { Product } from "@/src/types/product";
import { getProducts } from "@/src/lib/data/products";
// import { getProducts } from "@/src/lib/data/products";

export default function ProductDisplay({
  initialProducts,
  type,
}: {
  initialProducts: Product[];
  type: string;
}) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [products, setProducts] = useState(initialProducts);

  const handleTabChange = async (tabId: string) => {
    setActiveTab(tabId);
    const newData = await getProducts({ type: type, categoryName: tabId });
    setProducts(newData);
  };

  return (
    <>
      <div className="mb-8">
        <CategoryNav
          activeTab={activeTab}
          categories={Categories}
          onTabChange={handleTabChange}
        />
      </div>

      <ProductCarousel
        products={products}
        itemsPerView={5}
        scrollbar={products.length > 5}
      />
    </>
  );
}
