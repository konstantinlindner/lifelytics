import { Column } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'

type SearchProps<TData, TValue> = {
	column?: Column<TData, TValue>
}

export function Search<TData, TValue>({ column }: SearchProps<TData, TValue>) {
	return (
		<Input
			placeholder="Search for item..."
			value={(column?.getFilterValue() as string) ?? ''}
			onChange={(event) => column?.setFilterValue(event.target.value)}
			className="h-8 w-64"
		/>
	)
}
