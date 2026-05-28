"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cls } from "@/src/lib/utils";

export const NAV_MENU = [
  { label: "TOP", href: "/top" },
  { label: "BOTTOM", href: "/bottom" },
  { label: "CAP", href: "/cap" },
  { label: "SHOES", href: "/shoes" },
  { label: "BAG&ACC", href: "/bag&acc" },
];

export const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cls(
        "relative text-[13px] font-bold tracking-[0.05em] uppercase py-4 transition-colors duration-150 group ",
        isActive ? "text-black" : "text-neutral-500 hover:text-black",
      )}
    >
      {children}
      <span
        className={cls(
          "absolute bottom-3 left-0 h-px bg-black transition-all duration-200",
          isActive ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </Link>
  );
};

export default function NavMenu() {
  return (
    <nav className="flex items-center gap-10">
      {NAV_MENU.map((item) => (
        <NavItem key={item.href} href={item.href}>
          {item.label}
        </NavItem>
      ))}
    </nav>
  );
}
