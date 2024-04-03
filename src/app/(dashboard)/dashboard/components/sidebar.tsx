'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

import Logo from '@/components/logo'

export const SidebarItems = [
	{ title: 'Dashboard', href: '/dashboard', header: 'Dashboard' },
	{
		title: 'All transactions',
		href: '/dashboard/transactions',
		header: 'Transactions',
	},
	// { title: "Flights", href: "/dashboard/flights" },
	// { title: "Accommodation", href: "/dashboard/accommodation" },
	// { title: "Transportation", href: "/dashboard/transportations" },
	// { title: "Food", href: "/dashboard/food" },
	// { title: "Other", href: "/dashboard/other" },
	// { title: "Subscriptions", href: "/dashboard/subscriptions" },
	// { title: "Income", href: "/dashboard/income" },
	{
		title: 'Payment methods',
		href: '/dashboard/payment-methods',
		header: 'Payment methods',
	},
]

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<nav className="flex h-screen w-60 flex-col border-r px-4">
			<div className="flex h-24 items-center justify-center">
				<Logo isDashboard />
			</div>

			{SidebarItems.map((item) => (
				<Link
					className="w-44 justify-start"
					key={item.href}
					href={item.href}
				>
					<Button
						variant="ghost"
						className={
							pathname === item.href
								? 'w-44 justify-start bg-muted hover:bg-muted'
								: 'w-44 justify-start hover:bg-transparent hover:underline'
						}
					>
						{item.title}
					</Button>
				</Link>
			))}
		</nav>
	)
}
