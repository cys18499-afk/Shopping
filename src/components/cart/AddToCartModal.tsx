"use client";

import Link from "next/link";
import { Product } from "@/src/types/product";
import ProductCard from "../product/ProductCard";

const mockProducts: Product[] = [
  {
    id: "1",
    productName: "에이프릴 볼캡",
    unitPrice: 36000,
    description: "심플한 디자인의 에이프릴 볼캡입니다.",
    categoryId: "cap",
    thumbnail: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    slug: "april-ball-cap-brown",
    sizes: ["FREE"],
    stock: 50,
    isNew: true,
  },
  {
    id: "2",
    productName: "에이프릴 볼캡",
    unitPrice: 36000,
    description: "심플한 디자인의 에이프릴 볼캡입니다.",
    categoryId: "cap",
    thumbnail: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    slug: "april-ball-cap-beige",
    sizes: ["FREE"],
    stock: 50,
  },
  {
    id: "3",
    productName: "에이프릴 볼캡",
    unitPrice: 36000,
    description: "심플한 디자인의 에이프릴 볼캡입니다.",
    categoryId: "cap",
    thumbnail: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    slug: "april-ball-cap-charcoal",
    sizes: ["FREE"],
    stock: 50,
  },
  {
    id: "4",
    productName: "에이프릴 볼캡 ",
    unitPrice: 36000,
    description: "심플한 디자인의 에이프릴 볼캡입니다.",
    categoryId: "cap",
    thumbnail: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
    ],
    slug: "april-ball-cap-navy",
    sizes: ["FREE"],
    stock: 50,
  },
];

export default function AddToCartModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[700px] bg-white px-6 mb-6">
      <h2 className="text-[18px] text-gray-900 mb-5 text-center pt-2">
        장바구니 담기 완료
      </h2>
      <p className="text-[14px] font-bold text-gray-800 mb-4">
        함께 구매하면 좋은 상품
      </p>

      <div className="grid grid-cols-4 gap-2 w-full">
        {mockProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-10 pb-8">
        <Link
          href="/cart"
          className="border border-gray-300 w-33 h-12 py-3.5 text-center text-[13px] text-gray-800 "
        >
          장바구니 보기
        </Link>
        <button
          className="bg-black py-3.5 text-center w-33 h-12 text-[13px] text-white cursor-pointer hover:bg-[#2b2b2b] transition-colors"
          onClick={onClose}
        >
          쇼핑 계속하기
        </button>
      </div>
    </div>
  );
}
