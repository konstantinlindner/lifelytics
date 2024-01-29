import { useState } from 'react'

import { useUser } from '@/contexts/UserContext'

import { Button } from '@/components/ui/button'

import DatePicker from '@/components/datePicker'

interface ProfilePictureViewProps {
	currentViewIndex: number
	setCurrentViewIndex: (view: number) => void
}

export default function BirthDateView({
	currentViewIndex,
	setCurrentViewIndex,
}: ProfilePictureViewProps) {
	const { setBirthDate } = useUser()

	const [birthDate, setLocalBirthDate] = useState<Date | null>(null)

	function handleNextPress() {
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
