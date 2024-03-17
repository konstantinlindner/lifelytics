'use client'

import { useUser } from '@/store/Store'

import { transactionColumns } from './components/transactionColumns'
import { TransactionTable } from './components/transactionTable'

export default function Transactions() {
	const transactions = useUser((state) => state.transactions)

	return (
		<main>
			<div className="mx-auto">
				{transactions ? (
					<TransactionTable
						columns={transactionColumns}
						data={transactions}
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
