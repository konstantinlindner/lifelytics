'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useUser } from '@/contexts/UserContext'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import LoadingIndicator from '@/components/loadingIndicator'
import ProfilePictureUpload from '@/components/profilePicturePicker'

interface ProfilePictureViewProps {
	currentViewIndex: number
	setCurrentViewIndex: (view: number) => void
}

export default function ProfilePictureView({
	currentViewIndex,
	setCurrentViewIndex,
}: ProfilePictureViewProps) {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const { user, setOnboardingComplete } = useUser()

	const avatarUrl = user?.avatarUrl ?? ''

	const handleFinishPress = async () => {
		setIsLoading(true)
		setOnboardingComplete()
		router.refresh()
	}

	return (
		<section className="flex w-full flex-col items-center space-y-10">
			<Card className="flex px-24 py-32">
				<ProfilePictureUpload />
			</Card>

			<div className="flex space-x-2">
				<Button
					variant="outline"
					className="w-44"
					onClick={() => setCurrentViewIndex(currentViewIndex - 1)}
				>
					Back
				</Button>
				<Button
					disabled={isLoading}
					variant={avatarUrl ? 'default' : 'secondary'}
					className="w-44"
					onClick={() => handleFinishPress()}
				>
					{isLoading ? (
						<LoadingIndicator size="sm" />
					) : avatarUrl ? (
						'Finish'
					) : (
						'Skip'
					)}
				</Button>
			</div>
		</section>
	)
}
