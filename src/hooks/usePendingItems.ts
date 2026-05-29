import { useState } from "react";
import { createUniqueKey } from "../lib/utils";
import { PendingItem } from "../types/cart";
import { Product } from "../types/product";

export function usePendingItems(product?: Product) {
  const [pendingItems, setPendingItems] = useState<PendingItem[]>(() => {
    const isSizeFree = product?.sizes?.includes("F");

    if (isSizeFree && product) {
      const uniqueKey = createUniqueKey(product.id, "F");
      return [
        {
          id: product.id,
          uniqueKey: uniqueKey,
          size: "F",
          quantity: 1,
        },
      ];
    }
    return [];
  });

  const handleSelectSize = (product_id: string, size: string) => {
    const uniqueKey = createUniqueKey(product_id, size);

    if (pendingItems.some((item) => item.uniqueKey === uniqueKey)) {
      alert("이미 같은 상품이 존재합니다.");
      return;
    }
    setPendingItems((prev) => [
      ...prev,
      { id: product_id, uniqueKey: uniqueKey, size, quantity: 1 },
    ]);
  };

  const handleIncrease = (uniqueKey: string) => {
    setPendingItems((prev) =>
      prev.map((item) =>
        item.uniqueKey === uniqueKey && item.quantity < 50
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecrease = (uniqueKey: string) => {
    setPendingItems((prev) =>
      prev.map((item) =>
        item.uniqueKey === uniqueKey && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemove = (uniqueKey: string) => {
    setPendingItems((prev) =>
      prev.filter((item) => item.uniqueKey !== uniqueKey),
    );
  };

  return {
    pendingItems,
    handleSelectSize,
    handleIncrease,
    handleDecrease,
    handleRemove,
  };
}
