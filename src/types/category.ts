export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  level: number;
  parentId?: string | null;
  path: string;
};

export const Categories = [
  { id: "all", label: "ALL" },
  { id: "top", label: "TOP" },
  { id: "bottom", label: "BOTTOM" },
  { id: "cap", label: "CAP" },
  { id: "shose", label: "SHOES" },
  { id: "bag/acc", label: "BAG&ACC" },
];
