import { getWishProducts } from "@/src/lib/data/wish";
import WishlistClient from "../../../components/wish/WishlistClient";

export default async function WishlistPage() {
  const products = await getWishProducts();
  return <WishlistClient initialProducts={products} />;
}
