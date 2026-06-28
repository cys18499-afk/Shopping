"use client";

import Image from "next/image";
import FeaturedFilterTabs, { FeaturedCategory } from "./FeaturedFilterTabs";
import Carousel from "../Carousel";
import { Product } from "@/src/types/product";
import ProductCarousel from "../product/ProductCarousel";
import { useState } from "react";
import SectionHeader from "../SectionHeader";
import Link from "next/link";
import { FeaturedSectionMainImage } from "@/src/mocks/products";

type TabType = "collection1" | "collection2";

export default function FeaturedSection({
  title,
  subtitle,
  productsMap,
  mainImage,
  categories,
  loop,
}: {
  title: string;
  subtitle: string;
  productsMap: Partial<Record<TabType, Product[]>>;
  mainImage: FeaturedSectionMainImage;
  categories?: FeaturedCategory[];
  loop?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("collection1");
  const activeIndex = mainImage.findIndex((b) => b.id === activeTab);
  const activeProducts = productsMap[activeTab] || [];

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[90rem] mx-auto mb-20">
        <div className="flex items-end justify-between">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>

        {categories && categories.length > 0 && (
          <FeaturedFilterTabs
            categories={categories}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as TabType)}
          />
        )}

        <div className="w-full pb-4 overflow-hidden">
          <div className="relative flex gap-4 min-[90rem]:gap-6 h-[25rem] min-[90rem]:h-[28.125rem] items-center">
            <div className="relative w-[25rem] min-[90rem]:w-[28.125rem] shrink-0 aspect-square">
              <Carousel
                loop={loop}
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
                    <Link href={item.href}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>

            <div
              className="flex-1 shrink-0 h-full overflow-hidden"
              key={activeTab}
            >
              <ProductCarousel
                products={activeProducts}
                itemsPerView={3}
                scrollbar={activeProducts.length > 3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
