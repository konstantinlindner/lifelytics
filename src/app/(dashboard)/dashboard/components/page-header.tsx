'use client'

import { usePathname } from 'next/navigation'

import { settingsTopbarItems } from '../(settings)/components/settings-topbar'
import { adminSidebarItems, sidebarItems } from './sidebar'

const allSidebarItems = [
	...sidebarItems,
	...adminSidebarItems,
	...settingsTopbarItems,
]

export default function PageHeader() {
	const pathname = usePathname()
	const currentPage = allSidebarItems.find((item) => item.href === pathname)
	const pageHeader = currentPage?.header ?? ''

	return <h2 className="text-2xl font-bold tracking-tight">{pageHeader}</h2>
}
