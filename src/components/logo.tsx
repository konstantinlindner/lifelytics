import Link from 'next/link'

import { Activity } from 'lucide-react'

interface LogoProps {
	hideText?: boolean
	isDashboard?: boolean
}

export default function Logo({ hideText, isDashboard }: LogoProps) {
	return (
		<Link
			className="flex items-center"
			href={!isDashboard ? '/' : '/dashboard'}
		>
			<Activity className="h-7 w-7" />

			{!hideText && (
				<div className="select-none">
					<span className="ml-2 text-xl font-bold">Life</span>
					<span className="text-xl">lytics</span>
				</div>
			)}
		</Link>
	)
}
