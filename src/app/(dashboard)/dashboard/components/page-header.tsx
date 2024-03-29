'use client'

import { usePathname } from 'next/navigation'

import { SettingsTopbarItems } from '../(settings)/components/settings-topbar'
import { SidebarItems } from './sidebar'

const allSidebarItems = [...SidebarItems, ...SettingsTopbarItems]

export default function PageHeader() {
	const pathname = usePathname()
	const currentPage = allSidebarItems.find((item) => item.href === pathname)
	const pageHeader = currentPage ? currentPage.header : ''

	return <h2 className="text-2xl font-bold tracking-tight">{pageHeader}</h2>
}
