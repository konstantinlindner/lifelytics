'use client'

import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
	CalculatorIcon,
	CalendarIcon,
	CoinsIcon,
	SettingsIcon,
	UserIcon,
} from 'lucide-react'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command'

import AddTransactionDialog from '../transactions/components/add-transaction/add-transaction-dialog'

export default function CommandModal() {
	const router = useRouter()

	const [open, setOpen] = useState(false)

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false)
		command()
	}, [])

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<>
			<p className="text-sm text-muted-foreground">
				Press{' '}
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>J
				</kbd>{' '}
				to open command bar
			</p>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<AddTransactionDialog showCommandItem />
						<CommandItem>
							<CalendarIcon className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<CalculatorIcon className="mr-2 h-4 w-4" />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem
							onSelect={() => {
								runCommand(() =>
									router.push('/dashboard/profile'),
								)
							}}
						>
							<UserIcon className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⇧⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem
							onSelect={() => {
								runCommand(() =>
									router.push('/dashboard/account'),
								)
							}}
						>
							<SettingsIcon className="mr-2 h-4 w-4" />
							<span>Account</span>
							<CommandShortcut>⇧⌘A</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}
