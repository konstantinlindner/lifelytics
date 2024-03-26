'use client'

import { useState } from 'react'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import AddTransactionDialog from './add-transaction/add-transaction-dialog'
import { CategoryFilter } from './components/category-filter'
import { CityFilter } from './components/city-filter'
import { CountryFilter } from './components/country-filter'
import { CurrencyFilter } from './components/currency-filter'
import { Pagination } from './components/pagination'
import { ResetFilter } from './components/reset-filter'
import { Search } from './components/search'
import { TypeFilter } from './components/type-filter'
import { ViewOptions } from './components/view-options'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function TransactionTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{},
	)
	const [rowSelection, setRowSelection] = useState({})

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
	})

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-2">
				<div className="flex flex-row gap-2">
					<ViewOptions table={table} />

					<Search column={table.getColumn('item')} />

					<TypeFilter column={table.getColumn('type')} />
					<CategoryFilter column={table.getColumn('category')} />
					<CityFilter column={table.getColumn('city')} />
					<CountryFilter column={table.getColumn('country')} />
					<CurrencyFilter column={table.getColumn('currency')} />

					<ResetFilter table={table} />
				</div>
				<AddTransactionDialog showButton />
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && 'selected'
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No transactions found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<Pagination table={table} />
		</div>
	)
}
