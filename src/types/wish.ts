export type Wish = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
};

export interface WishState {
  wishedIds: Set<string>;
  setWishedIds: (ids: string[]) => void;
  toggle: (id: string) => Promise<void>;
  isWished: (id: string) => boolean;
  clearAll: () => Promise<void>;
}
