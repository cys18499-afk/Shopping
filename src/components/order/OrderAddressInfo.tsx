type AddressProps = {
  addressData: {
    receiverName: string;
    receiverPhoneNumber: string;
    address: string;
    detailAddress: string;
    postcode: string;
    shippingMessage: string;
  };
};

export default function OrderAddressInfo({ addressData }: AddressProps) {
  return (
    <div className="mt-12">
      <h2 className="text-[20px] font-black border-black pl-3 mb-6 uppercase">
        배송지 정보
      </h2>
      <div className="grid grid-cols-[120px_1fr] gap-y-4 text-sm py-4 border-t border-gray-200">
        <span className="text-gray-500">받으시는 분</span>
        <span className="font-bold">{addressData.receiverName}</span>

        <span className="text-gray-500">휴대폰 번호</span>
        <span className="font-bold">{addressData.receiverPhoneNumber}</span>

        <span className="text-gray-500">배송지 주소</span>
        <span className="font-bold leading-relaxed">
          ({addressData.postcode}) {addressData.address}{" "}
          {addressData.detailAddress}
        </span>

        <span className="text-gray-500">배송 요청사항</span>
        <span className="font-bold text-blue-600">
          {addressData.shippingMessage || "요청사항 없음"}
        </span>
      </div>
    </div>
  );
}
