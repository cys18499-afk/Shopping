import clsx from "clsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function SliderButton({
  direction,
  isBg = false,
  size = 40,
  onClick,
}: {
  direction: "prev" | "next";
  isBg?: boolean;
  size?: number;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="p-2 pointer-events-auto">
      {direction === "prev" ? (
        <FiChevronLeft
          className={clsx(`cursor-pointer`, isBg ? "bg-black/80 " : "")}
          color="white"
          size={size}
        />
      ) : (
        <FiChevronRight
          className={clsx(`cursor-pointer`, isBg ? "bg-black/80 " : "")}
          color="white"
          size={size}
        />
      )}
    </button>
  );
}
