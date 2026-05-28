import Breadcrumb from "@/src/components/Breadcrumb";
import Sidebar from "@/src/components/Sidebar";

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-w-[1200px] w-full pt-10  justify-center mx-auto">
      <aside className="w-43 shrink-0 pr-10">
        <Sidebar />
      </aside>
      <div className="flex flex-col w-full">
        <Breadcrumb />
        <div className="flex-1 w-full">{children}</div>
      </div>
    </div>
  );
}
