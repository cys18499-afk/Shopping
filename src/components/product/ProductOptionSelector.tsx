import { XIcon } from "lucide-react";
import QuantityButton from "../common/buttons/QuantityButton";

export default function ProductOptionSelector({
  quantity,
  size,
  onIncrease,
  onDecrease,
  onRemoveSize,
}: {
  quantity: number;
  size: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemoveSize: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-1 bg-white border-gray-300 border ">
      <div className="flex-1">
        <span className="text-[13px] text-black">{size}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="scale-[0.85] origin-right">
          <QuantityButton
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>

        <button
          onClick={onRemoveSize}
          className="flex items-center justify-center p-1 cursor-pointer  "
          aria-label="옵션 삭제"
        >
          <XIcon size={14} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
