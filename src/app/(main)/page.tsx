import HeroBannerSection from "@/src/components/banner/HeroBannerSection ";
import FeaturedSection from "@/src/components/featured/FeaturedContainer";
import ProductSection from "@/src/components/product/ProductSection";
import {
  FEATURED_SECTION_CATREGORIES,
  MOCK_KARINA_PRODUCTS1,
  MOCK_KARINA_PRODUCTS2,
  MOCK_KARINA_MAIN_IMAGE,
  MOCK_TWS_PRODUCTS1,
  MOCK_TWS_MAIN_IMAGE,
} from "@/src/mocks/products";

export default function MainPage() {
  return (
    <div>
      <HeroBannerSection />
      <FeaturedSection
        title="KARINA'S SUMMER"
        subtitle="SEASON PICK"
        productsMap={{
          conllection1: MOCK_KARINA_PRODUCTS1,
          conllection2: MOCK_KARINA_PRODUCTS2,
        }}
        mainImage={MOCK_KARINA_MAIN_IMAGE}
        categories={FEATURED_SECTION_CATREGORIES}
      />
      <FeaturedSection
        title="FOCUS EDITION"
        subtitle="TWS with MLB, Turn Up SUMMER"
        productsMap={{
          conllection1: MOCK_TWS_PRODUCTS1,
        }}
        mainImage={MOCK_TWS_MAIN_IMAGE}
      />

      <ProductSection
        title="가장 사랑받는 베스트 아이템"
        subtitle="BEST ITEM"
        type="is_recommend"
      />

      {/* <PromotionSection /> */}
      {/* <BestReviewSection /> */}
    </div>
  );
}
