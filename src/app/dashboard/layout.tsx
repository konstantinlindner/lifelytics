import Topbar from "@/app/dashboard/components/topbar";
import Sidebar from "@/app/dashboard/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-screen">
        <Topbar />
        <main className="px-10">{children}</main>
      </div>
    </div>
  );
}
