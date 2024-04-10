'use client'

import { screens } from '../components/add-transaction/add-transaction-constants'
import AddTransactionDialog from '../components/add-transaction/add-transaction-dialog'

export default function Flights() {
	return (
		<main>
			<AddTransactionDialog
				openingScreen={screens[14]}
				button
				buttonTitle="Add flight"
			/>
		</main>
	)
}
