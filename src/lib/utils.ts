import { Review } from "../types/review";

/**
 * 조건부 클래스명을 합쳐주는 유틸리티 (Tailwind 스타일링용)
 * @example cls("flex", isHidden && "hidden", "p-4") => "flex p-4"
 */
export function cls(...classnames: (string | boolean | undefined)[]) {
  return classnames.filter(Boolean).join(" ");
}

/**
 * 장바구니나 리스트에서 상품을 식별하기 위한 고유 키 생성
 * @param productId - 상품 ID
 * @param size - 선택한 사이즈
 */
export const createUniqueKey = (productId: string, size: string) =>
  `${productId}-${size}`;

/**
 * 사용자 이름 마스킹 처리 (첫 글자 제외 별표 처리)
 * @example maskUserName("김철수") => "김****"
 */
export const maskUserName = (name: string | number): string => {
  const strName = String(name);
  if (strName.length <= 1) return strName;
  if (strName.length === 2) {
    return strName[0] + "*";
  }

  return strName[0] + "*".repeat(strName.length - 2) + strName.slice(-1);
};

/**
 * 금액 포맷팅 (세 자리마다 콤마 추가 및 통화 단위 결합)
 * @param unitPrice - 포맷팅할 금액
 * @param currency - 통화 단위 (기본값: "원")
 * @example formatCurrency(39000) => "39,000원"
 * @returns 000,000 원
 */
export const formatCurrency = (unitPrice: number, currency = "원"): string => {
  return `${unitPrice.toLocaleString()}${currency}`;
};

/**
 * 할인율을 적용한 실제 판매가 계산
 * @param unitPrice - 원가
 * @param discountRate - 할인율 (1~100 사이의 숫자)
 * @returns 할인된 최종 금액 (소수점 반올림 처리)
 */
export const calculateDisplayPrice = (
  unitPrice: number,
  discountRate?: number,
) => {
  if (!discountRate || discountRate <= 0) return unitPrice;
  return Math.round(unitPrice * (1 - discountRate / 100));
};

/**
 * 현재 날짜를 기준으로 특정 개월 전의 날짜를 YYYY-MM-DD 형식으로 반환
 * @param monthsAgo - 계산할 개월 수 (기본값: 0)
 * @example getFormattedDate(3) // 3개월 전 날짜 반환
 * @returns 0000-00-00
 */
export const getFormattedDate = (monthsAgo: number = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 현재 날짜를 기준으로 지정한 일 수 이내인지 여부 계산
 * @param createdAt - 생성된 날짜 문자열 (예: '2026-05-19')
 * @param days - 계산할 일 수 (기본값 : 14일)
 * @returns boolean
 */
export const isWithinDays = (createdAt: string, days: number = 14): boolean => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  // 00:00:00으로 밀어버리기
  createdDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffInTime = now.getTime() - createdDate.getTime();
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  // 미래 날짜 방지 및 범위 체크
  return diffInDays >= 0 && diffInDays <= days;
};

/**
 * @param dateInput - 생성된 날짜 (문자열 또는 Date 객체)
 * @returns 'YYYY. MM. DD' 형태의 문자열
 */
export const dateOnly = (dateInput: string | Date): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    return "";
  }
  return date
    .toLocaleDateString("ko-KR")
    .replace(/\s*$/, "")
    .replace(/\.$/, "");
};

/**
 * @param reviews - 리뷰에서 이미지들을 추출해서 평탄화 배열
 * @returns imgUrl,review[]
 */
export const flattenReviewImages = (reviews: Review[]) => {
  return reviews.flatMap((review) =>
    (review.images || []).map((imgUrl) => ({
      imgUrl,
      review,
    })),
  );
};

/**
 * 입력값을 전화번호 형식으로 포매팅
 * @param value - 폰 번호
 * @returns 000-0000-0000
 */
export const formatPhone = (value: string | null) => {
  const digits = value?.replace(/[^0-9]/g, "").slice(0, 11);
  return digits?.replace(/^(\d{3})(\d{1,4})?(\d{1,4})?$/, (_, a, b, c) =>
    [a, b, c].filter(Boolean).join("-"),
  );
};

/**
 * 포매팅된 전화번호에서 하이폰 제거 (백엔드 전송용)
 * @param phoneNumber - 포매팅된 전화번호
 * @returns 순수 숫자 전화번호
 */
export const getRawPhone = (phoneNumber: string | null): string => {
  if (!phoneNumber) return "";
  return phoneNumber.replace(/-/g, "");
};
