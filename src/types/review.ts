export type Review = {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  userId: string;
  rating: number;
  content: string;
  userName: string;
  images: string[];
  size: string;
  createdAt: string;
};
export type SortOption = "latest" | "rating";

export interface FilterState {
  rating: number[];
  size: string[];
  sortBy: SortOption;
  photoOnly: boolean;
  keyword: string;
}

export const getInitialFilter = (): FilterState => ({
  rating: [],
  size: [],
  sortBy: "latest",
  photoOnly: false,
  keyword: "",
});

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "latest", label: "최신순" },
  { id: "rating", label: "별점순" },
];

export const FILTER_CONFIG = {
  RATING: { id: "rating", label: "별점", unit: "점" },
  SIZE: { id: "size", label: "사이즈", unit: "" },
} as const;

export const STAR_LABELS: Record<number, string> = {
  5: "아주 좋아요",
  4: "좋아요",
  3: "보통이에요",
  2: "그저 그래요",
  1: "별로예요",
};
// export const SORT_OPTIONS = [
//   { id: "latest", label: "최신순" },
//   { id: "recommend", label: "추천순" },
//   { id: "rating", label: "별점순" },
// ];
export const HEIGHT_OPTIONS = [
  { value: "under_150", label: "150cm 이하" },
  { value: "150_154", label: "150 ~ 154cm" },
  { value: "155_159", label: "155 ~ 159cm" },
  { value: "160_164", label: "160 ~ 164cm" },
  { value: "165_169", label: "165 ~ 169cm" },
  { value: "170_174", label: "170 ~ 174cm" },
  { value: "175_179", label: "175 ~ 179cm" },
  { value: "180_184", label: "180 ~ 184cm" },
  { value: "185_189", label: "185 ~ 189cm" },
  { value: "over_190", label: "190cm 이상" },
];
export const WEIGHT_OPTIONS = [
  { value: "under_44", label: "44kg 이하" },
  { value: "45_49", label: "45 ~ 49kg" },
  { value: "50_54", label: "50 ~ 54kg" },
  { value: "55_59", label: "55 ~ 59kg" },
  { value: "60_64", label: "60 ~ 64kg" },
  { value: "65_69", label: "65 ~ 69kg" },
  { value: "70_74", label: "70 ~ 74kg" },
  { value: "75_79", label: "75 ~ 79kg" },
  { value: "80_84", label: "80 ~ 84kg" },
  { value: "85_89", label: "85 ~ 89kg" },
  { value: "over_90", label: "90kg 이상" },
];

export const SIZE_OPTIONS = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "2xl", label: "2XL" },
];

export type FilterId = (typeof FILTER_CONFIG)[keyof typeof FILTER_CONFIG]["id"];

export type FilterLabel =
  (typeof FILTER_CONFIG)[keyof typeof FILTER_CONFIG]["label"];

export const LABEL_TO_KEY = Object.fromEntries(
  Object.values(FILTER_CONFIG).map((f) => [f.label, f.id]),
) as Record<FilterLabel, FilterId>;
