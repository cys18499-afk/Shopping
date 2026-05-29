"use client";

import clsx from "clsx";
import Link from "next/link";
import { CartItem } from "@/src/types/cart";
import { useCartStore } from "@/src/store/CartStore";
import { useOrderStore } from "@/src/store/OrderStore";
import { calculateDisplayPrice, formatCurrency } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store/AuthStore";

type Props =
  | { variant: "cart"; selectedItems: CartItem[]; handleCheckout: () => void }
  | { variant: "order" }
  | {
      variant: "order-success";
      summary: {
        originalPrice: number;
        totalPrice: number;
        discountPrice: number;
      };
    };

export default function PaymentInfo(props: Props) {
  const { user } = useAuthStore();
  const isValid = useOrderStore((state) => state.isValid);
  const checkoutItems = useCartStore((state) => state.checkoutItems);
  const isWidgetReady = useOrderStore((state) => state.isWidgetReady);
  const usedCredit = useOrderStore((state) => state.usedCredit);

  const isConfirmation = props.variant === "order-success";
  const isOrder = props.variant === "order";

  const targetItems =
    props.variant === "cart" ? props.selectedItems : (checkoutItems ?? []);

  const summary = isConfirmation
    ? props.summary
    : targetItems.reduce(
        (acc, item) => ({
          originalPrice: acc.originalPrice + item.unitPrice * item.quantity,
          totalPrice:
            acc.totalPrice +
            calculateDisplayPrice(item.unitPrice, item.discountRate) *
              item.quantity,
        }),
        { originalPrice: 0, totalPrice: 0 },
      );

  const productDiscount = summary.originalPrice - summary.totalPrice;
  const finalPrice =
    summary.originalPrice - productDiscount - (isOrder ? usedCredit : 0);

  const isOrderable =
    props.variant === "cart"
      ? props.selectedItems.length > 0
      : isValid && isWidgetReady;

  return (
    <div
      className={clsx(
        "flex-1 border border-gray-200 h-fit bg-white",
        !isConfirmation && "sticky top-15",
      )}
    >
      <div className="p-5">
        <h3 className="text-base pb-4 mb-4 border-b border-gray-100">
          {isConfirmation
            ? "결제 금액"
            : isOrder
              ? "최종 결제금액"
              : "결제정보"}
        </h3>

        <div className="space-y-4 text-sm min-w-[280px] w-full">
          <div className="flex justify-between">
            <span className="text-gray-500">총 상품 금액</span>
            <span>{formatCurrency(summary.originalPrice)}</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-100">
            <span className="text-gray-500">배송비</span>
            <span>무료배송</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">총 할인금액</span>
            <span className="text-red-500">
              -{formatCurrency(productDiscount + (isOrder ? usedCredit : 0))}
            </span>
          </div>

          <div className="flex flex-col gap-3 pl-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[12px]">상품 할인</span>
              <span className="text-red-500 text-[12px]">
                -{formatCurrency(productDiscount)}
              </span>
            </div>
            {props.variant !== "cart" && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-[12px]">사용 적립금</span>
                <span className="text-red-500 text-[12px]">
                  -{formatCurrency(isOrder ? usedCredit : 0)}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-end border-t-2 border-black pt-5 mt-2">
            <span className="text-[16px] font-bold">
              {isConfirmation ? "최종 결제금액" : "총 결제금액"}
            </span>
            <span className="text-[19px] font-bold">
              {formatCurrency(finalPrice)}
            </span>
          </div>
          {user && (
            <div className="flex justify-between items-center pl-2">
              <span className="text-[12px] text-gray-500">예상 적립금</span>
              <span className="text-[12px] text-blue-500">
                {formatCurrency(Math.round(summary.totalPrice * 0.03))}
              </span>
            </div>
          )}
        </div>
      </div>

      {isConfirmation ? (
        <div className="p-5 pt-0">
          <div className="flex flex-col gap-3">
            {user && (
              <Link
                href="/mypage/order/list"
                className="w-full py-4 bg-black text-white text-center font-bold transition-colors"
              >
                주문 내역 확인
              </Link>
            )}
            <Link
              href="/"
              className="w-full py-4 bg-white text-black text-center font-bold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      ) : (
        <button
          type={props.variant === "cart" ? "button" : "submit"}
          form="order-form"
          className={clsx(
            "w-full py-4 text-[14px] text-center font-bold",
            isOrderable
              ? "bg-black text-white cursor-pointer"
              : "bg-gray-200 text-gray-500 cursor-default",
          )}
          disabled={!isOrderable}
          onClick={props.variant === "cart" ? props.handleCheckout : undefined}
        >
          {props.variant === "cart" ? "주문하기" : "결제하기"}
        </button>
      )}
    </div>
  );
}
