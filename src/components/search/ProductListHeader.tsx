import SortSelect from "@/src/components/search/SortSelect";
import { Grid3X3, LayoutGrid } from "lucide-react";
import { clsx } from "clsx";

interface Props {
  length: number;
  currentCols?: number;
  onColChange: (cols: number) => void;
}

export default function ProductListHeader({
  length,
  currentCols = 5,
  onColChange,
}: Props) {
  return (
    <div className="flex justify-between mb-6">
      <span className="text-[20px] font-medium">
        상품
        {length > 0 && <span className="ml-1 text-gray-500">({length})</span>}
      </span>

      <div className="flex items-center gap-2">
        {/* <SortSelect /> */}

        <div className="flex items-center gap-1 pl-2 ml-2">
          <button
            onClick={() => onColChange(4)}
            className={clsx(
              "p-1 rounded transition-colors",
              currentCols === 5
                ? "bg-gray-100 text-black"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            <LayoutGrid size={20} />
          </button>

          <button
            onClick={() => onColChange(7)}
            className={clsx(
              "p-1 rounded transition-colors",
              currentCols === 6
                ? "bg-gray-100 text-black"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            <Grid3X3 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
