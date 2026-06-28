import { Suspense } from "react";
import type { Metadata } from "next";
import SearchBar from "@/src/components/search/SearchBar";
import AsyncSearchContainer from "./AsyncSearchContainer";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q: string; sort?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const decodedQuery = decodeURIComponent(q || "");

  return {
    title: `"${decodedQuery}" 검색 결과 - MLB Korea`,
    description: `MLB Korea에서 "${decodedQuery}"에 대한 검색 결과를 확인하세요.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string; sort?: string }>;
}) {
  const { q, sort } = await searchParams;

  return (
    <div>
      <div className="py-6">
        <SearchBar initialKeyword={q} />
      </div>

      <Suspense key={q} fallback={<div className="h-125"></div>}>
        <AsyncSearchContainer q={q} sort={sort} />
      </Suspense>
    </div>
  );
}
