export const shippingMessageOptions = [
  "직접 입력",
  "부재 시 경비실에 맡겨주세요",
  "부재 시 문 앞에 놓아주세요",
  "배송 전에 연락주세요",
  "배관함에 넣어주세요",
  "무인 택배함에 보관해주세요",
];

export const YEARS = Array.from(
  { length: 2026 - 2015 + 1 },
  (_, i) => 2026 - i + "년",
);
export const MONTHS = Array.from({ length: 12 }, (_, i) => 12 - i + "월");
