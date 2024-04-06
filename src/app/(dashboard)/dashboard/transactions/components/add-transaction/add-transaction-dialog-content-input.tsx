'use client'

import { addTransaction } from '@/store/store-helper'
import { useDatabase, useUser } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

import DatePicker from '@/components/date-picker'

import { Screen } from './add-transaction-constants'

const FormSchema = z.object({
	category: z.coerce.number({
		required_error: 'Please select a category',
	}),
	transactionDate: z.date({
		required_error: 'A transaction date is required',
	}),
	item: z.string({
		required_error: 'Please specify what you purchased',
	}),
	counterpart: z.string({
		required_error: 'Please specify where you made the transaction',
	}),
	amount: z.coerce
		.number({
			required_error: 'Please specify the amount',
			invalid_type_error: 'Please specify the amount',
		})
		.positive(),
	currency: z.string({
		required_error: 'Please select a currency',
	}),
	paymentMethod: z.string({
		required_error: 'Please select a payment method',
	}),
	city: z.coerce.number({
		required_error: 'Please select a city',
		invalid_type_error: 'Please select a city',
	}),
	description: z.string().optional(),
})

type AddTransactionDialogContentInputsProps = {
	screen: Screen
}

export default function AddTransactionDialogContentInput({
	screen,
}: AddTransactionDialogContentInputsProps) {
	const defaultCurrency = useUser((state) => state.primaryCurrency)

	const cities = useDatabase((state) => state.cities)
	const currencies = useDatabase((state) => state.currencies)
	const transactionCategories = useDatabase(
		(state) => state.transactionCategories,
	)
	const paymentMethods = useUser((state) => state.paymentMethods)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			transactionDate: new Date(),
			category: screen.transactionCategoryId ?? undefined,
			currency: defaultCurrency?.id,
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const category = transactionCategories?.find(
			(category) => category.id === data.category,
		)

		const currency = currencies?.find(
			(currency) => currency.id === data.currency,
		)

		const city = cities?.find((city) => city.id === data.city)

		const paymentMethod = paymentMethods?.find(
			(paymentMethod) => paymentMethod.id === data.paymentMethod,
		)

		if (!category) {
			toast('Error applying transaction category')
			return
		}

		if (!currency) {
			toast('Error applying transaction currency')
			return
		}

		if (!city) {
			toast('Error applying transaction city')
			return
		}

		if (!paymentMethod) {
			toast('Error applying payment method')
			return
		}

		const error = await addTransaction({
			date: data.transactionDate,
			item: data.item,
			amount: data.amount,
			counterpartName: data.counterpart,
			currency: currency,
			paymentMethod: paymentMethod,
			city: city,
			category: category,
			description: data.description ?? null,
		})

		if (error) {
			toast(error.message)
			return
		}

		toast('Transaction added successfully')
	}

	return (
		<main>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-5"
				>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Category</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[200px] justify-between',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												{field.value
													? transactionCategories?.find(
															(category) =>
																category.id ===
																field.value,
													  )?.name
													: 'Select category'}
												<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput placeholder="Search category..." />
											<CommandEmpty>
												No category found.
											</CommandEmpty>
											<CommandGroup className="max-h-[20rem] overflow-y-auto">
												{transactionCategories?.map(
													(category) => (
														<CommandItem
															value={
																category.name
															}
															key={category.id}
															onSelect={() => {
																form.setValue(
																	'category',
																	category.id,
																)
															}}
														>
															<CheckIcon
																className={cn(
																	'mr-2 h-4 w-4',
																	category.id ===
																		field.value
																		? 'opacity-100'
																		: 'opacity-0',
																)}
															/>
															{category.name}
														</CommandItem>
													),
												)}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="transactionDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date</FormLabel>
								<DatePicker
									initialDate={new Date()}
									fromYear={1900}
									toYear={dayjs().year()}
									handleDateChange={(date) => {
										field.onChange(date)
									}}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="item"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Item</FormLabel>
								<FormControl>
									<Input
										placeholder="iPhone case"
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* TODO add autocomplete and suggestions */}
					<FormField
						control={form.control}
						name="counterpart"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Counterpart</FormLabel>
								<FormControl>
									<Input
										placeholder="The Apple Store"
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="currency"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Currency</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[200px] justify-between',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												{field.value
													? currencies?.find(
															(currency) =>
																currency.id ===
																field.value,
													  )?.code
													: 'Select currency'}
												<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput placeholder="Search currency..." />
											<CommandEmpty>
												No currency found.
											</CommandEmpty>
											<CommandGroup className="max-h-[20rem] overflow-y-auto">
												{currencies?.map((currency) => (
													<CommandItem
														value={currency.name}
														key={currency.id}
														onSelect={() => {
															form.setValue(
																'currency',
																currency.id ??
																	'',
															)
														}}
													>
														<CheckIcon
															className={cn(
																'mr-2 h-4 w-4',
																currency.id ===
																	field.value
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
														{currency.name}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input
										placeholder="999"
										type="number"
										{...field}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="paymentMethod"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Payment method</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[200px] justify-between',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												{field.value
													? paymentMethods?.find(
															(paymentMethod) =>
																paymentMethod.id ===
																field.value,
													  )?.name
													: 'Select one'}
												<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput placeholder="Search..." />
											<CommandEmpty>
												No payment method found.
											</CommandEmpty>
											<CommandGroup className="max-h-[20rem] overflow-y-auto">
												{paymentMethods?.map(
													(paymentMethod) => (
														<CommandItem
															key={
																paymentMethod.id
															}
															value={
																paymentMethod.name ??
																''
															}
															onSelect={() => {
																form.setValue(
																	'paymentMethod',
																	paymentMethod.id ??
																		'',
																)
															}}
														>
															<CheckIcon
																className={cn(
																	'mr-2 h-4 w-4',
																	paymentMethod.id ===
																		field.value
																		? 'opacity-100'
																		: 'opacity-0',
																)}
															/>
															{paymentMethod.name}
														</CommandItem>
													),
												)}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Location</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[200px] justify-between',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												{field.value
													? cities?.find(
															(city) =>
																city.id ===
																field.value,
													  )?.name
													: 'Select city'}
												<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput placeholder="Search city..." />
											<CommandEmpty>
												No city found.
											</CommandEmpty>
											<CommandGroup className="max-h-[20rem] overflow-y-auto">
												{cities?.map((city) => (
													<CommandItem
														value={city.name ?? ''}
														key={city.id}
														onSelect={() => {
															form.setValue(
																'city',
																city.id,
															)
														}}
													>
														<CheckIcon
															className={cn(
																'mr-2 h-4 w-4',
																city.id ===
																	field.value
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
														{city.name}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter anything you like"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</main>
	)
}
