import clsx from "clsx";

interface PillButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  className?: string;
}

export default function PillButton({
  label,
  isActive = false,
  onClick,
  icon,
  onIconClick,
  className,
}: PillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full border transition-all cursor-pointer",
        {
          "bg-black text-white border-black": isActive,
          "bg-white text-gray-500 border-gray-200": !isActive,
        },
        className,
      )}
    >
      <span>{label}</span>

      {icon && (
        <span
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onIconClick?.();
          }}
        >
          {icon}
        </span>
      )}
    </button>
  );
}
