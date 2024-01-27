import Topbar from './components/topbar';
import Sidebar from './components/sidebar';

export default function InnerDashboardLayout({
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
