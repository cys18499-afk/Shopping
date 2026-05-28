import { getUserInfo } from "@/src/lib/data/user";
import UserSummary from "../../components/UserSummary";
import { getOrderList, getOrderStatus } from "@/src/lib/data/order";
import OrderStatusSummary from "@/src/components/order/OrderStatusSummary";
import { isWithinDays } from "@/src/lib/utils";
import OrderStatus from "@/src/components/order/OrderStatus";

export default async function Mypage() {
  const user = await getUserInfo();
  const orderStatus = await getOrderStatus();
  const orderList = await getOrderList();

  const recentOrders = orderList.filter((order) =>
    isWithinDays(order.createdAt, 90),
  );

  const recentOrderStatuses = orderStatus.filter((status) =>
    isWithinDays(status.createdAt, 90),
  );

  return (
    <div>
      <UserSummary availableCredit={user.availableCredit} />
      <OrderStatusSummary recentOrderStatuses={recentOrderStatuses} />
      <OrderStatus recentOrders={recentOrders} />
      <div></div>
    </div>
  );
}
