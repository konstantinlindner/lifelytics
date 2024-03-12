'use client'

import { useDatabase } from '@/contexts/DatabaseContext'
import { useUser } from '@/contexts/UserContext'

import { transactionColumns } from './components/transactionColumns'
import { TransactionTable } from './components/transactionTable'

export default function Transactions() {
	const { countries, currencies } = useDatabase()

	const transactions = useUser().user?.transactions

	const formattedTransactions =
		transactions?.map((transaction) => {
			const currency = currencies?.find(
				(currency) => currency.id === transaction.currency,
			)
			const country = countries?.find(
				(country) => country.id === transaction.country,
			)

			return {
				...transaction,
				currency: currency ? currency.code : null,
				country: country ? country.name : null,
			}
		}) || []

	return (
		<main>
			<div className="mx-auto">
				{transactions ? (
					<TransactionTable
						columns={transactionColumns}
						data={formattedTransactions}
					/>
				) : (
					<p>
						Could not load transactions. Please try reloading the
						page.
					</p>
				)}
			</div>
		</main>
	)
}
