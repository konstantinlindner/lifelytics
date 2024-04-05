'use client'

import { useUser } from '@/store/use-store'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import ConstantsTable from '../constants-table'
import { counterpartsColumns } from './counterparts-columns'

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
				<ConstantsTable
					columns={counterpartsColumns}
					data={counterparts}
				/>
			</CardContent>
		</Card>
	)
}
