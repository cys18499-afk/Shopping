"use client";

import { useEffect } from "react";
import { CartItem } from "@/src/types/cart";
import { useCartStore } from "../../store/CartStore";

export default function CartInitializer({
  cartItems,
}: {
  cartItems: CartItem[];
}) {
  const initializeItems = useCartStore((s) => s.initializeItems);

  useEffect(() => {
    if (cartItems) {
      initializeItems(cartItems);
    }
  }, [cartItems, initializeItems]);

  return null;
}
