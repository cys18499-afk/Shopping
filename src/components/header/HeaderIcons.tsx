"use client";

import { ShoppingBag, User, Heart } from "lucide-react";
import Link from "next/link";
import IconLink from "../common/IconLink";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useCartStore } from "@/src/store/CartStore";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { useState } from "react";
import Search from "../layout/Search";
import { useAuthStore } from "@/src/store/AuthStore";

export default function HeaderIcons({ user }: { user: SupabaseUser | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuthStore();
  const ref = useOutsideClick(() => setIsOpen(false));
  const cartLength = useCartStore((c) => c.items).length;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-5">
      <Search />

      <div className="relative" ref={ref}>
        {user ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center gap-0.5 cursor-pointer"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
            <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
              MY
            </span>
          </button>
        ) : (
          <IconLink href="/login">
            <div className="flex flex-col items-center gap-0.5">
              <User className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
                LOGIN
              </span>
            </div>
          </IconLink>
        )}
        {user && isOpen && (
          <div className="absolute mt-3 w-24 bg-white border border-neutral-100 rounded-md shadow-xl flex flex-col overflow-hidden z-999">
            <Link
              href="/mypage"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-center text-[11px] cursor-pointer"
            >
              마이페이지
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-[11px] cursor-pointer"
            >
              LOG OUT
            </button>
          </div>
        )}
      </div>

      <IconLink href="/mypage/wishlist">
        <div className="flex flex-col items-center gap-0.5">
          <Heart className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
            WISH
          </span>
        </div>
      </IconLink>

      <IconLink href="/cart">
        <div className="flex flex-col items-center gap-0.5 relative">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white text-[9px] font-bold">
              {cartLength}
            </span>
          </div>
          <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
            CART
          </span>
        </div>
      </IconLink>
    </div>
  );
}
