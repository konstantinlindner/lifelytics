import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { Screen, screens } from './addTransactionConstants'
import AddTransactionDialogContentButton from './addTransactionDialogContentButton'
import AddTransactionDialogContentInputs from './addTransactionDialogContentInputs'

interface AddTransactionDialogContentProps {
	screen: Screen
	setScreen: (newScreen: Screen) => void
}

export default function AddTransactionDialogContent({
	screen,
	setScreen,
}: AddTransactionDialogContentProps) {
	const screenChildren = screens.filter(
		(otherScreen) => otherScreen.parent === screen.id,
	)

	return (
		<DialogContent className="max-h-screen max-w-xl overflow-y-scroll">
			<DialogHeader>
				<DialogTitle>{screen.title}</DialogTitle>
				<DialogDescription>{screen.subtitle}</DialogDescription>
			</DialogHeader>
			<main className="mx-auto py-7">
				{screenChildren.length > 0 && (
					<div
						className={
							screenChildren.length < 3
								? 'grid grid-cols-2 gap-4'
								: 'grid grid-cols-3 gap-4'
						}
					>
						{screenChildren.map((child, index) => (
							<AddTransactionDialogContentButton
								key={index}
								screen={child}
								keyboardShortcut={String(index + 1)}
								setScreen={setScreen}
							/>
						))}
					</div>
				)}
				{!screenChildren.length && (
					<AddTransactionDialogContentInputs screen={screen} />
				)}
			</main>
		</DialogContent>
	)
}
