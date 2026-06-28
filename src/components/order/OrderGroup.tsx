"use client";

import { formatCurrency } from "@/src/lib/utils";
import OrderLineItem from "./OrderLineItem";
import { Review } from "@/src/types/review";
import { OrderItem, OrderWithItems } from "@/src/types/order";
import { useModal } from "@/src/hooks/useModal";
import Modal from "../common/modals/Modal";
import { useState } from "react";
import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi2";

export default function OrderItemCard({
  order,
  myReviews,
}: {
  order: OrderWithItems;
  myReviews: Review[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const orderItems = order.orderItems;

  return (
    <div className="border border-gray-200 bg-white min-w-[768px]">
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 text-[12px] text-black">
        <div className="flex items-center gap-0">
          <div className="w-[90px] text-center font-bold border-r border-gray-200 pr-2 whitespace-nowrap">
            {new Date(order.createdAt)
              .toLocaleDateString()
              .replace(/\./g, ".")
              .slice(0, -1)}
          </div>

          <div className="w-[140px] pl-3 border-r border-gray-200 whitespace-nowrap truncate">
            주문번호: {order.id.split("-")[0].toUpperCase()}
          </div>

          <div className="w-[200px] pl-3 border-r border-gray-200 whitespace-nowrap truncate">
            {orderItems[0]?.productName.length > 11
              ? `${orderItems[0]?.productName.slice(0, 11)}...`
              : orderItems[0]?.productName}
            {orderItems.length > 1 && ` 외 ${orderItems.length - 1}건`}
          </div>

          <div className="w-[90px] pl-3 border-r border-gray-200 whitespace-nowrap font-medium">
            {formatCurrency(order.totalPrice)}
          </div>

          <div className="w-[80px] pl-3 whitespace-nowrap">
            <span className="bg-green-50 px-1.5 py-0.5 rounded text-green-700 font-medium">
              배송완료
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 pl-3">
          <button
            className="flex items-center gap-1 text-gray-500 cursor-pointer underline underline-offset-1 hover:text-black p-0 whitespace-nowrap"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>주문상세보기</span>
            <HiChevronDown
              className={clsx(
                "text-[12px] transition-transform duration-300",
                isExpanded ? "rotate-180" : "rotate-0",
              )}
            />
          </button>
        </div>
      </div>

      {/* 상세 내역 */}
      {isExpanded && (
        <div className="p-3 flex flex-col gap-1 border-t border-gray-100">
          {orderItems.map((item, index) => (
            <OrderLineItem
              product={item}
              key={index}
              readOnly
              order
              myReviews={myReviews}
            />
          ))}
        </div>
      )}
    </div>
  );
}
