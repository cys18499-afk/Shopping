"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { approveTossPayment, getOrderInfo } from "@/src/lib/actions/order";
import { useCartStore } from "@/src/store/CartStore";
import { formatCurrency } from "@/src/lib/utils";

export default function OrderSuccessPage() {
  const { clearAll } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [paymentData, setPaymentData] = useState<any>(null);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const hasApproved = useRef(false);

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    if (!paymentKey || !orderId || !amount || hasApproved.current) {
      if (!paymentKey) setStatus("error");
      return;
    }
    hasApproved.current = true;

    approveTossPayment(paymentKey, orderId, Number(amount))
      .then(async (result) => {
        setPaymentData(result);
        clearAll();

        const order = await getOrderInfo(orderId);
        setOrderInfo(order);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center ">
        <p className="text-gray-500 tracking-widest text-sm">결제 처리 중...</p>
      </div>
    );

  if (status === "error")
    return (
      <div className="flex items-center justify-center ">
        <p className="text-red-600 tracking-widest text-sm">
          결제에 실패했습니다. 다시 시도해 주세요.
        </p>
      </div>
    );

  return (
    <div className="max-w-[520px] mx-auto px-4 py-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-black tracking-[4px] mb-1">결제 완료</h1>
        <p className="text-sm text-gray-500 tracking-wide">
          주문이 성공적으로 접수되었습니다
        </p>
      </div>

      <div className="border border-gray-200  overflow-hidden">
        <div className="bg-[#1a1a1a] px-5 py-3 flex items-center gap-2">
          <span className="text-[11px] font-medium tracking-[3px] text-white uppercase">
            주문 정보
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="flex justify-between items-center px-5 py-4">
            <span className="text-xs text-gray-500 tracking-wide">
              결제 금액
            </span>
            <span className="text-xl font-black text-black tracking-wider">
              ₩
              {Number(
                paymentData?.totalAmount ?? searchParams.get("amount"),
              ).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center px-5 py-4">
            <span className="text-xs text-gray-500 tracking-wide whitespace-nowrap">
              주문번호
            </span>
            <span className="text-sm font-mono font-medium">
              {paymentData?.orderId}
            </span>
          </div>
          <div className="flex justify-between items-center px-5 py-4">
            <span className="text-xs text-gray-500 tracking-wide">결제 키</span>
            <span className="text-[11px] font-mono text-gray-400">
              {paymentData?.paymentKey?.slice(0, 16)}...
            </span>
          </div>
          {orderInfo && (
            <>
              {orderInfo.usedCredit > 0 && (
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-xs text-gray-500 tracking-wide">
                    사용 적립금
                  </span>
                  <span className="text-sm text-red-500 font-medium">
                    -{formatCurrency(orderInfo.usedCredit)}
                  </span>
                </div>
              )}
              {orderInfo.availableCredit > 0 && (
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-xs text-gray-500 tracking-wide">
                    획득 적립금
                  </span>
                  <span className="text-sm text-blue-500 font-medium">
                    +{formatCurrency(orderInfo.availableCredit)}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-6">
        <button
          onClick={() => router.push("/mypage/order/list")}
          className="bg-black hover:bg-[#2b2b2b] text-white text-sm font-medium tracking-wider py-3.5 transition-colors cursor-pointer"
        >
          주문 확인
        </button>
        <button
          onClick={() => router.push("/")}
          className="border border-gray-300 text-sm font-medium tracking-wider py-3.5  cursor-pointer"
        >
          쇼핑 계속
        </button>
      </div>
    </div>
  );
}
