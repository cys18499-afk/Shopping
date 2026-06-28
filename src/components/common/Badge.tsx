import { getBadgeStyle } from "@/src/constants/badges";

export default function Badge({ label }: { label: string }) {
  const badgeClass = getBadgeStyle(label);

  return (
    <span
      className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm ${badgeClass}`}
    >
      {label}
    </span>
  );
}
