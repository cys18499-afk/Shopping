export type Product = {
  id: string;
  productName: string;
  unitPrice: number;
  description: string;
  categoryId: string;
  thumbnail: string[];
  images: string[];
  colors?: string[];
  sizes?: string[];
  slug: string;
  stock: number;
  discountRate?: number;
  isNew?: boolean;
};
