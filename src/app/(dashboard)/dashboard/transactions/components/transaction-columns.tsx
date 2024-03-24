'use client'

import { ColumnHeader } from '@/app/(dashboard)/dashboard/transactions/components/components/column-header'
import { Transaction } from '@/store/useStore'
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
		accessorKey: 'category',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Category" />
		),
		cell: ({ row }) => {
			const category = row.getValue('category') as Transaction['category']

			return <Badge variant="outline">{category?.name}</Badge>
		},
	},
	{
		accessorKey: 'item',
		header: ({ column }) => <ColumnHeader column={column} title="Item" />,
	},
	{
		accessorKey: 'counterpart',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Counterpart" />
		),
		cell: ({ row }) => {
			const counterpart = row.getValue(
				'counterpart',
			) as Transaction['counterpart']

			return <div>{counterpart?.name}</div>
		},
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => <ColumnHeader column={column} title="Amount" />,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			const currency = row.getValue('currency') as Transaction['currency']

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: currency?.code,
			}).format(amount)

			return <div>{formatted}</div>
		},
	},
	{
		accessorKey: 'city',
		header: ({ column }) => <ColumnHeader column={column} title="City" />,
		cell: ({ row }) => {
			const cityName = (row.getValue('city') as Transaction['city'])
				?.englishName

			return <div>{cityName}</div>
		},
	},
	{
		accessorKey: 'country',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Country" />
		),
		cell: ({ row }) => {
			const countryName = (
				row.getValue('country') as Transaction['country']
			)?.name

			return <div>{countryName}</div>
		},
	},
	{
		accessorKey: 'currency',
		header: ({ column }) => (
			<ColumnHeader column={column} title="Currency" />
		),
		cell: ({ row }) => {
			const currencyName = (
				row.getValue('currency') as Transaction['currency']
			)?.name

			return <div>{currencyName}</div>
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
