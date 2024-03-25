import { Table } from '@tanstack/react-table'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ResetFilterProps<TData, TValue> {
	table: Table<TData>
}

export function ResetFilter<TData, TValue>({
	table,
}: ResetFilterProps<TData, TValue>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<>
			{isFiltered && (
				<Button
					variant="ghost"
					onClick={() => table.resetColumnFilters()}
					className="h-8 px-2 lg:px-3"
				>
					Reset
					<XIcon className="ml-2 h-4 w-4" />
				</Button>
			)}
		</>
	)
}
