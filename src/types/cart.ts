export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  discountRate?: number;
  thumbnail: string;
  size: string;
  quantity: number;
  slug: string;
};

export type PendingItem = {
  id: string;
  uniqueKey: string;
  size: string;
  quantity: number;
};

export interface CartState {
  items: CartItem[];
  checkoutItems: CartItem[];

  setCheckoutItems: (items: CartItem[]) => void;
  addItem: (item: CartItem | CartItem[]) => Promise<void>;
  removeItems: (ids: string | string[]) => Promise<void>;
  updateItem: (params: UpdateParams) => Promise<void>;
  initializeItems: (items: CartItem[]) => void;
  clearAll: () => void;
}

export type UpdateParams = {
  id: string;
  quantity?: number;
  size?: string;
};
