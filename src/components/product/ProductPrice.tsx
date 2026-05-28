import { formatCurrency } from "@/src/lib/utils";

export default function ProductPrice({
  unitPrice,
  hasDiscount,
  discountRate = 0,
  finalPrice,
}: {
  unitPrice: number;
  hasDiscount: boolean;
  discountRate?: number;
  finalPrice: number;
}) {
  return (
    <div className="my-3">
      {hasDiscount && (
        <span className="text-[16px] text-gray-400 line-through">
          {formatCurrency(unitPrice)}
        </span>
      )}
      <div>
        {hasDiscount && (
          <span className="text-[18px] text-red-500 font-semibold mr-3">
            {discountRate}%
          </span>
        )}

        <span className="text-[18px] font-bold text-brand-black">
          {formatCurrency(finalPrice)}
        </span>
      </div>
    </div>
  );
}
