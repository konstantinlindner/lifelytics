import { useState } from 'react'

import { Currency } from '@/types/globals.types'

import { handleUpdatePrimaryCurrency } from '@/store/store-helper'
import { useDatabase } from '@/store/use-store'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import LoadingIndicator from '@/components/loading-indicator'

type CurrencyPickerViewProps = {
	currentViewIndex: number
	setCurrentViewIndex: (view: number) => void
}

export default function CurrencyPickerView({
	currentViewIndex,
	setCurrentViewIndex,
}: CurrencyPickerViewProps) {
	const currencies = useDatabase((state) => state.currencies)

	const [isLoading, setIsLoading] = useState(false)

	const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
		null,
	)

	const handleNextPress = async () => {
		if (!selectedCurrency) {
			return
		}

		setIsLoading(true)

		await handleUpdatePrimaryCurrency({ currency: selectedCurrency })

		setCurrentViewIndex(currentViewIndex + 1)
	}

	return (
		<section className="flex w-full flex-col items-center space-y-10">
			<Card className="flex space-x-1 px-10 py-12">
				{currencies.map((currency) => (
					<button
						key={currency.id}
						onClick={() =>
							setSelectedCurrency(
								selectedCurrency === currency ? null : currency,
							)
						}
					>
						<Badge
							className="text-sm"
							variant={
								selectedCurrency === currency
									? 'default'
									: 'outline'
							}
						>
							{currency.code}
						</Badge>
					</button>
				))}
			</Card>

			<Button
				disabled={!selectedCurrency}
				variant={selectedCurrency ? 'default' : 'secondary'}
				className="w-60"
				onClick={() => handleNextPress()}
			>
				{isLoading ? <LoadingIndicator size="sm" /> : 'Next'}
			</Button>
		</section>
	)
}
