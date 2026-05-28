import React from "react";

interface HorizontalSliderProps {
  itemCount?: number;
  containerRef: React.RefObject<HTMLUListElement | null>; // 부모 ref로 변경
  children: React.ReactNode;
}

export default function HorizontalSlider({
  itemCount = 2.5,
  containerRef,
  children,
}: HorizontalSliderProps) {
  const getResponsiveWidth = ({
    itemCount,
    gapPx = 4,
  }: {
    itemCount: number;
    gapPx?: number;
  }) => {
    const totalGap = gapPx * (itemCount - 1);
    return `calc((100% - ${totalGap}px) / ${itemCount})`;
  };

  return (
    <ul
      ref={containerRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
    >
      {React.Children.map(children, (child) => (
        <li
          className="flex-none"
          style={{ width: getResponsiveWidth({ itemCount }) }}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}
