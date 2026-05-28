"use client";

import Image from "next/image";
import FeaturedFilterTabs, { FeaturedCategory } from "./FeaturedFilterTabs";
import Carousel from "../Carousel";
import { Product } from "@/src/types/product";
import ProductCarousel from "../product/ProductCarousel";
import { useState } from "react";
import SectionHeader from "../SectionHeader";

type TabType = "conllection1" | "conllection2";

export default function FeaturedSection({
  title,
  subtitle,
  productsMap,
  mainImage,
  categories,
}: {
  title: string;
  subtitle: string;
  productsMap: Partial<Record<TabType, Product[]>>;
  mainImage: { id: string; src: string; alt: string }[];
  categories?: FeaturedCategory[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>("conllection1");
  const activeIndex = mainImage.findIndex((b) => b.id === activeTab);

  const activeProducts = productsMap[activeTab] || [];

  return (
    <section>
      <div className="w-full mb-20">
        <div className="flex items-end justify-between ">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>

        {categories && categories.length > 0 && (
          <FeaturedFilterTabs
            categories={categories}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as TabType)}
          />
        )}

        <div className="relative flex gap-6 h-[400px]">
          <div className="relative w-[400px] h-full aspect-square">
            <Carousel
              loop
              externalIndex={activeIndex >= 0 ? activeIndex : 0}
              onIndexChange={(index) => {
                const banner = mainImage[index];
                setActiveTab(banner.id as TabType);
              }}
            >
              {mainImage.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 relative w-full h-full cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>
            {mainImage.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-black bg-gray-200/10 py-1 px-2">
                {activeIndex + 1}/{mainImage.length}
              </div>
            )}
          </div>
          <div className="flex-1 h-full overflow-hidden" key={activeTab}>
            <ProductCarousel
              products={activeProducts}
              itemsPerView={3}
              scrollbar={activeProducts.length > 3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
