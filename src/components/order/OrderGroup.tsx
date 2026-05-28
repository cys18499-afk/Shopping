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
    <div className="border border-gray-200 bg-white">
      <div className="flex justify-between items-center bg-gray-50 px-3 py-2  ">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[12px] text-black font-bold">
              {new Date(order.updatedAt)
                .toLocaleDateString()
                .replace(/\./g, ".")
                .slice(0, -1)}
            </span>
          </div>
          <div className="border-r border-gray-200 "></div>
          <div className="flex flex-col">
            <span className="text-[12px] text-black ">
              주문번호: {order.id.split("-")[0].toUpperCase()}
            </span>
          </div>{" "}
          <div className="flex flex-col w-[160px]">
            <span className="text-[12px] text-black whitespace-nowrap truncate">
              {orderItems[0]?.productName.length > 11
                ? `${orderItems[0]?.productName.slice(0, 11)}...`
                : orderItems[0]?.productName}
              {orderItems.length > 1 && ` 외 ${orderItems.length - 1}건`}
            </span>
          </div>
          <div className="border-r border-gray-200 "></div>
          <div className="text-[12px] text-black">
            {formatCurrency(order.totalPrice)}
          </div>
          <div className="border-r border-gray-200 "></div>
          <div className="flex flex-col">
            <span className="text-[12px] text-black bg-green-50">배송완료</span>
          </div>
        </div>
        <div className="text-right">
          <button
            className="flex items-center gap-1 text-[12px] text-gray-500 cursor-pointer underline underline-offset-1 hover:text-black p-0"
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
      {isExpanded && (
        <div className="p-2 flex flex-col gap-1">
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

      {/* <div className="flex flex-col gap-1 px-6 py-4 ">
        {orderItems.map((item, index) => (
          <OrderLineItem
            product={item}
            key={index}
            readOnly
            order
            myReviews={myReviews}
          />
        ))}
      </div> */}
    </div>
  );
}
