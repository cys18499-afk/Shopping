"use client";

import { useState } from "react";
import OrderGroup from "@/src/components/order/OrderGroup";
import { OrderWithItems } from "@/src/types/order";
import { SearchIcon } from "lucide-react";
import DateRange from "./DateRange";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { getFormattedDate } from "@/src/lib/utils";
import { Review } from "@/src/types/review";

export default function OrderListClient({
  initialOrders,
  myReviews,
}: {
  initialOrders: OrderWithItems[];
  myReviews: Review[];
}) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    activeQuery: "",
    isDateOpen: false,
    selectedRange: "",
    selectedYear: "년",
    selectedMonth: "월",
  });

  const dateContainerRef = useOutsideClick<HTMLDivElement>(() =>
    setFilters((prev) => ({ ...prev, isDateOpen: false })),
  );

  const updateFilter = (updates: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const displayedOrders = initialOrders.filter((order) => {
    const matchesQuery = filters.activeQuery
      ? order.orderItems?.some((item: any) =>
          item.productName
            ?.toLowerCase()
            .includes(filters.activeQuery.toLowerCase()),
        )
      : true;

    let matchesDate = true;
    const orderDate = new Date(order.createdAt);
    const now = new Date();

    if (filters.selectedRange === "3m") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      matchesDate = orderDate >= threeMonthsAgo;
    } else if (filters.selectedRange === "6m") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      matchesDate = orderDate >= sixMonthsAgo;
    } else if (filters.selectedRange === "custom") {
      const year = parseInt(filters.selectedYear.replace("년", ""));
      const month = parseInt(filters.selectedMonth.replace("월", ""));
      matchesDate =
        orderDate.getFullYear() === year && orderDate.getMonth() + 1 === month;
    }

    return matchesQuery && matchesDate;
  });

  const handleSearch = () => updateFilter({ activeQuery: filters.searchQuery });

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      activeQuery: "",
      isDateOpen: false,
      selectedRange: "",
      selectedYear: "년",
      selectedMonth: "월",
    });
  };

  const getDateText = () => {
    const { selectedRange, selectedYear, selectedMonth } = filters;

    if (selectedRange === "3m")
      return `${getFormattedDate(3)} ~ ${getFormattedDate(0)}`;
    if (selectedRange === "6m")
      return `${getFormattedDate(6)} ~ ${getFormattedDate(0)}`;
    if (
      selectedRange === "custom" &&
      selectedYear !== "년" &&
      selectedMonth !== "월"
    ) {
      return `${selectedYear} ${selectedMonth}`;
    }
    return "전체 기간";
  };

  return (
    <div className="w-full px-4 gap-6">
      <div className="w-[700px] mx-auto relative flex items-center gap-3 pb-10">
        <input
          autoFocus
          type="text"
          value={filters.searchQuery}
          onChange={(e) => updateFilter({ searchQuery: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="어떤 상품을 찾으시나요?"
          className="w-full bg-transparent outline-none text-sm font-medium border-b pb-3"
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 font-bold pb-3"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="flex justify-between border-black pb-4">
        <div className="flex items-center gap-2 text-[14px]">
          {filters.activeQuery && (
            <span className="font-black italic">
              총 {displayedOrders.length}건의 내역
            </span>
          )}
          <span className="text-gray-500 font-medium">
            <span className="text-gray-500 font-medium">{getDateText()}</span>
          </span>
        </div>

        <div className="flex gap-2">
          {(filters.activeQuery ||
            filters.selectedRange ||
            filters.selectedYear !== "년") && (
            <button
              onClick={handleReset}
              className="text-[12px] px-3 py-1 cursor-pointer border border-gray-200"
            >
              초기화
            </button>
          )}

          <div className="relative" ref={dateContainerRef}>
            <button
              onClick={() => updateFilter({ isDateOpen: !filters.isDateOpen })}
              className="text-[12px] px-3 py-1 cursor-pointer border border-gray-200"
            >
              기간 조회
            </button>
            {filters.isDateOpen && (
              <DateRange
                filters={filters}
                setFilters={setFilters}
                onClose={() => updateFilter({ isDateOpen: false })}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[1px]">
        {displayedOrders.length === 0 ? (
          <div className="py-32 text-center border-b border-gray-200 text-gray-400 font-medium text-[15px]">
            조회된 주문 내역이 존재하지 않습니다.
          </div>
        ) : (
          displayedOrders.map((order) => (
            <OrderGroup key={order.id} order={order} myReviews={myReviews} />
          ))
        )}
      </div>
    </div>
  );
}
