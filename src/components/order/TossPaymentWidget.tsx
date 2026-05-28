"use client";

import { useEffect, useRef } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

interface Props {
  totalPrice: number;
  customerKey: string;
  onReady: (widgets: any) => void;
  setIsWidgetReady: (ready: boolean) => void;
}
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export default function TossPaymentWidget({
  totalPrice,
  customerKey,
  onReady,
  setIsWidgetReady,
}: Props) {
  const onReadyRef = useRef(onReady);
  const widgetsRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!widgetsRef.current) return;
    if (totalPrice <= 0) return;

    widgetsRef.current.setAmount({ currency: "KRW", value: totalPrice });
  }, [totalPrice]);

  useEffect(() => {
    if (totalPrice <= 0) return;
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    async function renderPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: customerKey });
      await widgets.setAmount({ currency: "KRW", value: totalPrice });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      widgetsRef.current = widgets;
      onReadyRef.current(widgets);
      setIsWidgetReady(true);
    }
    renderPaymentWidgets();
  }, [totalPrice, customerKey, setIsWidgetReady]);

  return (
    <div>
      <div id="payment-method" className="w-full" />
      <div id="agreement" className="w-full" />
    </div>
  );
}
