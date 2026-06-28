import { create } from "zustand";
import { OrderState, OrderWithItems } from "../types/order";

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  isValid: false,
  isLoading: false,
  isWidgetReady: false,
  usedCredit: 0,

  setUsedCredit: (c: number) => set({ usedCredit: c }),
  setIsWidgetReady: (v: boolean) => set({ isWidgetReady: v }),
  setOrder: (order: OrderWithItems) => set({ order }),
  setIsValid: (v: boolean) => set({ isValid: v }),
  setIsLoading: (v: boolean) => set({ isLoading: v }),
}));
