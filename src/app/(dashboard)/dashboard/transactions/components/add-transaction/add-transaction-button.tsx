import { Screen } from './add-transaction-constants'

type AddTransactionButtonProps = {
	screen: Screen
	keyboardShortcut: string
	setScreen: (newScreen: Screen) => void
}

export default function AddTransactionButton({
	screen,
	keyboardShortcut,
	setScreen,
}: AddTransactionButtonProps) {
	return (
		<button
			onClick={() => setScreen(screen)}
			className="relative inline-flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
		>
			<kbd className="absolute left-4 top-3 h-5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
				<span className="text-xs">{keyboardShortcut}</span>
			</kbd>
			{screen.icon}
			<h1 className="p-2">{screen.title}</h1>
		</button>
	)
}
