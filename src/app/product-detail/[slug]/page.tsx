export const revalidate = 60;

import type { Metadata } from "next";
import { Suspense } from "react";

import ProductImage from "@/src/components/product/ProductImage";
import ProductSummary from "@/src/components/product/ProductSummary";
import ProductTabs from "@/src/components/product/ProductTabs";
import InfoContent from "@/src/components/product/ProductInfoContent";
import SizeContent from "@/src/components/product/ProductSizeContent";

import { getProductDetail } from "@/src/lib/data/products";
import { getReviewsByProduct } from "@/src/lib/data/review";
import ReviewWrapper from "@/src/components/review/ReviewWrapper";

async function ReviewSection({ slug }: { slug: string }) {
  const reviews = await getReviewsByProduct(slug);
  return <ReviewWrapper reviews={reviews} slug={slug} />;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  return (
    <div className="flex flex-col lg:flex-row w-full py-4 gap-4">
      <div className="flex flex-col flex-[2] w-full min-w-0">
        <ProductImage images={product.images} />
        <ProductTabs
          infoContent={<InfoContent description={product.description} />}
          sizeContent={<SizeContent size={product.sizes ?? []} />}
          reviewContent={
            <Suspense
              fallback={
                <div className="py-10 text-gray-400">리뷰 로딩 중...</div>
              }
            >
              <ReviewSection slug={slug} />
            </Suspense>
          }
        />
      </div>
      <ProductSummary product={product} />
    </div>
  );
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const product = await getProductDetail(slug);

//   if (!product) return {};

//   return {
//     title: product.productName,
//     description: product.description,
//     openGraph: {
//       title: product.productName,
//       description: product.description,
//       images: product.images?.[0] ? [product.images[0]] : [],
//     },
//   };
// }
