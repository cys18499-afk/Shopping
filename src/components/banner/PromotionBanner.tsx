import Image from "next/image";
import pvAvif1 from "../../assets/images/promotion/content_01_img_01.jpeg";
import pvAvif2 from "../../assets/images/promotion/content_01_img_02.jpeg";
import LinkPlusButton from "../common/buttons/LinkPlusButton";

export default function PromotionSection() {
  return (
    <section className="w-full mb-20 bg-white">
      <div className="flex w-full bg-white overflow-hidden">
        <div className="grid grid-cols-3 w-full">
          <div className="relative aspect-[3/4]">
            <Image
              src={pvAvif1}
              alt="MLB LIKE 컬렉션 1"
              fill
              className="object-contain"
            />
            <LinkPlusButton href="" top="50px" left="250px" ariaLabel="모자" />
          </div>

          <div className="relative aspect-[3/4]">
            <Image
              src={pvAvif2}
              alt="MLB LIKE 컬렉션 2"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative aspect-[3/4]">
            <Image
              src={pvAvif2}
              alt="MLB LIKE 컬렉션 메인"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
