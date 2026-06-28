"use client";

import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useModal } from "@/src/hooks/useModal";
import { useCartStore } from "@/src/store/CartStore";

import { Address } from "@/src/types/address";
import { shippingMessageOptions } from "@/src/constants/data/order";

import Form from "../common/ui/Form";
import Input from "../common/ui/Input";
import OptionSelect from "../common/OptionSelect";
import OrderLineItem from "./OrderLineItem";
import Modal from "../common/modals/Modal";
import FormRowVertical from "../common/ui/FormRowVertical";
import AddressManagement from "../address/AddressManagement";
import AddressCard from "../address/AddressCard";
import TossPaymentWidget from "./TossPaymentWidget";

import { UserInfo } from "@/src/types/user";
import { OrderFormFields, PaymentMethod } from "@/src/types/order";
import { createOrder } from "@/src/lib/actions/order";
import { useOrderStore } from "@/src/store/OrderStore";
import { calculateDisplayPrice, formatCurrency } from "@/src/lib/utils";
import { ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import AddressForm from "../address/AddressForm";
import AddressFields from "../address/AddressFields";

export default function OrderForm({
  addresses,
  user,
}: {
  addresses: Address[];
  user: UserInfo | null;
}) {
  const [widgets, setWidgets] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shippingMessage, setShippingMessage] = useState("직접 입력");
  const [manualSelected, setManualSelected] = useState<Address | null>(null);

  const [availableCredit, setAvailableCredit] = useState<number>(
    user?.availableCredit ?? 0,
  );
  const [inputCredit, setInputCredit] = useState<string>("0");

  const checkoutItems = useCartStore((state) => state.checkoutItems);
  const setIsValid = useOrderStore((state) => state.setIsValid);
  const setIsWidgetReady = useOrderStore((state) => state.setIsWidgetReady);
  const setUsedCredit = useOrderStore((state) => state.setUsedCredit);
  const usedCredit = useOrderStore((state) => state.usedCredit);

  const { isOpen, openModal, closeModal } = useModal();

  const selectedAddress = manualSelected ?? addresses?.[0] ?? null;
  const isFirstAddress = addresses.length === 0;

  const summary = checkoutItems.reduce(
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
  const totalPrice = summary.totalPrice - usedCredit;
  const customerKey = user?.id ?? ANONYMOUS;

  const methods = useForm<OrderFormFields>({
    mode: "onChange",
    defaultValues: {
      customerName: user?.userName ?? "",
      customerNumber: user?.phoneNumber ?? "",
      shippingMessage: "",
      availableCredit: 0,
      usedCredit: 0,
      addressName: "",
      postcode: "",
      address: "",
      detailAddress: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);

  useEffect(() => {
    return () => {
      setIsWidgetReady(false);
      setIsValid(false);
      setUsedCredit(0);
    };
  }, [setIsWidgetReady, setIsValid, setUsedCredit]);

  useEffect(() => {
    if (!user) {
      const anonymousAddressJson = sessionStorage.getItem("anonymous-address");
      if (anonymousAddressJson) {
        try {
          const addressData = JSON.parse(anonymousAddressJson) as Address;
          setManualSelected(addressData);
          setValue("addressName", addressData.addressName);
          setValue("postcode", addressData.postcode);
          setValue("address", addressData.address);
          setValue("detailAddress", addressData.detailAddress);
        } catch (error) {
          console.error("세션 스토리지 주소 파싱 중 오류 발생:", error);
        }
      }
    }
  }, [user]);

  const handleConfirmAddress = (selectedId: string) => {
    const found = addresses.find((a) => a.id === selectedId);
    if (found) {
      setManualSelected(found);
      setValue("address", found.address);
      setValue("postcode", found.postcode);
      setValue("detailAddress", found.detailAddress);
    }
    closeModal();
  };

  const handleShippingMessageChange = (val: string) => {
    setShippingMessage(val);
    if (val === "직접 입력") {
      setValue("shippingMessage", "", { shouldValidate: true });
    } else {
      setValue("shippingMessage", val, { shouldValidate: true });
    }
  };

  const handleCreditButton = (e: React.MouseEvent, c: string) => {
    e.preventDefault();
    const totalUserCredit = user?.availableCredit ?? 0;
    const num = Number(c);
    const usable = Math.min(num, totalUserCredit);

    setInputCredit(String(usable));
    setAvailableCredit(totalUserCredit - usable);
    setUsedCredit(usable);
  };

  const handleAllCreditButton = (e: React.MouseEvent) => {
    e.preventDefault();
    const totalUserCredit = user?.availableCredit ?? 0;

    setInputCredit(String(totalUserCredit));
    setAvailableCredit(0);
    setUsedCredit(totalUserCredit);
  };

  const handleWidgetReady = useCallback((w: any) => {
    setWidgets(w);
  }, []);

  const handlePayment = async (orderData: OrderFormFields) => {
    if (!widgets) {
      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    const finalAddress = orderData.address || selectedAddress?.address;
    if (!finalAddress) {
      alert("배송지 주소를 확인해 주세요.");
      return;
    }

    try {
      const orderPayload = {
        ...orderData,
        orderItems: checkoutItems.map((item) => ({
          ...item,
          orderId: "",
          subtotal:
            calculateDisplayPrice(item.unitPrice, item.discountRate) *
            item.quantity,
        })),
        usedCredit: usedCredit,
        discountPrice: productDiscount,
        originalPrice: summary.originalPrice,
        totalPrice: totalPrice,

        receiverName:
          orderData.receiverName || selectedAddress.receiverName || "",
        receiverPhoneNumber:
          orderData.receiverPhoneNumber ||
          selectedAddress.receiverPhoneNumber ||
          "",

        customerName: orderData.customerName,
        customerNumber: orderData.customerNumber,

        address: orderData.address || selectedAddress.address,
        postcode: orderData.postcode || selectedAddress.postcode,
        detailAddress: orderData.detailAddress || selectedAddress.detailAddress,
        paymentMethod: "tosspay" as PaymentMethod,
      };

      const orderId = await createOrder(orderPayload);

      await widgets.requestPayment({
        orderId,
        orderName:
          checkoutItems.length === 1
            ? checkoutItems[0].productName
            : `${checkoutItems[0].productName} 외 ${checkoutItems.length - 1}건`,
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (err: any) {
      console.error(err);
      if (err.code === "PAY_PROCESS_CANCELED")
        return alert("결제가 사용자에 의해 취소되었습니다.");
      if (err.code === "REQUIRED_TERMS")
        return alert("필수 약관에 동의해 주세요.");
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        id="order-form"
        // onSubmit={handleSubmit(handlePayment)}
        onSubmit={handleSubmit(handlePayment, (errors) => {
          console.log("입력 에러 원인:", errors);
          alert("주문자 정보 또는 배송지 정보를 다시 확인해 주세요.");
        })}
        className="flex flex-col gap-8 w-full"
      >
        <div className="flex-2 w-full flex flex-col gap-10">
          <div className="w-full">
            <h4 className="font-bold text-black">주문자 정보</h4>
            <div className="w-full border-t-[1.5px] border-black my-2" />

            <div className="w-[75%] py-4 px-6 flex flex-col gap-2">
              <FormRowVertical
                label="주문자명"
                required
                error={errors.customerName?.message}
              >
                <Input
                  placeholder="주문하시는 분의 이름을 입력해 주세요"
                  {...register("customerName", {
                    required: "주문하시는 분의 이름을 입력해 주세요",
                  })}
                  error={!!errors.customerName}
                  required
                />
              </FormRowVertical>

              <FormRowVertical
                label="연락처"
                required
                error={errors.customerNumber?.message}
              >
                <Input
                  type="tel"
                  placeholder="연락처를 입력해 주세요"
                  {...register("customerNumber", {
                    required: "연락처를 입력해주세요",
                    pattern: {
                      value: /^01[0-9]-?\d{3,4}-?\d{4}$/,
                      message: "연락처가 정확한지 확인해 주세요.",
                    },
                  })}
                  error={!!errors.customerNumber}
                  required
                />
              </FormRowVertical>
            </div>
          </div>

          <div className="w-full">
            <h4 className="font-bold text-black">배송지 정보</h4>
            <div className="w-full border-t-[1.5px] border-black my-2" />

            <div className="w-[75%] py-4 px-6">
              {selectedAddress && (
                <AddressCard
                  address={selectedAddress}
                  actions={
                    <button
                      type="button"
                      className="text-[12px] text-gray-500 p-1 cursor-pointer"
                      onClick={openModal}
                    >
                      변경
                    </button>
                  }
                />
              )}

              {addresses.length === 0 && (
                <AddressFields isFirstAddress={isFirstAddress} />
              )}

              <div className="py-4">
                <p className="text-[14px]">요청사항</p>
                <div className="flex flex-col gap-2">
                  <OptionSelect
                    options={shippingMessageOptions}
                    value={shippingMessage}
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    onChange={handleShippingMessageChange}
                  />
                  {shippingMessage === "직접 입력" && (
                    <FormRowVertical error={errors.shippingMessage?.message}>
                      <Input
                        placeholder="요청사항을 직접 입력해 주세요"
                        {...register("shippingMessage", {
                          required: "요청사항을 직접 입력해 주세요",
                        })}
                        autoFocus
                        error={!!errors.shippingMessage}
                      />
                    </FormRowVertical>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h4 className="font-bold text-black">주문상품 정보</h4>
            <div className="w-full border-t-[1.5px] border-black my-2" />

            <div className="w-[75%] py-4 px-6">
              <div className="flex flex-col gap-4">
                {checkoutItems.map((item) => (
                  <OrderLineItem readOnly key={item.id} product={item} />
                ))}
              </div>
            </div>

            <div className="w-[75%] flex flex-col gap-4 py-6 border-gray-200 border-t border-b my-6 px-6">
              <span className="text-[12px] text-gray-500">
                사은품은 주문 상품과 별도로 배송될 수 있습니다.
              </span>
              <span className="text-[12px] text-gray-500">
                결제완료 이후 품절이 발생한 경우, 영업일 4일 이내 고객님께
                별도로 안내를 드립니다.
              </span>
              <span className="text-[12px] text-gray-500">
                품절 안내 이후 결제하신 금액은 자동취소 처리해 드리며, 재결제가
                필요한 경우 추가로 안내 드립니다.
              </span>
            </div>
          </div>

          {user && (
            <div className="w-full">
              <h4 className="font-bold text-black">적립금</h4>
              <div className="w-full border-t-[1.5px] border-black my-2" />

              <div className="w-[75%] py-4 px-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px]">적립금</span>
                  <div>
                    <span className="text-[12px] text-gray-700">잔액</span>
                    <span className="text-[12px] text-gray-700 font-bold tracking-wider">
                      {formatCurrency(availableCredit)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-5">
                    <Input
                      type="text"
                      onlyNumber
                      value={inputCredit}
                      onChange={(e) => setInputCredit(e.target.value)}
                      inputClassName="font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    className="border px-3 flex-3 cursor-pointer border-gray-200 text-sm"
                    onClick={(e) => handleCreditButton(e, inputCredit)}
                  >
                    사용
                  </button>
                  <button
                    type="button"
                    className="border px-3 flex-3 cursor-pointer bg-black text-white text-sm"
                    onClick={handleAllCreditButton}
                  >
                    전체사용
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="w-full py-6">
            <div className="w-full border-t-[1.5px] border-black mb-6" />

            <TossPaymentWidget
              customerKey={customerKey}
              totalPrice={totalPrice}
              onReady={handleWidgetReady}
              setIsWidgetReady={setIsWidgetReady}
            />
          </div>
        </div>
      </Form>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <AddressManagement
          addresses={addresses}
          defaultAddressId={selectedAddress?.id ?? ""}
          onConfirm={handleConfirmAddress}
          closeModal={closeModal}
        />
      </Modal>
    </FormProvider>
  );
}
