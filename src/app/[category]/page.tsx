export const revalidate = 60;
import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/src/lib/data/products";
import CategoryClient from "./CategoryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const categoryTitles: Record<string, string> = {
    cap: "야구모자 - MLB Korea",
    clothing: "의류 - MLB Korea",
    accessories: "액세서리 - MLB Korea",
  };

  const categoryDescriptions: Record<string, string> = {
    cap: "MLB 공식 야구모자. 뉴욕양키스, LA 다저스 등 정식 라이센스 야구모자를 합리적인 가격에 만나보세요.",
    clothing: "MLB 공식 의류. 야구 팬들을 위한 다양한 스타일의 의류를 제공합니다.",
    accessories: "MLB 공식 액세서리. 야구 용품 및 팬 아이템을 구매하세요.",
  };

  return {
    title: categoryTitles[decodedCategory] || `${decodedCategory} - MLB Korea`,
    description:
      categoryDescriptions[decodedCategory] || `MLB Korea ${decodedCategory} 상품`,
    keywords: [decodedCategory, "MLB", "야구", "쇼핑"],
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function CategoryResults({ category }: { category: string }) {
  const decodedCategory = decodeURIComponent(category);
  const products = await getProducts({
    categoryName: decodedCategory,
  });
  return <CategoryClient products={products} />;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <div className="py-10">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-125"></div>
        }
      >
        <CategoryResults category={category} />
      </Suspense>
    </div>
  );
}
