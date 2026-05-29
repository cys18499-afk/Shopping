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

type TabType = "conllection1" | "conllection2";

export default function FeaturedSection({
  title,
  subtitle,
  productsMap,
  mainImage,
  categories,
  loof,
}: {
  title: string;
  subtitle: string;
  productsMap: Partial<Record<TabType, Product[]>>;
  mainImage: FeaturedSectionMainImage;
  categories?: FeaturedCategory[];
  loof?: boolean;
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
              loop={loof}
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
