import {
  FilterLabel,
  STAR_LABELS,
  HEIGHT_OPTIONS,
  WEIGHT_OPTIONS,
  SIZE_OPTIONS,
  FilterState,
} from "@/src/types/review";
import { Star } from "lucide-react";
import clsx from "clsx";

export function ReviewFilterContent({
  type,
  onSelect,
  tempValues,
}: {
  type: FilterLabel;
  onSelect: (value: string | number) => void;
  tempValues: FilterState;
}) {
  return (
    <div className="relative p-4 bg-white w-full">
      <div className="mb-3 text-sm font-bold text-gray-700">{type}</div>
      <div className="flex flex-col gap-1 w-full">
        {type === "별점" &&
          [5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => onSelect(star)}
              className="py-2 px-1 text-left transition-colors w-full group"
            >
              <div className="flex items-center justify-between gap-2 cursor-pointer">
                <div className="flex items-center gap-1 ">
                  {Array.from({ length: star }).map((_, i) => (
                    <Star key={i} size={14} className="fill-black text-black" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "text-[14px]",
                      tempValues.rating.includes(star)
                        ? "text-black "
                        : "text-gray-600",
                    )}
                  >
                    {STAR_LABELS[star]}
                  </span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={tempValues.rating.includes(star)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>
              </div>
            </button>
          ))}

        {type === "사이즈" && (
          <ul className="grid grid-cols-7 gap-1 text-[11px]">
            {SIZE_OPTIONS.map((size) => (
              <li
                key={size.value}
                onClick={() => onSelect(size.value)}
                className={clsx(
                  "flex h-10 items-center justify-center border border-gray-200 cursor-pointer ",
                  tempValues.size.includes(size.value)
                    ? "border-black bg-black text-white"
                    : "hover:border-black hover:bg-gray-50",
                )}
              >
                <span>{size.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
