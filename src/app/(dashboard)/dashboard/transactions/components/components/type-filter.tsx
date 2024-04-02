import { cn } from '@/lib/utils'

import { Column } from '@tanstack/react-table'

import { CheckIcon, FilterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

type TypeFilterProps<TData, TValue> = {
	column?: Column<TData, TValue>
}

export function TypeFilter<TData, TValue>({
	column,
}: TypeFilterProps<TData, TValue>) {
	const options = [
		{
			name: 'Income',
			value: true,
		},
		{
			name: 'Expense',
			value: false,
		},
	]

	const facets = column?.getFacetedUniqueValues()

	const selectedValues = new Set(column?.getFilterValue() as boolean[])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size="sm"
					variant="outline"
					className={cn(
						selectedValues.size > 0 && 'border-red-500',
						'h-8 border-dashed',
					)}
				>
					<FilterIcon className="mr-2 h-4 w-4" />
					Type
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(
									option.value,
								)
								return (
									<CommandItem
										key={option.name}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(
													option.value,
												)
											} else {
												selectedValues.add(option.value)
											}
											const filterValues =
												Array.from(selectedValues)
											column?.setFilterValue(
												filterValues.length
													? filterValues
													: undefined,
											)
										}}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50 [&_svg]:invisible',
											)}
										>
											<CheckIcon
												className={cn('h-4 w-4')}
											/>
										</div>
										<span>{option.name}</span>
										{facets?.get(option.value) && (
											<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								)
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() =>
											column?.setFilterValue(undefined)
										}
										className="justify-center text-center"
									>
										Clear filter
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
