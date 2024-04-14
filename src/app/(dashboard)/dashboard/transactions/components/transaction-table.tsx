'use client'

import { useState } from 'react'

import {
	ColumnDef,
	ColumnFiltersState,
	ExpandedState,
	RowSelectionState,
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

import AddTransactionDialog from '../../components/add-transaction/add-transaction-dialog'
import { CategoryFilter } from './components/category-filter'
import { CityFilter } from './components/city-filter'
import { CountryFilter } from './components/country-filter'
import { CurrencyFilter } from './components/currency-filter'
import { Pagination } from './components/pagination'
import { PaymentMethodFilter } from './components/payment-method-filter'
import { ResetFilter } from './components/reset-filter'
import { Search } from './components/search'
import { TypeFilter } from './components/type-filter'
import { ViewOptions } from './components/view-options'

type TransactionTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function TransactionTable<TData, TValue>({
	columns,
	data,
}: TransactionTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: 'date', desc: true },
	])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		city: false,
		country: false,
		currency: false,
		description: false,
	})
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [expanded, setExpanded] = useState<ExpandedState>({})

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			expanded,
		},
		enableRowSelection: true,
		onExpandedChange: setExpanded,
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
		<div className="flex flex-col gap-4 pb-10">
			<div className="flex justify-between gap-2">
				<div className="flex flex-row gap-2">
					<ViewOptions table={table} />

					<Search column={table.getColumn('item')} />

					<TypeFilter column={table.getColumn('type')} />
					<CategoryFilter column={table.getColumn('category')} />
					<PaymentMethodFilter column={table.getColumn('payment')} />
					<CityFilter column={table.getColumn('city')} />
					<CountryFilter column={table.getColumn('country')} />
					<CurrencyFilter column={table.getColumn('currency')} />

					<ResetFilter table={table} />
				</div>
				<AddTransactionDialog button />
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
								<>
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

									{typeof expanded === 'object' &&
										expanded?.[row.id] === true && (
											<TableRow>
												<TableCell
													colSpan={columns.length}
													className="p-10"
												>
													<p className="mb-4">
														Currency:{' '}
														<span className="font-bold">
															{row.getValue(
																'currency',
															)}
														</span>
													</p>

													<p className="mb-2">
														Location:{' '}
														<span className="font-bold">
															{row.getValue(
																'city',
															) === 'Online'
																? row.getValue(
																		'city',
																  )
																: `${row.getValue(
																		'city',
																  )}, ${row.getValue(
																		'country',
																  )}`}
														</span>
													</p>

													<p>
														Description:{' '}
														<span className="font-bold">
															{row.getValue(
																'description',
															)}
														</span>
													</p>
												</TableCell>
											</TableRow>
										)}
								</>
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
