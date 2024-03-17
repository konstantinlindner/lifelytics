'use client'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Coins, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Screen, screens } from './addTransactionConstants'
import AddTransactionDialogContent from './addTransactionDialogContent'

interface addTransactionDialogProps {
	openingScreen?: Screen
	showButton?: boolean
	showCommandItem?: boolean
}

export default function AddTransactionDialog({
	openingScreen,
	showButton,
	showCommandItem,
}: addTransactionDialogProps) {
	const [screen, setScreen] = useState<Screen>(openingScreen ?? screens[0])

	return (
		<main>
			<Dialog>
				{showButton && (
					<DialogTrigger asChild>
						<Button variant="outline">
							<Plus className="mr-2 h-5 w-5" /> Add
						</Button>
					</DialogTrigger>
				)}
				{showCommandItem && (
					<DialogTrigger asChild>
						<button className="w-full">
							<CommandItem key="1" value="add-transaction">
								<Coins className="mr-2 h-4 w-4" />
								<span>Add transaction</span>
							</CommandItem>
						</button>
					</DialogTrigger>
				)}

				<AddTransactionDialogContent
					screen={screen}
					setScreen={setScreen}
				/>
			</Dialog>
		</main>
	)
}
