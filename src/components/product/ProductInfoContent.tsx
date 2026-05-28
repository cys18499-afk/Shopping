import Image from "next/image";

export default function ProductInfoContent({
  description,
}: {
  description: string;
}) {
  console.log(description);
  return (
    <div className="relative w-full pt-5">
      <Image
        src={description}
        alt="상품 상세 이미지"
        width={1000}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority
      />
    </div>
  );
}
