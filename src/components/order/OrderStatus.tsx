import { OrderWithItems } from "@/src/types/order";

interface OrderStatusProps {
  recentOrders: OrderWithItems[];
}

export default function OrderStatus({ recentOrders }: OrderStatusProps) {
  const hasRecentOrders = recentOrders.length > 0;

  return (
    <div>
      <div></div>
      {!hasRecentOrders && (
        <div className="mt-20 flex flex-col items-center justify-center text-gray-400 py-10">
          <div className="mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-40"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="8" cy="10" r="0.5" fill="currentColor" />
              <circle cx="12" cy="10" r="0.5" fill="currentColor" />
              <circle cx="16" cy="10" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <p className="text-sm">최근 3개월 내 주문 내역이 없습니다</p>
        </div>
      )}
    </div>
  );
}
