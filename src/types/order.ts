import { AddressInput } from "./address";

export type PaymentMethod =
  | "quick_bank_transfer"
  | "credit_card"
  | "tosspay"
  | "payco"
  | "kakaopay"
  | "naverpay";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "failed";

export type OrderFormFields = {
  customerName: string;
  customerNumber: string;
  email: string;
  availableCredit: number;
  usedCredit: number;
  shippingMessage: string;
} & Partial<AddressInput>;

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerNumber: string;

  receiverName: string;
  receiverPhoneNumber: string;

  email?: string;
  originalPrice: number;
  discountPrice?: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  address: string;
  postcode: string;
  detailAddress: string;
  shippingMessage: string;
  createdAt: string;
  updatedAt: string;
  paymentKey: string;
  usedCredit: number;
}

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  discountRate?: number;
  quantity: number;
  subtotal: number;
  thumbnail: string;
  slug: string;
  size: string;
};

export type CreateOrderPayload = Omit<
  OrderWithItems,
  "id" | "userId" | "status" | "createdAt" | "updatedAt" | "paymentKey"
>;

export type OrderError = {
  code: string;
  message: string;
  field?: keyof Order;
};

export interface OrderWithItems extends Order {
  orderItems: OrderItem[];
}

export interface OrderState {
  order: Order | null;
  isValid: boolean;
  isLoading: boolean;
  isWidgetReady: boolean;
  usedCredit: number;

  setUsedCredit: (credit: number) => void;
  setIsWidgetReady: (v: boolean) => void;
  setOrder: (order: OrderWithItems) => void;
  setIsValid: (v: boolean) => void;
  setIsLoading: (v: boolean) => void;
}
