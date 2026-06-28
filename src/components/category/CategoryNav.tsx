"use client";

import clsx from "clsx";

interface CategoryNavProps {
  activeTab: string;
  categories: { id: string; label: string }[];
  onTabChange: (id: string) => void;
}

export default function CategoryNav({
  activeTab,
  categories,
  onTabChange,
}: CategoryNavProps) {
  return (
    <nav className="flex gap-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onTabChange(cat.label)}
          className={clsx(
            "text-[13px] transition-colors cursor-pointer",
            activeTab === cat.label
              ? "text-black font-bold"
              : "text-gray-400 hover:text-gray-600",
          )}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}
