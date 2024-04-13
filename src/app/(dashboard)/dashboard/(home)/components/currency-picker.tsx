'use client'

import { useEffect, useState } from 'react'

import { useDatabase, useUser } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { PopoverClose } from '@radix-ui/react-popover'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

export default function CurrencyPicker() {
	const defaultCurrency = useUser((state) => state.primaryCurrency)
	const currencies = useDatabase((state) => state.currencies)

	const [selectedCurrency, setSelectedCurrency] = useState<
		string | undefined
	>(undefined)

	useEffect(() => {
		setSelectedCurrency(defaultCurrency?.id)
	}, [defaultCurrency])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className={cn(
						'w-[100px] justify-between',
						!selectedCurrency && 'text-muted-foreground',
					)}
				>
					{selectedCurrency
						? currencies?.find(
								(currency) => currency.id === selectedCurrency,
						  )?.code
						: 'Select'}
					<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search currency..." />
					<CommandEmpty>No currency found.</CommandEmpty>
					<CommandGroup className="max-h-[20rem] overflow-y-auto">
						{currencies?.map((currency) => (
							<CommandItem
								key={currency.id}
								value={currency.name}
								onSelect={() => {
									setSelectedCurrency(currency.id)
								}}
								className="p-0"
							>
								<PopoverClose className="flex h-full w-full px-2 py-1.5">
									<CheckIcon
										className={cn(
											'mr-2 h-4 w-4',
											currency.id === selectedCurrency
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
									{currency.name}
								</PopoverClose>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
