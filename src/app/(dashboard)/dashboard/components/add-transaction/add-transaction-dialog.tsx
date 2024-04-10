'use client'

import { useState } from 'react'

import { CommandLoading } from 'cmdk'

import { CoinsIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Screen, screens } from './add-transaction-constants'
import AddTransactionContent from './add-transaction-content'

type addTransactionDialogProps = {
	openingScreen?: Screen
	button?: boolean
	buttonTitle?: string
	commandItem?: boolean
	commandItemTitle?: string
}

export default function AddTransactionDialog({
	openingScreen,
	button,
	buttonTitle,
	commandItem,
	commandItemTitle,
}: addTransactionDialogProps) {
	const [open, setOpen] = useState(false)
	const [screen, setScreen] = useState<Screen>(openingScreen ?? screens[0])

	function handleOpenChange() {
		setOpen(!open)
		setScreen(openingScreen ?? screens[0])
	}

	return (
		<main>
			<Dialog open={open} onOpenChange={handleOpenChange}>
				{button && (
					<DialogTrigger asChild>
						<Button size="sm" variant="outline" className="h-8">
							<PlusIcon className="mr-2 h-5 w-5" />
							{buttonTitle ?? 'Add'}
						</Button>
					</DialogTrigger>
				)}
				{commandItem && (
					<CommandItem
						onSelect={() => {
							setOpen(true)
						}}
					>
						<CoinsIcon className="mr-2 h-4 w-4" />
						<span>{commandItemTitle ?? 'Add transaction'}</span>
					</CommandItem>
				)}

				<AddTransactionContent screen={screen} setScreen={setScreen} />
			</Dialog>
		</main>
	)
}
