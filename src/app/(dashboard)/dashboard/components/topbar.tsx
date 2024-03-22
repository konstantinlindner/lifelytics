'use client'

import Link from 'next/link'

import { useUser } from '@/store/UseStore'

import { BadgeCheck } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import ModeToggle from '@/components/mode-toggle'

import CommandModal from './command-modal'
import PageHeader from './page-header'
import SignOutButton from './sign-out-button'

export default function Topbar() {
	const fullName = useUser((state) => state.fullName)
	const initials = useUser((state) => state.initials)
	const avatarUrl = useUser((state) => state.avatarUrl)
	const email = useUser((state) => state.email)

	return (
		<header className="flex h-24 items-center justify-between gap-2 px-10 py-6">
			<PageHeader />
			<div className="flex items-center gap-4">
				<CommandModal />
				<ModeToggle isRound />

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="relative h-8 w-8 rounded-full"
						>
							<Avatar className="h-9 w-9">
								<AvatarImage
									src={avatarUrl ?? ''}
									alt={fullName ?? ''}
								/>
								<AvatarFallback>{initials}</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56"
						align="end"
						forceMount
					>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<div className="flex space-x-1">
									<p className="text-sm font-medium leading-none">
										{fullName}
									</p>
									<BadgeCheck className="h-4 w-4" />
								</div>
								<p className="text-xs leading-none text-muted-foreground">
									{email}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								asChild
								className="cursor-pointer"
							>
								<Link
									href="/dashboard/profile"
									passHref
									className="flex w-full"
								>
									Profile
									<DropdownMenuShortcut>
										⇧⌘P
									</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								asChild
								className="cursor-pointer"
							>
								<Link
									href="/dashboard/account"
									className="flex w-full"
								>
									Account
									<DropdownMenuShortcut>
										⇧⌘A
									</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<SignOutButton isMenuItem />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
