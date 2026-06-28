import { getWishProducts } from "@/src/lib/data/wish";
import WishlistClient from "../../../components/wish/WishlistClient";
import { Suspense } from "react";

export default function WishlistPage() {
  return (
    <div className="w-full">
      <div className="mb-5 border-b-2 border-black text-[14px] py-1 "></div>
      <Suspense fallback={<div> </div>}>
        <WishlistContent />
      </Suspense>
    </div>
  );
}

async function WishlistContent() {
  const products = await getWishProducts();

  return <WishlistClient initialProducts={products} />;
}
