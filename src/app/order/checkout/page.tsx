import Breadcrumb from "@/src/components/Breadcrumb";
import OrderSteps from "../../../components/order/OrderSteps";
import OrderForm from "@/src/components/order/OrderForm";
import PaymentInfo from "@/src/components/common/PaymentInfo";
import { getAddress } from "@/src/lib/data/address";
import { getUserInfo } from "@/src/lib/data/user";

export default async function page() {
  const addresses = await getAddress();
  const user = await getUserInfo();

  return (
    <div className="max-w-[1100px] w-full mx-auto py-6">
      <Breadcrumb />
      <OrderSteps />
      <div className="flex gap-8 mt-10">
        <OrderForm addresses={addresses} user={user} />
        <PaymentInfo variant="order" />
      </div>
    </div>
  );
}
