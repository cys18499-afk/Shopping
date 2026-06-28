import OrderListClient from "@/src/components/order/OrderListClient";
import { getOrderList } from "@/src/lib/data/order";
import { getMyReviews } from "@/src/lib/data/review";
import { Suspense } from "react";

export default function OrderListPage() {
  return (
    <main className="mx-auto py-10">
      <Suspense fallback={<div></div>}>
        <OrderListContent />
      </Suspense>
    </main>
  );
}

async function OrderListContent() {
  const [orderList, myReviews] = await Promise.all([
    getOrderList(),
    getMyReviews(),
  ]);

  return <OrderListClient initialOrders={orderList} myReviews={myReviews} />;
}
