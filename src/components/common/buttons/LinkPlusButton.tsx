"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

interface LinkPlusButtonProps {
  href: string;
  top?: string | number;
  left?: string | number;
  ariaLabel?: string;
}

export default function LinkPlusButton({
  href,
  top = 0,
  left = 0,
  ariaLabel = "더보기",
}: LinkPlusButtonProps) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Link
      href={href}
      className="absolute z-10 flex items-center justify-center w-8 h-8 bg-black/50 text-white rounded-full transition-all hover:bg-black"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ top, left }}
      aria-label={ariaLabel}
    >
      <span
        className={clsx(
          "absolute left-10 whitespace-nowrap border p-2 bg-white text-black text-sm shadow-md",
          hover
            ? "opacity-100 visible delay-200"
            : "opacity-0 invisible delay-0",
        )}
      >
        {ariaLabel}
      </span>

      <span
        className={clsx(
          "text-xl leading-none transition-transform duration-300",
          hover && "-rotate-180",
        )}
      >
        +
      </span>
    </Link>
  );
}
