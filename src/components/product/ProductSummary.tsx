"use client";

import { startTransition, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { usePendingItems } from "@/src/hooks/usePendingItems";
import { Product } from "@/src/types/product";

import ProductOptionSelector from "./ProductOptionSelector";
import OptionSelect from "../common/OptionSelect";
import Modal from "../common/modals/Modal";
import Badge from "../common/Badge";
import { useModal } from "@/src/hooks/useModal";
import AddToCartModal from "../cart/AddToCartModal";
import { useWishStore } from "@/src/store/wishStore";
import { Heart } from "lucide-react";
import { useCartStore } from "@/src/store/CartStore";
import { CartItem } from "@/src/types/cart";
import { useAuthStore } from "@/src/store/AuthStore";

export default function ProductSummary({ product }: { product: Product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    pendingItems,
    handleSelectSize,
    handleIncrease,
    handleDecrease,
    handleRemove,
  } = usePendingItems();

  const { user } = useAuthStore();
  const wishedIds = useWishStore((s) => s.wishedIds);
  const isWished = wishedIds.has(product.id);
  const toggle = useWishStore((s) => s.toggle);
  const addToCart = useCartStore((c) => c.addItem);

  const finalPrice = Math.floor(
    product.unitPrice * (1 - (product.discountRate ?? 0) / 100),
  );

  const totalPrice = pendingItems.reduce(
    (sum, item) => sum + item.quantity * finalPrice,
    0,
  );

  const handleWishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      return alert("로그인이 필요한 서비스입니다.");
    }
    startTransition(async () => {
      await toggle(product.id);
    });
  };

  const handleAddToCart = async () => {
    if (pendingItems.length === 0) {
      setIsExpanded(true);
      return;
    }

    const cartItems: CartItem[] = pendingItems.map((item) => ({
      id: product.id,
      productId: product.id,
      productName: product.productName,
      unitPrice: finalPrice,
      thumbnail: product.images[0],
      size: item.size,
      quantity: item.quantity,
      slug: product.slug,
    }));
    openModal();
    await addToCart(cartItems);
  };

  return (
    <div className="sticky top-16 h-full bg-white wrap-break-word w-100  ml-5  text-sm flex-1">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex gap-1">
            <Badge label="베스트" />
            {/* <Badge label="할인" /> */}
          </div>
          <div className="flex justify-between">
            <h1 className="text-[16px] font-medium mt-1 leading-tight">
              {/* <span className="text-red-500 font-bold">[카리나 PICK]</span>{" "} */}
              {product.productName}
            </h1>
            <div className="flex items-start gap-3 text-gray-500 mt-1 ">
              <FiShare2 size={20} className="cursor-pointer" />
              <button onClick={handleWishClick} className="cursor-pointer">
                <Heart
                  className="stroke-[1.5] transition-transform duration-100 active:scale-125"
                  size={20}
                  fill={isWished ? "red" : "white"}
                  stroke={isWished ? "red" : "gray"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[18px] font-bold mb-6">
        {finalPrice.toLocaleString()}원
      </div>

      <hr className="border-gray-100 mb-4" />

      <div className="flex flex-col gap-3 text-[12px] mb-6">
        <div className="flex">
          <span className="w-20 text-gray-500">배송비</span>
          <span className="text-gray-800">전 상품 무료배송/무료반품</span>
        </div>
        <div className="flex">
          <span className="w-20 text-gray-500">추가혜택</span>
          <div className="text-gray-500 leading-relaxed">
            <p>리뷰 작성 시 최대 1천 마일리지 적립</p>
            <p>N pay 결제 시 3% 리워드</p>
            <p>현대카드 M포인트 10% 사용 가능</p>
          </div>
        </div>
      </div>

      {/* <div className="mb-6">
        <span className="text-[12px] text-gray-500 block mb-2">상품컬러</span>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-14 h-18 bg-gray-100 border border-gray-200 aspect-[3/4]"
            />
          ))}
        </div>
      </div> */}

      <OptionSelect
        options={product.sizes ?? []}
        value="사이즈를 선택 하세요"
        onChange={(size) => handleSelectSize(product.id, size)}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      <div className="mt-4 flex flex-col gap-1">
        {pendingItems.map((item) => (
          <ProductOptionSelector
            key={item.uniqueKey}
            size={item.size}
            quantity={item.quantity}
            onIncrease={() => handleIncrease(item.uniqueKey)}
            onDecrease={() => handleDecrease(item.uniqueKey)}
            onRemoveSize={() => handleRemove(item.uniqueKey)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center font-bold py-3 border-t border-gray-100">
        <span className="text-[14px]">총 결제금액</span>
        <span className="text-[14px]">{totalPrice.toLocaleString()}원</span>
      </div>

      <div className="flex h-12">
        <button
          className="flex-1 bg-black text-white border-r cursor-pointer hover:bg-[#2b2b2b] transition-colors"
          onClick={handleAddToCart}
        >
          장바구니
        </button>

        <button className="flex-1 bg-black text-white cursor-pointer hover:bg-[#2b2b2b] transition-colors">
          바로 구매
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <AddToCartModal onClose={closeModal} />
      </Modal>
    </div>
  );
}
