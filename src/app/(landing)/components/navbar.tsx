import Link from 'next/link'

import { Button } from '@/components/ui/button'

import Logo from '@/components/logo'
import ModeToggle from '@/components/modeToggle'

export default function Navbar() {
	return (
		<header className="h-24` container flex flex-row items-center justify-between py-6">
			<nav className="flex items-center gap-10">
				<Logo />

				<div className="flex items-center gap-6">
					<Link
						href="#"
						className="text-sm font-medium text-foreground/60
          transition-colors hover:text-foreground/80"
					>
						Features
					</Link>
					<Link
						href="#"
						className="text-sm font-medium text-foreground/60
          transition-colors hover:text-foreground/80  "
					>
						Pricing
					</Link>
				</div>
			</nav>
			<div className="flex items-center gap-2">
				<ModeToggle />

				<Link href={'/sign-in'}>
					<Button size="sm" variant="outline">
						Sign in
					</Button>
				</Link>

				<Link href={'/sign-up'}>
					<Button size="sm" variant="default">
						Sign up
					</Button>
				</Link>
			</div>
		</header>
	)
}
