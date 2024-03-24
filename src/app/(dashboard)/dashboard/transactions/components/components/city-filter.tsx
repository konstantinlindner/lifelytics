import { useDatabase } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { Column } from '@tanstack/react-table'

import { CheckIcon, FilterIcon, FilterXIcon } from 'lucide-react'

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

interface CityFilterProps<TData, TValue> {
	column?: Column<TData, TValue>
}

export function CityFilter<TData, TValue>({
	column,
}: CityFilterProps<TData, TValue>) {
	const cities = useDatabase((state) => state.cities)

	const facets = column?.getFacetedUniqueValues()

	const selectedValues = new Set(column?.getFilterValue() as string[])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size="sm"
					variant="outline"
					className="h-8 border-dashed"
				>
					{selectedValues.size > 0 ? (
						<FilterXIcon className="mr-2 h-4 w-4" />
					) : (
						<FilterIcon className="mr-2 h-4 w-4" />
					)}
					City
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder="Search city..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{cities.map((option) => {
								const isSelected = selectedValues.has(
									option.englishName,
								)
								return (
									<CommandItem
										key={option.id}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(
													option.englishName,
												)
											} else {
												selectedValues.add(
													option.englishName,
												)
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
										<span>{option.englishName}</span>
										{facets?.get(option.englishName) && (
											<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
												{facets.get(option.englishName)}
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
