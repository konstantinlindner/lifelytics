import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import AddTransactionButton from './add-transaction-button'
import { Screen, screens } from './add-transaction-constants'
import AddTransactionInput from './add-transaction-input'

type AddTransactionContentProps = {
	screen: Screen
	setScreen: (newScreen: Screen) => void
}

export default function AddTransactionContent({
	screen,
	setScreen,
}: AddTransactionContentProps) {
	const screenChildren = screens.filter(
		(otherScreen) => otherScreen.parent === screen.id,
	)

	return (
		<DialogContent className="max-h-[90vh] max-w-2xl overflow-y-scroll">
			<DialogHeader>
				<DialogTitle>New transaction</DialogTitle>
				<DialogDescription>{screen.subtitle}</DialogDescription>
			</DialogHeader>
			<main className="flex flex-col items-center justify-center py-7">
				{screenChildren.length > 0 && (
					<div
						className={
							screenChildren.length < 3
								? 'grid grid-cols-2 gap-4'
								: 'grid grid-cols-3 gap-4'
						}
					>
						{screenChildren.map((child, index) => (
							<AddTransactionButton
								key={index}
								screen={child}
								keyboardShortcut={String(index + 1)}
								setScreen={setScreen}
							/>
						))}
					</div>
				)}
				{!screenChildren.length && (
					<AddTransactionInput screen={screen} />
				)}
			</main>
		</DialogContent>
	)
}
