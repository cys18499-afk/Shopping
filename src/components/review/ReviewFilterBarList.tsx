import { useState } from "react";
import { ReviewFilterContent } from "./ReviewFilterContent";
import { FILTER_CONFIG, FilterLabel, LABEL_TO_KEY } from "@/src/types/review";
import clsx from "clsx";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { HiChevronDown } from "react-icons/hi";
import { useFilter } from "@/src/hooks/useFilter";

type FilterProps = ReturnType<typeof useFilter>;

export default function ReviewFilterBarList({
  filter,
}: {
  filter: FilterProps;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterLabel | null>(null);
  const {
    tempValues,
    appliedValues,
    handleChange,
    applyFilter,
    resetFilter,
    cancelFilter,
  } = filter;

  console.log(appliedValues);

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    cancelFilter();
    setActiveFilter(null);
  }, false);

  const handleSave = () => {
    applyFilter();
    setActiveFilter(null);
  };

  const filterList = Object.values(FILTER_CONFIG);
  const hasApplied = (label: FilterLabel): boolean => {
    const key = LABEL_TO_KEY[label];
    return appliedValues[key].length > 0;
  };

  return (
    <div className="relative">
      <div className="flex gap-1">
        {filterList.map((filter) => (
          <button
            key={filter.id}
            onClick={(e) => {
              e.stopPropagation();
              if (activeFilter === filter.label) {
                cancelFilter();
                setActiveFilter(null);
              } else {
                setActiveFilter(filter.label);
              }
            }}
            className={clsx(
              "px-3 py-1 border cursor-pointer",
              activeFilter === filter.label
                ? "border-black"
                : hasApplied(filter.label)
                  ? "border-black"
                  : "border-gray-200",
            )}
          >
            <span className="flex items-center justify-center">
              <span className="text-[12px]">{filter.label}</span>
              <HiChevronDown
                className={clsx(
                  activeFilter === filter.label ? "rotate-180" : "rotate-0",
                  activeFilter === filter.label || hasApplied(filter.label)
                    ? "text-black"
                    : "text-gray-200",
                )}
              />
            </span>
          </button>
        ))}
      </div>

      {activeFilter && (
        <div
          className="absolute top-12 left-0 z-20 border-gray-500 shadow-lg w-90"
          ref={containerRef}
        >
          <ReviewFilterContent
            type={activeFilter}
            tempValues={tempValues}
            onSelect={(value) => {
              const filterKey = LABEL_TO_KEY[activeFilter];
              handleChange(filterKey, value);
            }}
          />
          <div className="flex gap-4 bg-white p-4">
            <button
              className="border border-gray-200 p-3 w-[40%] cursor-pointer"
              onClick={() => {
                const filterKey = LABEL_TO_KEY[activeFilter];
                resetFilter(filterKey);
              }}
            >
              초기화
            </button>
            <button
              className="border bg-black text-white text-sm p-3 w-full cursor-pointer"
              onClick={handleSave}
            >
              적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
