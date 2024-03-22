'use client'

import { useTheme } from 'next-themes'

import { Moon, SunMedium } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ModeToggleProps {
	isRound?: boolean
}

export default function ModeToggle({ isRound }: ModeToggleProps) {
	const { setTheme, resolvedTheme } = useTheme()

	const isDarkTheme = resolvedTheme === 'dark'

	return (
		<Button
			className={isRound ? 'h-9 w-9 rounded-full' : 'h-9 w-9'}
			onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
			variant="ghost"
			size="sm"
		>
			<SunMedium className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<Moon className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
