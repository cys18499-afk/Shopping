import { Suspense } from "react";
import ProductSearchClient from "@/src/components/search/ProductSearchClient";
import SearchBar from "@/src/components/search/SearchBar";
import { getProductSearch } from "@/src/lib/data/products";

async function SearchResults({ q }: { q: string }) {
  const products = await getProductSearch(q);
  return <ProductSearchClient products={products} />;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div>
      <div className="py-6">
        <SearchBar initialKeyword={q} />
      </div>

      <Suspense
        key={q}
        fallback={
          <div className="flex h-[500px] items-center justify-center">
            {/* <Spinner /> */}
            <span>로딩 중입니다..</span>
          </div>
        }
      >
        <SearchResults q={q} />
      </Suspense>
    </div>
  );
}
