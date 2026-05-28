export default function ChangeOptionModal({ product }: { product: any }) {
  return (
    <div className="flex bg-white">
      <div className="w-[370px] border h-full">
        {/* {DUMMY_PRODUCT.images.map((img) => (
              <Image
                key={img}
                src={img}
                alt="z"
                fill
                className="object-cover"
              />
            ))} */}
        아아
      </div>
      <div className="w-[475px] border h-full">
        <h1>{product.name}</h1>
        <p>컬러</p>
        <div>흠 상품이미지? 썸네일 작은것들</div>
        {/* <div>
          <ProductOptionSelectProps
            options={sizeOptions || []}
            value="사이즈를 선택 하세요"
            onChange={(size) => handleSelectSize(product.id, size)}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {pendingItems.map((item) => (
            <ProductOptionSelector
              key={item.id}
              size={item.size}
              quantity={item.quantity}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onRemoveSize={() => handleRemoveSize(item.id)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
