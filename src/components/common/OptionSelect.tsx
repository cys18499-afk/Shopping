"use client";

import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { FiCheck } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

interface OptionSelectProps {
  options: string[] | number[];
  value?: string;
  isExpanded: boolean;
  onChange: (value: string) => void;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function OptionSelect({
  options,
  value,
  onChange,
  isExpanded,
  setIsExpanded,
}: OptionSelectProps) {
  const selectRef = useOutsideClick<HTMLDivElement>(() => setIsExpanded(false));

  const handleSelect = (val: any) => {
    onChange(val);
    setIsExpanded(false);
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className={clsx(
          "text-[13px] border p-2  bg-white cursor-pointer flex justify-between items-center transition-all",
          isExpanded ? "border-black" : "border-gray-300",
        )}
      >
        <span className={isExpanded ? "text-black" : "text-gray-500"}>
          {value}
        </span>
        <HiChevronDown
          className={clsx(
            "text-xl transition-transform duration-300 ",
            isExpanded ? "rotate-180 text-black" : "rotate-0 text-gray-500",
          )}
        />
      </div>

      {isExpanded && (
        <ul className="absolute w-full mt-1 border  border-gray-200 bg-white shadow-lg z-40 overflow-hidden">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="p-2 cursor-pointer text-[12px] flex items-center justify-between hover:bg-gray-50 transition-colors text-gray-700"
              >
                <span className={clsx(isSelected && "font-bold text-black")}>
                  {option}
                </span>
                <FiCheck
                  className={clsx(
                    "text-[14px]",
                    isSelected ? "text-black" : "text-gray-100",
                  )}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
