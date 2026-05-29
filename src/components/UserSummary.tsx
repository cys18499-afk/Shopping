import { formatCurrency } from "../lib/utils";

export default function UserSummary({
  availableCredit = 0,
  // coupons = 0,
}: {
  availableCredit?: number;
  // coupons: number;
}) {
  return (
    <div className="bg-black text-white p-6 flex justify-start">
      <div className="text-center">
        <p className="text-xl font-bold">{formatCurrency(availableCredit)}</p>
        <p className="text-xs text-gray-400">적립금</p>
      </div>
      {/* <div className="text-center">
        <p className="text-xl font-bold">{coupons}</p>
        <p className="text-xs text-gray-400">쿠폰</p>
      </div> */}
    </div>
  );
}
