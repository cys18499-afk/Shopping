"use client";

import { useEffect } from "react";
import { CartItem } from "@/src/types/cart";
import { useCartStore } from "../../store/CartStore";
import { useAuthStore } from "../../store/AuthStore";

export default function CartInitializer({
  cartItems,
}: {
  cartItems: CartItem[];
}) {
  const initializeItems = useCartStore((s) => s.initializeItems);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && cartItems) {
      initializeItems(cartItems);
    }
  }, [cartItems, initializeItems, user]);

  return null;
}
