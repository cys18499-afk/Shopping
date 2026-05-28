"use client";

import PillButton from "../common/buttons/PillButton";

export interface FeaturedCategory {
  id: string;
  label: string;
}

interface FeaturedFilterTabsProps {
  categories?: FeaturedCategory[];
  activeTab: string;
  onTabChange: (id: string) => void;
}
export default function FeaturedFilterTabs({
  categories,
  activeTab,
  onTabChange,
}: FeaturedFilterTabsProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex gap-1 ovflow-x-auto scrollbar-hide">
        {categories?.map((category) => (
          <PillButton
            key={category.id}
            label={category.label}
            isActive={activeTab === category.id}
            onClick={() => onTabChange(category.id)}
          />
        ))}
      </div>
    </div>
  );
}
