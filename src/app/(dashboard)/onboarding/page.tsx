'use client'

import { useState } from 'react'

import { useUser } from '@/store/UseStore'
import { motion } from 'framer-motion'

import { Progress } from '@/components/ui/progress'

import BirthDateView from './components/birth-date-view'
import CurrencyPickerView from './components/currency-picker-view'
import ProfilePictureView from './components/profile-picture-view'

export default function Onboarding() {
	const firstName = useUser((state) => state.firstName)

	const [currentViewIndex, setCurrentViewIndex] = useState(0)

	const progress = (() => {
		switch (currentViewIndex) {
			case 0:
				return 20
			case 1:
				return 60
			case 2:
				return 85
		}
	})()

	const header = (() => {
		switch (currentViewIndex) {
			case 0:
				return `Welcome to Lifelytics${
					firstName ? `, ${firstName}` : ''
				}!`
			case 1:
				return 'Nice!'
			case 2:
				return 'Last step'
		}
	})()

	const subHeader = (() => {
		switch (currentViewIndex) {
			case 0:
				return 'Choose your most used currency'
			case 1:
				return 'Now enter your date of birth'
			case 2:
				return 'Upload a profile picture'
		}
	})()

	const text = (() => {
		switch (currentViewIndex) {
			case 0:
				return `This will be your default currency, but don't worry, you can still add transactions with any other currency as well`
			case 1:
				return ''
			case 2:
				return `Users who upload a profile picture are 80% more likely to stick to
        their goals`
		}
	})()

	const views = [
		<CurrencyPickerView
			key="currencyPickerView"
			currentViewIndex={currentViewIndex}
			setCurrentViewIndex={setCurrentViewIndex}
		/>,
		<BirthDateView
			key="birthDateView"
			currentViewIndex={currentViewIndex}
			setCurrentViewIndex={setCurrentViewIndex}
		/>,
		<ProfilePictureView
			key="profilePictureView"
			currentViewIndex={currentViewIndex}
			setCurrentViewIndex={setCurrentViewIndex}
		/>,
	]

	return (
		<div className="container flex h-screen w-screen max-w-[64rem] flex-col items-center space-y-10 pb-8">
			<div className="w-full p-10">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 2 }}
				>
					<Progress value={progress} />
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<h1 className="max-w-2xl text-center font-heading text-4xl leading-10 sm:text-5xl md:text-6xl lg:text-6xl">
					{header}
				</h1>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 2 }}
			>
				<div className="flex flex-grow flex-col space-y-10">
					<div className="flex flex-col space-y-2">
						<h1 className="font-small text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
							{subHeader}
						</h1>
						<p>{text}</p>
					</div>

					{views[currentViewIndex]}
				</div>
			</motion.div>
		</div>
	)
}
