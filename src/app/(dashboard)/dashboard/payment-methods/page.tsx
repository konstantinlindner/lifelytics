'use client'

import { useDatabase, useUser } from '@/store/use-store'

import dayjs from 'dayjs'

import { Button } from '@/components/ui/button'

export default function PaymentMethods() {
	const paymentMethods = useUser((state) => state.paymentMethods)
	const paymentMethodCategories = useDatabase(
		(state) => state.paymentMethodCategories,
	)
	const loyaltyPrograms = useDatabase((state) => state.loyaltyPrograms)

	return (
		<main className="">
			<div className="flex flex-col gap-2">
				{paymentMethods.map((paymentMethod) => (
					<div key={paymentMethod.id} className="flex gap-2">
						<p className="font-bold">{paymentMethod.name}</p>
						<p>
							{
								paymentMethodCategories.find(
									(category) =>
										category.id === paymentMethod.category,
								)?.name
							}
						</p>

						<p>
							Created at:{' '}
							{dayjs(paymentMethod.createdAt).format(
								'YYYY-MM-DD',
							)}
						</p>

						<p>
							Loyalty program:{' '}
							{
								loyaltyPrograms.find(
									(loyaltyProgram) =>
										loyaltyProgram.id ===
										paymentMethod.loyaltyProgram,
								)?.name
							}
						</p>
					</div>
				))}
			</div>

			<Button variant="outline" className="mt-10">
				Add payment method
			</Button>
		</main>
	)
}
