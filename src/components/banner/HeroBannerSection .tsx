import Image from "next/image";

export default function HeroBannerSection() {
  return (
    <section className="w-full h-[500px] mb-20 bg-white relative">
      <Image
        src="https://rlccqilvxjwokzhxzrpz.supabase.co/storage/v1/object/public/product-images/banner.png"
        alt="Hero Banner"
        fill
        className="object-cover"
        priority
      />
    </section>
  );
}
