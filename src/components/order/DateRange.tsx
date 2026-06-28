"use client";
import clsx from "clsx";
import OptionSelect from "../common/OptionSelect";
import { MONTHS, YEARS } from "@/src/constants/data/order";
import { useState } from "react";

interface DateRangeProps {
  filters: any;
  setFilters: (updates: any) => void;
  onClose: () => void;
}

export default function DateRange({
  filters,
  setFilters,
  onClose,
}: DateRangeProps) {
  const [tempFilters, setTempFilters] = useState({
    selectedRange: filters.selectedRange,
    selectedYear: filters.selectedYear,
    selectedMonth: filters.selectedMonth,
  });

  const [isYearExpanded, setIsYearExpanded] = useState(false);
  const [isMonthExpanded, setIsMonthExpanded] = useState(false);

  const isFixedRange =
    tempFilters.selectedRange === "3m" || tempFilters.selectedRange === "6m";

  const isApplyDisabled =
    !tempFilters.selectedRange ||
    (tempFilters.selectedRange === "custom" &&
      (tempFilters.selectedYear === "년" ||
        tempFilters.selectedMonth === "월"));

  const updateTemp = (updates: Partial<typeof tempFilters>) => {
    setTempFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleRangeClick = (range: string) => {
    const nextRange = tempFilters.selectedRange === range ? "" : range;
    if (range === "3m" || range === "6m") {
      updateTemp({
        selectedRange: nextRange,
        selectedYear: "년",
        selectedMonth: "월",
      });
    } else {
      updateTemp({ selectedRange: nextRange });
    }
  };

  const handleApply = () => {
    setFilters((prev: any) => ({
      ...prev,
      selectedRange: tempFilters.selectedRange,
      selectedYear: tempFilters.selectedYear,
      selectedMonth: tempFilters.selectedMonth,
      isDateOpen: false,
    }));
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[350px] bg-white border border-gray-200 shadow-xl p-7 z-50">
      <div className="grid grid-cols-3 gap-1 mb-4">
        {[
          { id: "3m", label: "3개월" },
          { id: "6m", label: "6개월" },
          { id: "custom", label: "기간선택" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleRangeClick(item.id)}
            className={clsx(
              "py-2 text-sm text-center border cursor-pointer",
              tempFilters.selectedRange === item.id
                ? "bg-black text-white border-black"
                : "border-gray-200 text-black",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={clsx(
          "flex items-center gap-2 mb-4",
          isFixedRange ? "opacity-30 pointer-events-none" : "opacity-100",
        )}
      >
        <OptionSelect
          options={YEARS}
          value={tempFilters.selectedYear}
          isExpanded={isYearExpanded}
          setIsExpanded={setIsYearExpanded}
          onChange={(val) =>
            updateTemp({ selectedYear: val, selectedRange: "custom" })
          }
        />
        <OptionSelect
          options={MONTHS}
          value={tempFilters.selectedMonth}
          isExpanded={isMonthExpanded}
          setIsExpanded={setIsMonthExpanded}
          onChange={(val) =>
            updateTemp({ selectedMonth: val, selectedRange: "custom" })
          }
        />
      </div>

      <div className="flex gap-2 pt-3 ">
        <button
          onClick={onClose}
          className="flex-1 py-2 text-sm text-center border border-gray-200 text-gray-600 cursor-pointer"
        >
          취소
        </button>
        <button
          onClick={handleApply}
          disabled={isApplyDisabled}
          className="flex-1 py-2 text-sm text-center bg-black text-white border border-gray-200 disabled:bg-gray-200 cursor-pointer"
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
