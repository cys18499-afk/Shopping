import Link from "next/link";

export default function IconLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative  text-black rounded-full flex items-center gap-1 justify-center"
    >
      {children}
    </Link>
  );
}
