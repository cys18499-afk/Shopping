import AddressAdder from "@/src/components/address/AddressAdder";
import AddressCard from "@/src/components/address/AddressCard";
import { getAddress } from "@/src/lib/data/address";

export default async function AddressPage() {
  const addresses = await getAddress();
  const isFirstAddress = addresses.length === 0;

  return (
    <div className="max-w-175 w-full">
      <div className="mb-5 border-b-2 border-black text-[14px] py-1 ">
        <span className="text-[14px] font-bold">배송지 관리</span>
      </div>

      {addresses.length > 0 ? (
        <div className="flex flex-col gap-2">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-40">
          <span className="text-[14px] text-gray-500">
            배송지 정보가 없습니다.
          </span>
        </div>
      )}

      <div className="p-20 flex justify-center">
        <AddressAdder isFirstAddress={isFirstAddress} />
      </div>
    </div>
  );
}
