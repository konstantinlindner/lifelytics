import { useState } from 'react'

import { handleUpdateBirthDate } from '@/store/store-helper'

import dayjs from 'dayjs'

import { Button } from '@/components/ui/button'

import DatePicker from '@/components/date-picker'
import LoadingIndicator from '@/components/loading-indicator'

type ProfilePictureViewProps = {
	currentViewIndex: number
	setCurrentViewIndex: (view: number) => void
}

export default function BirthDateView({
	currentViewIndex,
	setCurrentViewIndex,
}: ProfilePictureViewProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedBirthDate, setSelectedBirthDate] = useState<Date | null>(
		null,
	)

	const handleNextPress = async () => {
		if (!selectedBirthDate) {
			setCurrentViewIndex(currentViewIndex + 1)
			return
		}

		setIsLoading(true)

		await handleUpdateBirthDate({ birthDate: selectedBirthDate })

		setCurrentViewIndex(currentViewIndex + 1)
	}

	return (
		<section className="flex w-full flex-col items-center space-y-10">
			<DatePicker
				fromYear={1900}
				toYear={dayjs().year()}
				handleDateChange={setSelectedBirthDate}
			/>

			<div className="flex space-x-2">
				<Button
					variant="outline"
					className="w-44"
					onClick={() => setCurrentViewIndex(currentViewIndex - 1)}
				>
					Back
				</Button>
				<Button
					variant={selectedBirthDate ? 'default' : 'secondary'}
					className="w-44"
					onClick={() => handleNextPress()}
				>
					{isLoading ? (
						<LoadingIndicator size="sm" />
					) : selectedBirthDate ? (
						'Next'
					) : (
						'Skip'
					)}
				</Button>
			</div>
		</section>
	)
}
