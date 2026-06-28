export const BADGE_STYLES = {
  BEST: "bg-red-100 text-red-600",
  인기: "bg-red-100 text-red-600",
  NEW: "bg-blue-100 text-blue-600",
  최신: "bg-blue-100 text-blue-600",
  품절: "bg-gray-500 text-white",
  품절임박: "bg-orange-100 text-orange-600",
  할인: "bg-yellow-100 text-yellow-700",
  DEFAULT: "bg-gray-100 text-gray-600",
} as const;

export type BadgeLabel = keyof typeof BADGE_STYLES;

export const getBadgeStyle = (label: string): string => {
  return BADGE_STYLES[label as BadgeLabel] || BADGE_STYLES.DEFAULT;
};
