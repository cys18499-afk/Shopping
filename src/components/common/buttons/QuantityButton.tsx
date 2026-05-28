import clsx from "clsx";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function QuantityButton({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex items-center bg-white border border-gray-300">
      <button
        onClick={onDecrease}
        className={clsx(
          "w-6 h-6 flex items-center justify-center cursor-pointer",
          "text-black",
          quantity === 1 && "text-gray-400 cursor-not-allowed",
        )}
        disabled={quantity === 1}
      >
        <FaMinus size={10} />
      </button>

      <div
        className="w-9 h-9 text-[14px] flex items-center justify-center
      text-base font-medium text-brand-black"
      >
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        className={clsx(
          "w-6 h-6 flex items-center justify-center cursor-pointer",
          "text-black",
          quantity === 50 && "text-gray-400 cursor-not-allowed",
        )}
        disabled={quantity === 50}
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
}
