'use client'

import { PaymentMethod } from '@/store/use-store'

import { ColumnDef } from '@tanstack/react-table'

import { PencilIcon, Trash2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const paymentMethodColumns: ColumnDef<PaymentMethod>[] = [
	{
		id: 'name',
		accessorKey: 'name',
		header: 'Name',
	},
	{
		id: 'category',
		accessorKey: 'category.name',
		header: 'Category',
		cell: ({ row }) => {
			return (
				// todo style depending on category
				<Badge variant="outline" className="w-max">
					{row.getValue('category')}
				</Badge>
			)
		},
	},
	{
		id: 'loyalty-program',
		accessorKey: 'loyaltyProgram.name',
		header: 'Loyalty program',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const paymentMethod = row.original

			return (
				<div className="flex gap-1">
					<Button variant="ghost" className="flex h-8 w-8 p-0">
						<PencilIcon className="h-4 w-4" />
						<span className="sr-only">Edit payment method</span>
					</Button>

					<Button
						// onClick={() =>
						// 	deletePaymentMethod({
						// 		paymentMethodId: paymentMethod.id,
						// 	})
						// }
						variant="ghost"
						className="flex h-8 w-8 p-0"
					>
						<Trash2Icon className="h-4 w-4" />
						<span className="sr-only">Delete payment method</span>
					</Button>
				</div>
			)
		},
	},
]
