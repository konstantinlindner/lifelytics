'use client'

import { deleteTransaction } from '@/store/store-helper'
import { Transaction } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { ColumnHeader } from '@/app/(dashboard)/dashboard/transactions/components/components/column-header'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

import { MoreHorizontalIcon } from 'lucide-react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const transactionColumns: ColumnDef<Transaction>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'date',
		accessorKey: 'transactionDate',
		header: ({ column }) => <ColumnHeader column={column} title="Date" />,
		cell: ({ row }) => {
			const date = dayjs(row.getValue('date')).format('YYYY-MM-DD')

			return <div>{date}</div>
		},
	},
	{
		id: 'type',
		accessorKey: 'isIncome',
		header: ({ column }) => <ColumnHeader column={column} title="Type" />,
		cell: ({ row }) => {
			const isIncome = row.getValue('type')

			return (
				<Badge
					variant="outline"
					className={cn(isIncome ? 'bg-green-100' : 'bg-red-100')}
				>
					{isIncome ? 'Income' : 'Expense'}
				</Badge>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: 'category',
		accessorKey: 'category.name',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Category" />
		),
		cell: ({ row }) => {
			return <Badge variant="outline">{row.getValue('category')}</Badge>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: 'item',
		accessorKey: 'item',
		header: ({ column }) => <ColumnHeader column={column} title="Item" />,
	},
	{
		id: 'counterpart',
		accessorKey: 'counterpart.name',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Counterpart" />
		),
	},
	{
		id: 'amount',
		accessorKey: 'amount',
		header: ({ column }) => <ColumnHeader column={column} title="Amount" />,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			const currency = row.getValue('currency') as string

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: currency,
			}).format(amount)

			return <div>{formatted}</div>
		},
	},
	{
		id: 'city',
		accessorKey: 'city.englishName',
		header: ({ column }) => <ColumnHeader column={column} title="City" />,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},

	{
		id: 'country',
		accessorKey: 'country.name',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Country" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: 'currency',
		accessorKey: 'currency.code',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Currency" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const transaction = row.original

			return (
				<AlertDialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
							>
								<MoreHorizontalIcon className="h-4 w-4" />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[160px]">
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Duplicate</DropdownMenuItem>

							<DropdownMenuSeparator />

							<AlertDialogTrigger className="w-full">
								<DropdownMenuItem>
									Delete
									<DropdownMenuShortcut>
										⌘⌫
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</AlertDialogTrigger>
						</DropdownMenuContent>
					</DropdownMenu>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will
								permanently delete the transaction.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() =>
									deleteTransaction({
										transactionId: transaction.id,
									})
								}
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)
		},
	},
]
