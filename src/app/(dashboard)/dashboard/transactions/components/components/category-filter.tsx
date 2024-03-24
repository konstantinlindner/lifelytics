import { TransactionCategory } from '@/types/globals.types'

import { cn } from '@/lib/utils'

import { getTransactionCategoryIcon } from '@/store/store-helper'
import { useDatabase } from '@/store/useStore'
import { Column } from '@tanstack/react-table'

import { CheckIcon, FilterIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

interface CategoryFilterProps<TData, TValue> {
	column?: Column<TData, TValue>
}

export function CategoryFilter<TData, TValue>({
	column,
}: CategoryFilterProps<TData, TValue>) {
	const transactionCategories = useDatabase(
		(state) => state.transactionCategories,
	)

	const facets = column?.getFacetedUniqueValues()
	const selectedValues = new Set(column?.getFilterValue() as string[])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 border-dashed"
				>
					<FilterIcon className="mr-2 h-4 w-4" />
					Category
					{selectedValues?.size > 0 && (
						<>
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 2 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedValues.size} selected
									</Badge>
								) : (
									transactionCategories
										.filter((option) =>
											selectedValues.has(option.name),
										)
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.id}
												className="rounded-sm px-1 font-normal"
											>
												{option.name}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder="Search category..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{transactionCategories.map((option) => {
								const isSelected = selectedValues.has(
									option.name,
								)
								return (
									<CommandItem
										key={option.id}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(
													option.name,
												)
											} else {
												selectedValues.add(option.name)
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
										{getTransactionCategoryIcon({
											transactionCategory: option,
											className:
												'mr-2 h-4 w-4 text-muted-foreground',
										})}
										<span>{option.name}</span>
										{facets?.get(option.name) && (
											<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
												{facets.get(option.name)}
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
										Clear filters
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
