import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { signOut } from "../lib/actions/user";

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: async () => {
    await signOut();
    set({ user: null });
  },
}));
