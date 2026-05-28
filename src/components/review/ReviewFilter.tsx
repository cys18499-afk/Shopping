import { useFilter } from "@/src/hooks/useFilter";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { SORT_OPTIONS } from "@/src/types/review";
import clsx from "clsx";
import { useState } from "react";
import { MdCheck, MdSearch } from "react-icons/md";
import ReviewFilterBarList from "./ReviewFilterBarList";

type ReviewFilterProps = {
  filter: ReturnType<typeof useFilter>;
};

export default function ReviewFilter({ filter }: ReviewFilterProps) {
  const { appliedValues, handleSortChange, handlePhotoOnly, handleKeyword } =
    filter;

  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useOutsideClick<HTMLDivElement>(() => setIsFocused(false));

  return (
    <div className="py-8 border-y border-gray-200">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* 정렬 */}
        <div className="flex gap-6 text-[12px] font-medium text-gray-400">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSortChange(option.id)}
              className={clsx(
                "text-sm transition-colors cursor-pointer",
                appliedValues.sortBy === option.id
                  ? "font-bold text-black"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm">
          {/* 포토 */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={appliedValues.photoOnly}
              onChange={() => handlePhotoOnly(!appliedValues.photoOnly)}
            />
            <div
              className={clsx(
                "w-5 h-5 border rounded flex items-center justify-center transition-all",
                appliedValues.photoOnly
                  ? "border-black bg-black"
                  : "border-gray-300 bg-white",
              )}
            >
              <MdCheck
                className={clsx(
                  "text-white w-full h-full p-0.5 transition-opacity",
                  appliedValues.photoOnly ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
            <span className="text-gray-600">포토/동영상 먼저 보기</span>
          </label>

          {/* 키워드 검색 */}
          <div
            ref={selectRef}
            className={clsx(
              "flex items-center gap-1 text-gray-400 hover:bg-gray-100 border p-1",
              isFocused ? "bg-gray-100" : "bg-white",
            )}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => !appliedValues.keyword && setIsFocused(false)}
          >
            <MdSearch size={20} />
            <input
              type="search"
              value={appliedValues.keyword}
              onChange={(e) => handleKeyword(e.target.value)}
              placeholder="리뷰 키워드 검색"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="focus:outline-none"
            />
          </div>
        </div>
      </div>

      <ReviewFilterBarList filter={filter} />
    </div>
  );
}
