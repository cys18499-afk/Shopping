export type SizeClass = `size-[${number}px]` | `size-${number}` | `size-full`;

export type InputStatus = "normal" | "error" | "success" | "disabled";

export interface InputConfig {
  status: InputStatus;
  placeholder: string;
  errorMessage?: string; // 에러일 때만 노출할 문구
}

export type ModalType = "alert" | "confirm" | "bottom-sheet";

export interface ModalProps {
  type: ModalType;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export type CardLayout = "grid" | "list" | "hero";

export interface ProductCardConfig {
  layout: CardLayout;
  isWishlisted: boolean; // 찜하기 버튼 활성화 여부
  showDescription: boolean; // 설명글 노출 여부
}

export interface PriceProps {
  originalPrice: number;
  discountRate?: number; // 할인율이 있으면 할인가 자동 계산
  size: "sm" | "md" | "lg"; // 폰트 크기 구분
}
