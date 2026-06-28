import Link from "next/link";
import clsx from "clsx";
import ProductList from "@/src/components/product/ProductList";
import { getProductSearch } from "@/src/lib/data/products";

export default async function AsyncSearchContainer({
  q,
  sort,
}: {
  q: string;
  sort?: string;
}) {
  const products = await getProductSearch(q, sort);

  const isPriceAsc = sort === "price_asc";
  const isPriceDesc = sort === "price_desc";

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="py-2 mb-4 text-[18px] font-medium text-black">
          총 {products.length}건
        </div>

        <div className="flex gap-3 text-sm items-center">
          <Link
            href={`?q=${q}&sort=price_asc`}
            className={clsx("transition-colors duration-200", {
              "font-bold text-black": isPriceAsc,
              "text-gray-400 hover:text-black": !isPriceAsc,
            })}
          >
            가격 낮은순
          </Link>

          <span className="text-gray-300">|</span>

          <Link
            href={`?q=${q}&sort=price_desc`}
            className={clsx("transition-colors duration-200", {
              "font-bold text-black": isPriceDesc,
              "text-gray-400 hover:text-black": !isPriceDesc,
            })}
          >
            가격 높은순
          </Link>
        </div>
      </div>

      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div className="flex items-center justify-center h-125">
          <span className="text-gray-500">검색 결과가 없습니다.</span>
        </div>
      )}
    </div>
  );
}
