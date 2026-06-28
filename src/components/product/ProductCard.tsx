"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Product } from "@/src/types/product";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useTransition } from "react";
import Toast from "../common/Toast";
import { Heart } from "lucide-react";
import { useWishStore } from "@/src/store/wishStore";
import { useCartStore } from "@/src/store/CartStore";
import {
  calculateDisplayPrice,
  createUniqueKey,
  formatCurrency,
} from "@/src/lib/utils";
import { UI_CONSTANTS } from "@/src/constants/ui-constants";
import { useAuthStore } from "@/src/store/AuthStore";

export default function ProductCard({
  product,
  hasMoved,
  wishIcon = true,
}: {
  product: Product;
  hasMoved?: boolean;
  wishIcon?: boolean;
}) {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const { user } = useAuthStore();
  const [, startTransition] = useTransition();

  const wishedIds = useWishStore((s) => s.wishedIds);
  const toggle = useWishStore((s) => s.toggle);
  const addItem = useCartStore((c) => c.addItem);
  const isWished = wishedIds.has(product.id);

  const handleAddToCartClick = (
    e: React.MouseEvent,
    size: string,
    product: Product,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const newItem = {
      id: createUniqueKey(product.id, size),
      productId: product.id,
      productName: product.productName,
      unitPrice: product.unitPrice,
      discountRate: product.discountRate,
      thumbnail: product.thumbnail[0],
      slug: product.slug,
      size: size,
      quantity: 1,
    };

    addItem(newItem);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), UI_CONSTANTS.TOAST_TIMEOUT);
  };

  const handleWishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      return alert("로그인이 필요한 서비스입니다.");
    }
    startTransition(async () => {
      await toggle(product.id);
    });
  };

  const pointerClass = hasMoved ? "pointer-events-none" : "pointer-events-auto";
  const hasSecondImage =
    !!product.thumbnail[1] && product.thumbnail[1].length > 0;

  return (
    <div className="group bg-white w-full pb-5 h-full ">
      <Link
        href={`/product-detail/${product.slug}`}
        className={clsx(
          "relative block w-full aspect-[3/4] overflow-hidden ",
          pointerClass,
        )}
      >
        <Image
          alt={product.productName}
          src={product.thumbnail[0]}
          fill
          sizes="280px"
          draggable="false"
          className={clsx(
            "object-cover select-none bg-[#e7e6e6f8] transition-opacity duration-300",
            hasSecondImage
              ? "group-hover:opacity-0"
              : "group-hover:opacity-100",
          )}
        />

        {hasSecondImage && (
          <Image
            alt={`${product.productName} hover`}
            src={product.thumbnail[1]}
            fill
            sizes="280px"
            draggable="false"
            className="object-cover select-none bg-[#e7e6e6f8] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {wishIcon && (
          <button
            onClick={handleWishClick}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full cursor-pointer bg-transparent"
            aria-label={isWished ? "위시리스트 제거" : "위시리스트 추가"}
          >
            <Heart
              className="stroke-[1.5] transition-transform duration-100 active:scale-125"
              size={UI_CONSTANTS.ICON_SIZE_SM}
              fill={isWished ? "red" : "white"}
              stroke={isWished ? "red" : ""}
            />
          </button>
        )}

        <div
          className={clsx(
            "absolute bottom-0 left-0 w-full bg-white/50 text-black py-3 text-center cursor-default",
            "opacity-0 duration-300 group-hover:opacity-100",
            pointerClass,
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="flex justify-center gap-2">
            {product.sizes?.map((size) => (
              <div key={size} className="group/size relative cursor-pointer">
                <span
                  className="border-b text-[11px] font-medium transition-colors hover:text-gray-600"
                  onClick={(e) => handleAddToCartClick(e, size, product)}
                >
                  {size}
                </span>
                <div
                  className={clsx(
                    "absolute left-1/2 -translate-x-1/2 bottom-full px-3 py-2 mb-2",
                    "bg-black text-white text-[11px] whitespace-nowrap rounded shadow-lg",
                    "pointer-events-none transition-all duration-200",
                    "opacity-0 translate-y-1",
                    "group-hover/size:opacity-100 group-hover/size:translate-y-0",
                  )}
                >
                  장바구니에 담기
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-black" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <Link
          href={`/product-detail/${product.slug}`}
          className={clsx("block w-full", pointerClass)}
        >
          <h3 className="block w-full h-5 text-sm font-medium text-gray-900 truncate">
            {product.productName}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          {!product.discountRate ||
            (product.discountRate > 0 && (
              <span className="text-[14px] text-red-500 font-bold">
                {product.discountRate}%
              </span>
            ))}
          <span className="text-[14px] font-bold text-gray-900">
            {formatCurrency(
              calculateDisplayPrice(product.unitPrice, product.discountRate),
            )}
          </span>
        </div>
      </div>

      {isToastVisible && (
        <Toast message={"해당 상품이 장바구니에 담겼습니다."} />
      )}
    </div>
  );
}
