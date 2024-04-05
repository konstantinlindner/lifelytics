'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export default function CounterpartsTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	})

	return (
		<section className="flex flex-col gap-4">
			<Input
				placeholder="Search for item..."
				value={
					(table.getColumn('name')?.getFilterValue() as string) ?? ''
				}
				onChange={(event) =>
					table.getColumn('name')?.setFilterValue(event.target.value)
				}
				className="h-8 w-64"
			/>

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
								data-state={row.getIsSelected() && 'selected'}
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
								No counterparts yet, create some transactions
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<div className="ml-auto flex gap-2">
				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<span className="sr-only">Previous page</span>
					<ChevronLeftIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<span className="sr-only">Next page</span>
					<ChevronRightIcon className="h-4 w-4" />
				</Button>
			</div>
		</section>
	)
}
