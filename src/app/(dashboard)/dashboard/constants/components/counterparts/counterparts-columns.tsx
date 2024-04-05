'use client'

import { Counterpart } from '@/types/globals.types'

import { cn } from '@/lib/utils'

import { ColumnDef } from '@tanstack/react-table'

import { PencilIcon, Trash2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

export const counterpartsColumns: ColumnDef<Counterpart>[] = [
	{
		id: 'name',
		accessorKey: 'name',
		header: 'Name',
	},
	{
		id: 'isIncome',
		accessorKey: 'isIncome',
		header: 'Income',
		cell: ({ row }) => {
			const isIncome: boolean = row.getValue('isIncome')

			return (
				<Badge
					variant="outline"
					className={cn(
						'text-black',
						isIncome ? 'bg-green-100' : 'bg-red-100',
					)}
				>
					{isIncome ? 'true' : 'false'}
				</Badge>
			)
		},
	},
	{
		id: 'isExpense',
		accessorKey: 'isExpense',
		header: 'Expense',
		cell: ({ row }) => {
			const isExpense: boolean = row.getValue('isExpense')

			return (
				<Badge
					variant="outline"
					className={cn(
						'text-black',
						isExpense ? 'bg-green-100' : 'bg-red-100',
					)}
				>
					{isExpense ? 'true' : 'false'}
				</Badge>
			)
		},
	},
	// {
	// 	id: 'transactionCount',
	// 	accessorKey: '',
	// 	header: 'Transaction count',
	// 	cell: ({ row }) => {
	// 		return (
	// 			<TooltipProvider>
	// 				<Tooltip>
	// 					<TooltipTrigger>
	// 						{row.getValue('category')}
	// 					</TooltipTrigger>
	// 					<TooltipContent>
	// 						<p>Income: </p>
	// 						<p>Expense: </p>
	// 					</TooltipContent>
	// 				</Tooltip>
	// 			</TooltipProvider>
	// 		)
	// 	},
	// },
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
