import Sidebar from './components/sidebar'
import Topbar from './components/topbar'

export default function InnerDashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex w-screen flex-col">
				<Topbar />
				<main className="px-10">{children}</main>
			</div>
		</div>
	)
}
