'use client'

import { useUser } from '@/store/use-store'

import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { paymentMethodColumns } from './payment-methods-columns'
import PaymentMethodsTable from './payment-methods-table'

export default function PaymentMethodsCard() {
	const paymentMethods = useUser((state) => state.paymentMethods)

	return (
		<Card>
			<div className="flex flex-row justify-between">
				<CardHeader className="px-7">
					<CardTitle>Payment methods</CardTitle>
					<CardDescription>
						Here you can manage all your personal payment methods.
					</CardDescription>
				</CardHeader>
				<Button size="sm" variant="outline" className="m-7 h-8">
					<PlusIcon className="mr-2 h-5 w-5" /> Add
				</Button>
			</div>
			<CardContent>
				<PaymentMethodsTable
					columns={paymentMethodColumns}
					data={paymentMethods}
				/>
			</CardContent>
		</Card>
	)
}
