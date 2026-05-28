import SectionHeader from "../SectionHeader";
import ProductDisplay from "./ProductDisplay";
import { getProducts } from "@/src/lib/data/products";

export default async function ProductSection({
  title,
  type,
  subtitle,
}: {
  title: string;
  type: string;
  subtitle: string;
}) {
  const initialProducts = await getProducts({ type: type });

  return (
    <section className="mb-10">
      <SectionHeader title={title} subtitle={subtitle} />
      <ProductDisplay initialProducts={initialProducts} type={type} />
    </section>
  );
}
