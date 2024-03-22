'use client'

import { useUser } from '@/store/UseStore'

import { transactionColumns } from './components/transaction-columns'
import { TransactionTable } from './components/transaction-table'

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
