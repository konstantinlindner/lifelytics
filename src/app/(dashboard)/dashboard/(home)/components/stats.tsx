'use client'

import { useUser } from '@/store/use-store'

export default function Stats() {
	const transactions = useUser((state) => state.transactions)
	const incomeTransactions = transactions.filter(
		(transaction) => transaction.isIncome === true,
	)
	const expenseTransactions = transactions.filter(
		(transaction) => transaction.isIncome === false,
	)

	const numberOfTransactions = transactions.length
	const numberOfIncomeTransactions = incomeTransactions.length
	const numberOfExpenseTransactions = expenseTransactions.length

	const totalTransactionsValue = transactions.reduce((acc, transaction) => {
		return acc + transaction.amount
	}, 0)
	const totalIncomeTransactionsValue = incomeTransactions.reduce(
		(acc, transaction) => {
			return acc + transaction.amount
		},
		0,
	)
	const totalExpenseTransactionsValue = expenseTransactions.reduce(
		(acc, transaction) => {
			return acc + transaction.amount
		},
		0,
	)

	return (
		<section>
			<div className="flex space-x-8">
				<div>
					<h2 className="text-2xl font-semibold">
						{numberOfTransactions}
					</h2>
					<p className="text-gray-500">Transactions</p>
				</div>
				<div>
					<h2 className="text-2xl font-semibold">
						{numberOfIncomeTransactions}
					</h2>
					<p className="text-gray-500">Income transactions</p>
				</div>
				<div>
					<h2 className="text-2xl font-semibold">
						{numberOfExpenseTransactions}
					</h2>
					<p className="text-gray-500">Expense transactions</p>
				</div>
			</div>

			<div className="flex space-x-8">
				<div>
					<h2 className="text-2xl font-semibold">
						{totalTransactionsValue}
					</h2>
					<p className="text-gray-500">Total value</p>
				</div>
				<div>
					<h2 className="text-2xl font-semibold">
						{totalIncomeTransactionsValue}
					</h2>
					<p className="text-gray-500">Total income value</p>
				</div>
				<div>
					<h2 className="text-2xl font-semibold">
						{totalExpenseTransactionsValue}
					</h2>
					<p className="text-gray-500">Total expense value</p>
				</div>
			</div>
		</section>
	)
}
