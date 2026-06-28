export type Address = {
  id: string;
  userId?: string;
  addressName?: string;
  receiverName: string;
  receiverPhoneNumber: string;
  postcode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
  createdAt: string;
};

export type AddressInput = Omit<Address, "id" | "userId" | "createdAt">;

export interface UpdateAddressRequest extends AddressInput {
  id: string;
}

export interface DeleteAddressRequest {
  id: string;
}
