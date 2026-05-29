import { Suspense } from "react";
import { getProducts } from "@/src/lib/data/products";
import CategoryClient from "./CategoryClient";

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
        key={category}
        fallback={
          <div className="flex h-[500px] items-center justify-center">
            <span>로딩중입니다...</span>
          </div>
        }
      >
        <CategoryResults category={category} />
      </Suspense>
    </div>
  );
}
