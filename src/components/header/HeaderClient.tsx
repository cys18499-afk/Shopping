"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { cls } from "@/src/lib/utils";
import { useState, useEffect } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import HeaderIcons from "./HeaderIcons";
import { NAV_MENU, NavItem } from "./NavMenu";

export default function HeaderClient({ user }: { user: SupabaseUser | null }) {
  const [showtopBanner, setShowTopBanner] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const handleClose = () => {
    const minutes = 30;
    const expiryTime = Date.now() + minutes * 60 * 1000;
    localStorage.setItem(
      "showtopBanner",
      JSON.stringify({ value: false, expiry: expiryTime }),
    );
    setShowTopBanner(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const itemStr = localStorage.getItem("showtopBanner");
    if (itemStr) {
      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        localStorage.removeItem("showtopBanner");
        setShowTopBanner(true);
      } else {
        setShowTopBanner(item.value);
      }
    }
  }, []);

  return (
    <>
      <header className="bg-white">
        {showtopBanner && (
          <div className="relative flex items-center bg-black h-10">
            <div className="w-full flex items-center justify-end">
              <p className="absolute left-1/2 -translate-x-1/2 text-[11px] tracking-[0.15em] text-white font-medium whitespace-nowrap">
                모든 상품 무료 배송
              </p>
              <button
                onClick={handleClose}
                className="text-white text-[11px] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div
          className={cls(
            "inner flex h-15 items-center justify-between",
            scrolled && "hidden",
          )}
        >
          <Link
            href="/"
            className="text-[20px] font-black tracking-[0.3em] uppercase text-black"
          >
            MY SHOP
          </Link>
          <HeaderIcons user={user} />
        </div>
      </header>

      <div className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="inner flex items-center justify-between">
          <nav className="flex items-center gap-7">
            {NAV_MENU.map((item) => (
              <NavItem key={item.href} href={item.href}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <div
            className={cls(
              "transition-all duration-300",
              scrolled ? "flex" : "hidden",
            )}
          >
            <HeaderIcons user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
