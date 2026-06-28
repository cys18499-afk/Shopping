import { getOrderList, getOrderStatus } from "@/src/lib/data/order";
import OrderStatusSummary from "@/src/components/order/OrderStatusSummary";
import OrderStatus from "@/src/components/order/OrderStatus";
import { isWithinDays } from "@/src/lib/utils";

export default async function OrderStatusSection() {
  const [orderStatus, orderList] = await Promise.all([
    getOrderStatus(),
    getOrderList(),
  ]);

  const recentOrders = orderList.filter((order) =>
    isWithinDays(order.createdAt, 90),
  );
  const recentOrderStatuses = orderStatus.filter((status) =>
    isWithinDays(status.createdAt, 90),
  );

  return (
    <>
      <OrderStatusSummary recentOrderStatuses={recentOrderStatuses} />
      <OrderStatus recentOrders={recentOrders} />
    </>
  );
}
