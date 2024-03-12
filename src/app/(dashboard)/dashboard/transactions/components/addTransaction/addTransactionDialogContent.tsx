import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { ScreenType, allScreens } from './addTransactionConstants'
import AddTransactionDialogContentButton from './addTransactionDialogContentButton'
import AddTransactionDialogContentInputs from './addTransactionDialogContentInputs'

interface AddTransactionDialogContentProps {
	screen: ScreenType
	setScreen: (newScreen: ScreenType) => void
}

export default function AddTransactionDialogContent({
	screen,
	setScreen,
}: AddTransactionDialogContentProps) {
	console.log(screen)
	const currentScreen = allScreens.find((s) => s.screen === screen)

	if (!currentScreen) {
		return
	}

	const { title, description } = currentScreen
	const isEndScreen = !currentScreen.buttonChildren.length

	return (
		<DialogContent className="max-h-screen max-w-xl overflow-y-scroll">
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<main className="mx-auto py-7">
				{!isEndScreen && (
					<div
						className={
							currentScreen.buttonChildren.length < 3
								? 'grid grid-cols-2 gap-4'
								: 'grid grid-cols-3 gap-4'
						}
					>
						{currentScreen.buttonChildren.map((child, index) => (
							<AddTransactionDialogContentButton
								key={index}
								icon={child.icon}
								text={child.title}
								shortcut={String(index + 1)}
								setScreen={setScreen}
								toScreen={child.screen}
							/>
						))}
					</div>
				)}
				{isEndScreen && (
					<AddTransactionDialogContentInputs screen={screen} />
				)}
			</main>
		</DialogContent>
	)
}
