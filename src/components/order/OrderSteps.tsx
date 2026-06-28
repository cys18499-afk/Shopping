"use client";

import { stepVariants } from "@/src/constants/variants";
import { usePathname } from "next/navigation";

export default function OrderSteps() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean)[0];

  const getStatus = (step: "cart" | "checkout" | "confirm") => {
    switch (step) {
      case "cart":
        if (segments === "cart") return "current";
        if (segments === "order/checkout" || segments === "order/success")
          return "completed";
        return "inactive";

      case "checkout":
        if (segments === "order/checkout") return "current";
        if (segments === "order/confirmation") return "completed";
        return "inactive";

      case "confirm":
        return segments === "order/success" ? "current" : "inactive";

      default:
        return "inactive";
    }
  };

  return (
    <div className="mx-auto mb-10 w-full max-w-[570px] px-4">
      <div className="relative flex items-center w-full">
        <div
          className={stepVariants({ type: "dot", status: getStatus("cart") })}
        />
        <div
          className={stepVariants({
            type: "line",
            status: segments !== "cart" ? "completed" : "inactive",
          })}
        />
        <div
          className={stepVariants({
            type: "dot",
            status: getStatus("checkout"),
          })}
        />
        <div
          className={stepVariants({
            type: "line",
            status: segments === "order/success" ? "completed" : "inactive",
          })}
        />
        <div
          className={stepVariants({
            type: "dot",
            status: getStatus("confirm"),
          })}
        />
      </div>

      <div className="mt-3 flex justify-between">
        {["장바구니", "주문결제", "주문완료"].map((step) => (
          <span
            key={step}
            className={`text-sm font-medium ${
              step === segments ? "text-black font-bold" : "text-gray-400"
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
