// src/types/mileage.ts
export type MileageType = "earn" | "use";

export type MileageItem = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: MileageType;
};
