import OrderListClient from "@/src/components/order/OrderListClient";
import { getOrderList } from "@/src/lib/data/order";
import { getMyReviews } from "@/src/lib/data/review";

export default async function OrderListPage() {
  const orderList = await getOrderList();
  const myReviews = await getMyReviews();

  return (
    <main className="mx-auto py-10">
      <OrderListClient initialOrders={orderList} myReviews={myReviews} />
    </main>
  );
}
