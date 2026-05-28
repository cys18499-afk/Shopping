export const UI_CONSTANTS = {
  TOAST_TIMEOUT: 1000,
  ICON_SIZE_SM: 15,
  ICON_SIZE_MD: 18,
  ICON_SIZE_LG: 24,
  Z_INDEX: {
    MODAL: "z-50",
    DROPDOWN: "z-40",
    TOOLTIP: "z-30",
    OVERLAY: "z-20",
    DEFAULT: "z-10",
    BACKGROUND: "z-0",
  },
  ANIMATION: {
    DURATION_FAST: 100,
    DURATION_BASE: 200,
    DURATION_SLOW: 300,
  },
} as const;

export const PAYMENT_COLORS = {
  KAKAO: "#FEE500",
  KAKAO_TEXT: "#191919",
  TOSS: "#0064FF",
  TOSS_GRAY: "#202632",
} as const;
