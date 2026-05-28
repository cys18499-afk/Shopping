"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { HiChevronDown } from "react-icons/hi2";

const SORT_OPTIONS = [
  { label: "판매순", value: "sales" },
  { label: "인기순", value: "popular" },
  { label: "가격 높은순", value: "priceDesc" },
  { label: "가격 낮은순", value: "priceAsc" },
];

export default function SearchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);
  const isOpenRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const handleSelect = (option: (typeof SORT_OPTIONS)[0]) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={isOpenRef}>
      <button
        className="border border-gray-200 px-3 py-2 flex items-center
        justify-between
        gap-2 cursor-pointer w-29"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-[13px]">{selected.label}</span>
        <HiChevronDown
          className={clsx(
            "text-xl transition-transform",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          size={16}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 border
        bg-white border-gray-200 shadow w-full z-10 "
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${
                selected.value === option.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
