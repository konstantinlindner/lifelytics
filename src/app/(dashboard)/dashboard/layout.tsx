import { Metadata } from 'next'

import Sidebar from './components/sidebar'
import Topbar from './components/topbar'

export const metadata: Metadata = {
	title: { default: 'Dashboard', template: '%s | Lifelytics' },
}

export default function DashboardLayout({
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
