import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CurrencyPickerViewProps {
	currentViewIndex: number
	setCurrentViewIndex: (view: number) => void
}

const currencies = ['SEK', 'EUR', 'USD', 'CAD', 'MXN', 'KRW', 'JPY'] as const
type Currency = (typeof currencies)[number]

export default function CurrencyPickerView({
	currentViewIndex,
	setCurrentViewIndex,
}: CurrencyPickerViewProps) {
	const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>([])

	return (
		<section className="flex w-full flex-col items-center space-y-10">
			<Card className="flex space-x-1 px-10 py-12">
				{currencies.map((currency) => (
					<button
						key={currency}
						onClick={() =>
							setSelectedCurrencies((current) =>
								current.includes(currency)
									? current.filter((x) => x !== currency)
									: [...current, currency],
							)
						}
					>
						<Badge
							className="text-sm"
							variant={
								selectedCurrencies.includes(currency)
									? 'default'
									: 'outline'
							}
						>
							{currency}
						</Badge>
					</button>
				))}
			</Card>

			<Button
				disabled={selectedCurrencies.length === 0}
				variant={
					selectedCurrencies.length === 0 ? 'secondary' : 'default'
				}
				className="w-60"
				onClick={() => setCurrentViewIndex(currentViewIndex + 1)}
			>
				Next
			</Button>
		</section>
	)
}
