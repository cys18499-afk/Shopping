export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-7">
      <p className="text-[16px] font-bold leading-6">{subtitle}</p>
      <h2 className="text-[32px] font-normal leading-10">{title}</h2>
    </div>
  );
}
