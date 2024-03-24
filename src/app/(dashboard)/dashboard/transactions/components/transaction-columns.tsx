'use client'

import { Transaction } from '@/store/use-store'

import { ColumnHeader } from '@/app/(dashboard)/dashboard/transactions/components/components/column-header'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

import { MoreHorizontalIcon } from 'lucide-react'

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
			const date = dayjs(row.getValue('transactionDate')).format(
				'YYYY-MM-DD',
			)

			return <div>{date}</div>
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
						<DropdownMenuItem>
							Delete
							<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
