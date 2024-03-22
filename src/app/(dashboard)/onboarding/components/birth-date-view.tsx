import { useState } from 'react'

import { useUser } from '@/store/store'

import { Button } from '@/components/ui/button'

import DatePicker from '@/components/date-picker'

interface ProfilePictureViewProps {
	currentViewIndex: number
	setCurrentViewIndex: (view: number) => void
}

export default function BirthDateView({
	currentViewIndex,
	setCurrentViewIndex,
}: ProfilePictureViewProps) {
	const setBirthDate = useUser((state) => state.setBirthDate)

	const [birthDate, setLocalBirthDate] = useState<Date | null>(null)

	function handleNextPress() {
		if (!birthDate) {
			setCurrentViewIndex(currentViewIndex + 1)
			return
		}

		setCurrentViewIndex(currentViewIndex + 1)
		setBirthDate(birthDate)
	}

	return (
		<section className="flex w-full flex-col items-center space-y-10">
			<DatePicker
				fromYear={1900}
				toYear={2024}
				handleDateChange={setLocalBirthDate}
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
					variant={birthDate ? 'default' : 'secondary'}
					className="w-44"
					onClick={() => handleNextPress()}
				>
					{birthDate ? 'Next' : 'Skip'}
				</Button>
			</div>
		</section>
	)
}
