import { create } from "zustand";
import { clearWishlist, toggleWishlist } from "../lib/actions/wish";
import { WishState } from "../types/wish";

export const useWishStore = create<WishState>()((set, get) => ({
  wishedIds: new Set(),
  setWishedIds: (ids) => set({ wishedIds: new Set(ids) }),

  toggle: async (id) => {
    const prev = get().wishedIds;
    const next = new Set(prev);

    const isAdding = !next.has(id);
    if (isAdding) {
      next.add(id);
    } else {
      next.delete(id);
    }

    set({ wishedIds: next });

    try {
      await toggleWishlist(id);
    } catch (error) {
      console.error("위시리스트 토글 실패", error);
      set({ wishedIds: prev });
    }
  },

  isWished: (id) => get().wishedIds.has(id),

  clearAll: async () => {
    const prev = get().wishedIds;
    set({ wishedIds: new Set() });

    try {
      await clearWishlist();
    } catch (error) {
      console.error("[위시리스트 전체 삭제 실패]", error);
      set({ wishedIds: prev });
    }
  },
}));
