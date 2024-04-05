'use client'

import { useUser } from '@/store/use-store'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { counterpartsColumns } from './counterparts-columns'
import CounterpartsTable from './counterparts-table'

export default function CounterpartsCard() {
	const counterparts = useUser((state) => state.counterparts)

	return (
		<Card>
			<CardHeader className="px-7">
				<CardTitle>Counterparts</CardTitle>
				<CardDescription>
					List of all your counterparts added through transactions.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CounterpartsTable
					columns={counterpartsColumns}
					data={counterparts}
				/>
			</CardContent>
		</Card>
	)
}
