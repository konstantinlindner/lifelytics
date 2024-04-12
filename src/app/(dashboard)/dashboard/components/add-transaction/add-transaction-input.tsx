'use client'

import { useEffect, useState } from 'react'

import {
	FoodAndDrinkPlaceCategory,
	TransactionCategory,
} from '@/types/globals.types'

import {
	addTransaction,
	getTransactionCategoryIcon,
} from '@/store/store-helper'
import { useDatabase, useUser } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverClose } from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
	CheckIcon,
	ChevronsUpDownIcon,
	InfoIcon,
	UtensilsCrossedIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import DatePicker from '@/components/date-picker'

import { Screen } from './add-transaction-constants'

const FormSchema = z.object({
	category: z.coerce.number({
		required_error: 'Please select a category',
	}),
	transactionDate: z.date({
		required_error: 'A transaction date is required',
	}),
	item: z
		.string({
			required_error: 'Please specify what you purchased',
		})
		.trim(),
	counterpart: z.string({
		required_error: 'Please specify where you made the transaction',
	}),
	amount: z.coerce
		.number({
			required_error: 'Please specify the amount',
			invalid_type_error: 'Please specify the amount',
		})
		.positive(),
	tip: z.coerce.number().positive().optional(),
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
	description: z.string().trim().optional(),
	foodAndDrinkTransaction: z
		.object({
			placeCategoryId: z.coerce.number({
				invalid_type_error: 'Select a category',
			}),
			typeCategoryId: z.coerce.number({
				invalid_type_error: 'Select the type',
			}),
			eatInTakeAway: z.union([
				z.literal('eat-in'),
				z.literal('take-away'),
			]),
			isLeftovers: z.boolean(),
			isDelivery: z.boolean(),
			isWorked: z.boolean(),
		})
		.optional(),
	healthAndWellnessTransaction: z
		.object({
			categoryId: z.coerce.number({
				invalid_type_error: 'Select a category',
			}),
		})
		.optional(),
	homeTransaction: z
		.object({
			categoryId: z.coerce.number({
				invalid_type_error: 'Select a category',
			}),
			accommodationTransaction: z
				.object({
					typeId: z.coerce.number({
						invalid_type_error: 'Select the type',
					}),
					categoryId: z.coerce.number({
						invalid_type_error: 'Select a category',
					}),
				})
				.optional(),
		})
		.optional(),
	shoppingTransaction: z
		.object({
			categoryId: z.coerce.number({
				invalid_type_error: 'Select a category',
			}),
		})
		.optional(),
	transportationTransaction: z
		.object({
			categoryId: z.coerce.number({
				invalid_type_error: 'Select a category',
			}),
			flightTransaction: z
				.object({
					luggageCategoryId: z.coerce.number({
						invalid_type_error: 'Select a category',
					}),
					segments: z
						.array(
							z.object({
								order: z.coerce.number(),
								departureAirportId: z.coerce.number({
									invalid_type_error: 'Select an airport',
								}),
								arrivalAirportId: z.coerce.number({
									invalid_type_error: 'Select an airport',
								}),
								airlineId: z.coerce.number({
									invalid_type_error: 'Select an airline',
								}),
								classId: z.coerce.number({
									invalid_type_error: 'Select a class',
								}),
								seatCategoryId: z.coerce.number({
									invalid_type_error:
										'Select a seat category',
								}),
							}),
						)
						.min(1),
				})
				.optional(),
			carTransaction: z
				.object({
					categoryId: z.coerce.number({
						invalid_type_error: 'Select a category',
					}),
				})
				.optional(),
		})
		.optional(),
})

type AddTransactionInputProps = {
	screen: Screen
}

export default function AddTransactionInput({
	screen,
}: AddTransactionInputProps) {
	const defaultCurrency = useUser((state) => state.primaryCurrency)
	const cities = useDatabase((state) => state.cities)
	const currencies = useDatabase((state) => state.currencies)
	const paymentMethods = useUser((state) => state.paymentMethods)
	const transactionCategories = useDatabase(
		(state) => state.transactionCategories,
	)
	const foodAndDrinkPlaceCategories = useDatabase(
		(state) => state.foodAndDrinkPlaceCategories,
	)
	const foodAndDrinkTypeCategories = useDatabase(
		(state) => state.foodAndDrinkTypeCategories,
	)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			transactionDate: new Date(),
			category: screen.transactionCategoryId!,
			currency: defaultCurrency?.id,
			foodAndDrinkTransaction: {
				eatInTakeAway: 'eat-in',
				isLeftovers: false,
				isDelivery: false,
				isWorked: false,
			},
		},
	})

	const currentCategoryId = form.watch('category')
	const currentFoodAndDrinkPlaceCategoryId = form.watch(
		'foodAndDrinkTransaction.placeCategoryId',
	)
	const currentEatInTakeAway = form.watch(
		'foodAndDrinkTransaction.eatInTakeAway',
	)

	const [currentCategory, setCurrentCategory] = useState<
		TransactionCategory | undefined
	>(
		transactionCategories?.find(
			(category) => category.id === currentCategoryId,
		),
	)
	const [
		currentFoodAndDrinkPlaceCategory,
		setCurrentFoodAndDrinkPlaceCategory,
	] = useState<FoodAndDrinkPlaceCategory | undefined>(
		foodAndDrinkPlaceCategories?.find(
			(category) => category.id === currentFoodAndDrinkPlaceCategoryId,
		),
	)

	useEffect(() => {
		setCurrentCategory(
			transactionCategories?.find(
				(category) => category.id === currentCategoryId,
			),
		)
	}, [currentCategoryId, transactionCategories])
	useEffect(() => {
		setCurrentFoodAndDrinkPlaceCategory(
			foodAndDrinkPlaceCategories?.find(
				(category) =>
					category.id === currentFoodAndDrinkPlaceCategoryId,
			),
		)
	}, [currentFoodAndDrinkPlaceCategoryId, foodAndDrinkPlaceCategories])

	// register and unregister fields
	useEffect(() => {
		if (currentCategory?.name === 'Food and drink') {
			form.register('foodAndDrinkTransaction')
		} else {
			form.unregister('foodAndDrinkTransaction')
		}

		if (currentCategory?.name === 'Health and wellness') {
			form.register('healthAndWellnessTransaction')
		} else {
			form.unregister('healthAndWellnessTransaction')
		}

		if (currentCategory?.name === 'Home') {
			form.register('homeTransaction')
		} else {
			form.unregister('homeTransaction')
		}

		if (currentCategory?.name === 'Shopping') {
			form.register('shoppingTransaction')
		} else {
			form.unregister('shoppingTransaction')
		}

		if (currentCategory?.name === 'Transportation') {
			form.register('transportationTransaction')
		} else {
			form.unregister('transportationTransaction')
		}
	}, [form, currentCategory])

	// append and remove flight segments
	// const { append, remove, fields } = useFieldArray({
	// 	control: form.control,
	// 	name: 'transportationTransaction.flightTransaction.segments',
	// })

	function setTipAmount(tipPercentage: number) {
		const amount = form.watch('amount')

		if (!amount) {
			return
		}

		form.setValue('tip', amount * tipPercentage)
	}

	console.log(form.formState.errors)

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		toast(JSON.stringify(data))

		console.log(JSON.stringify(data))

		// const error = await addTransaction({
		// 	date: data.transactionDate,
		// 	item: data.item,
		// 	amount: data.amount,
		// 	tip: data.tip ?? 0,
		// 	counterpartName: data.counterpart,
		// 	currencyId: data.currency,
		// 	paymentMethodId: data.paymentMethod,
		// 	cityId: data.city,
		// 	categoryId: data.category,
		// 	description: data.description ?? null,
		// 	foodAndDrinkTransaction: data.foodAndDrinkTransaction,
		// 	healthAndWellnessTransaction: data.healthAndWellnessTransaction,
		// 	homeTransaction: data.homeTransaction,
		// 	shoppingTransaction: data.shoppingTransaction,
		// 	transportationTransaction: data.transportationTransaction,
		// })

		// if (error) {
		// 	toast(error.message)
		// 	return
		// }

		// toast('Transaction added successfully')
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full max-w-xl flex-col gap-7"
			>
				<div className="space-y-5">
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
													'w-[290px] justify-between',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												<div className="flex items-center gap-3">
													{getTransactionCategoryIcon(
														{
															transactionCategory:
																transactionCategories?.find(
																	(
																		category,
																	) =>
																		category.id ===
																		field.value,
																),
															className:
																'h-4 w-4',
														},
													)}
													{
														transactionCategories?.find(
															(category) =>
																category.id ===
																field.value,
														)?.name
													}
												</div>
												<ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[290px] p-0">
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
															className="p-0"
														>
															{/* move this styling to others too */}
															<PopoverClose className="flex h-full w-full px-2 py-1.5">
																<CheckIcon
																	className={cn(
																		'mr-2 h-4 w-4',
																		category.id ===
																			field.value
																			? 'opacity-100'
																			: 'opacity-0',
																	)}
																/>

																{getTransactionCategoryIcon(
																	{
																		transactionCategory:
																			category,
																		className:
																			'mr-2 h-4 w-4 text-muted-foreground',
																	},
																)}

																{category.name}
															</PopoverClose>
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

					{/* Food and drink */}
					{currentCategory?.name === 'Food and drink' && (
						<Card className="space-y-5 p-6">
							<div className="flex items-center gap-4">
								<UtensilsCrossedIcon className="h-6 w-6" />
								<h3>Food and drink</h3>
							</div>

							<FormField
								control={form.control}
								name="foodAndDrinkTransaction.placeCategoryId"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="max-w-fit">
											Place category
										</FormLabel>
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
															? foodAndDrinkPlaceCategories?.find(
																	(
																		category,
																	) =>
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
														{foodAndDrinkPlaceCategories?.map(
															(category) => (
																<CommandItem
																	value={
																		category.name
																	}
																	key={
																		category.id
																	}
																	onSelect={() => {
																		form.setValue(
																			'foodAndDrinkTransaction.placeCategoryId',
																			category.id ??
																				'',
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
																	{
																		category.name
																	}
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
								name="foodAndDrinkTransaction.typeCategoryId"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="max-w-fit">
											Food type
										</FormLabel>
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
															? foodAndDrinkTypeCategories?.find(
																	(
																		category,
																	) =>
																		category.id ===
																		field.value,
															  )?.name
															: 'Select type'}
														<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[200px] p-0">
												<Command>
													<CommandInput placeholder="Search type..." />
													<CommandEmpty>
														No type found.
													</CommandEmpty>
													<CommandGroup className="max-h-[20rem] overflow-y-auto">
														{foodAndDrinkTypeCategories?.map(
															(category) => (
																<CommandItem
																	value={
																		category.name
																	}
																	key={
																		category.id
																	}
																	onSelect={() => {
																		form.setValue(
																			'foodAndDrinkTransaction.typeCategoryId',
																			category.id ??
																				'',
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
																	{
																		category.name
																	}
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

							{currentFoodAndDrinkPlaceCategory?.hasOptions && (
								<>
									<FormField
										control={form.control}
										name="foodAndDrinkTransaction.eatInTakeAway"
										render={({ field }) => (
											<FormItem className="space-y-3 rounded-md border p-4">
												<FormControl>
													<RadioGroup
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value ??
															undefined
														}
														className="flex flex-col space-y-1"
													>
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="eat-in" />
															</FormControl>
															<FormLabel className="font-normal">
																Eat in
															</FormLabel>
														</FormItem>
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="take-away" />
															</FormControl>
															<FormLabel className="font-normal">
																Take-away
															</FormLabel>
														</FormItem>
													</RadioGroup>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="space-y-3 rounded-md border p-4">
										<FormField
											control={form.control}
											name="foodAndDrinkTransaction.isLeftovers"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center space-x-3 space-y-0">
													<FormControl>
														<Checkbox
															checked={Boolean(
																field.value,
															)}
															onCheckedChange={
																field.onChange
															}
														/>
													</FormControl>

													<FormLabel>
														Leftovers
													</FormLabel>

													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger
																type="button"
																className="cursor-default"
															>
																<InfoIcon className="h-4 w-4" />
															</TooltipTrigger>
															<TooltipContent>
																<p>
																	Did you have
																	enough
																	leftovers to
																	get an extra
																	meal out of
																	it?
																</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="foodAndDrinkTransaction.isDelivery"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center space-x-3 space-y-0">
													<FormControl>
														<Checkbox
															checked={Boolean(
																field.value,
															)}
															onCheckedChange={
																field.onChange
															}
														/>
													</FormControl>

													<FormLabel>
														Delivery
													</FormLabel>

													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger
																type="button"
																className="cursor-default"
															>
																<InfoIcon className="h-4 w-4" />
															</TooltipTrigger>
															<TooltipContent>
																<p>
																	Was this
																	ordered as
																	delivery?
																</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
													<FormMessage />
												</FormItem>
											)}
										/>

										{currentEatInTakeAway === 'eat-in' && (
											<FormField
												control={form.control}
												name="foodAndDrinkTransaction.isWorked"
												render={({ field }) => (
													<FormItem className="flex flex-row items-center space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																checked={Boolean(
																	field.value,
																)}
																onCheckedChange={
																	field.onChange
																}
															/>
														</FormControl>

														<FormLabel>
															Worked
														</FormLabel>

														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger
																	type="button"
																	className="cursor-default"
																>
																	<InfoIcon className="h-4 w-4" />
																</TooltipTrigger>
																<TooltipContent>
																	<p>
																		Did you
																		patronize
																		this
																		establishment
																		to work?
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
														<FormMessage />
													</FormItem>
												)}
											/>
										)}
									</div>
								</>
							)}
						</Card>
					)}

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
										className="w-[290px]"
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
										className="w-[290px]"
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
								<FormLabel className="max-w-fit">
									Currency
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[290px] justify-between',
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
									<PopoverContent className="w-[290px] p-0">
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
										placeholder="123.45"
										type="number"
										{...field}
										value={field.value}
										className="w-[150px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="tip"
						render={({ field }) => (
							<FormItem>
								<div className="space-x-2">
									<FormLabel>Tip amount</FormLabel>

									<Button
										onClick={() => {
											setTipAmount(0.1)
										}}
										type="button"
										variant="link"
										className="h-0 p-0"
									>
										10%
									</Button>
									<Button
										onClick={() => {
											setTipAmount(0.15)
										}}
										type="button"
										variant="link"
										className="h-0 p-0"
									>
										15%
									</Button>
									<Button
										onClick={() => {
											setTipAmount(0.18)
										}}
										type="button"
										variant="link"
										className="h-0 p-0"
									>
										18%
									</Button>
									<Button
										onClick={() => {
											setTipAmount(0.2)
										}}
										type="button"
										variant="link"
										className="h-0 p-0"
									>
										20%
									</Button>
									<Button
										onClick={() => {
											setTipAmount(0.22)
										}}
										type="button"
										variant="link"
										className="h-0 p-0"
									>
										22%
									</Button>
									<Button
										onClick={() => {
											setTipAmount(0.25)
										}}
										type="button"
										variant="link"
										className="h-0 p-0"
									>
										25%
									</Button>
									<Button
										onClick={() => {
											setTipAmount(0.3)
										}}
										type="button"
										variant="link"
										className="h-0 p-0"
									>
										30%
									</Button>
								</div>
								<FormControl>
									<Input
										placeholder="12.34"
										type="number"
										{...field}
										value={field.value}
										className="w-[150px]"
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
								<FormLabel className="max-w-fit">
									Payment method
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[290px] justify-between',
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
									<PopoverContent className="w-[290px] p-0">
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
								<FormLabel className="max-w-fit">
									Location
								</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[290px] justify-between',
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
									<PopoverContent className="w-[290px] p-0">
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
				</div>

				<Button type="submit" className="w-fit">
					Submit
				</Button>
			</form>
		</Form>
	)
}
