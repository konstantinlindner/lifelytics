'use client'

import { useState } from 'react'

import { CoinsIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Screen, screens } from './add-transaction-constants'
import AddTransactionDialogContent from './add-transaction-dialog-content'

type addTransactionDialogProps = {
	openingScreen?: Screen
	showButton?: boolean
	showCommandItem?: boolean
}

export default function AddTransactionDialog({
	openingScreen,
	showButton,
	showCommandItem,
}: addTransactionDialogProps) {
	const [open, setOpen] = useState(false)
	const [screen, setScreen] = useState<Screen>(openingScreen ?? screens[0])

	return (
		<main>
			<Dialog open={open} onOpenChange={setOpen}>
				{showButton && (
					<DialogTrigger asChild>
						<Button size="sm" variant="outline" className="h-8">
							<PlusIcon className="mr-2 h-5 w-5" /> Add
						</Button>
					</DialogTrigger>
				)}
				{showCommandItem && (
					<CommandItem
						onSelect={() => {
							setOpen(true)
						}}
					>
						<CoinsIcon className="mr-2 h-4 w-4" />
						<span>Add transaction</span>
					</CommandItem>
				)}

				<AddTransactionDialogContent
					screen={screen}
					setScreen={setScreen}
				/>
			</Dialog>
		</main>
	)
}
