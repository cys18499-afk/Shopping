import { Suspense } from "react";
import UserSummarySection from "./UserSummarySection";
import OrderStatusSection from "./OrderStatusSection";

export default function Mypage() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <UserSummarySection />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <OrderStatusSection />
      </Suspense>
    </div>
  );
}
