"use client";

import { useEffect } from "react";
import { useWishStore } from "@/src/store/wishStore";

export default function WishInitializer({
  wishedIds,
}: {
  wishedIds: string[];
}) {
  const setWishedIds = useWishStore((s) => s.setWishedIds);
  useEffect(() => {
    setWishedIds(wishedIds);
  }, []);
  return null;
}
