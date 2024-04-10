'use client'

import { useEffect, useState } from 'react'

import {
	FoodAndDrinkPlaceCategory,
	TransactionCategory,
} from '@/types/globals.types'

import { addTransaction } from '@/store/store-helper'
import { useDatabase, useUser } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { CheckIcon, ChevronsUpDownIcon, InfoIcon } from 'lucide-react'

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
			placeCategoryId: z.coerce.number(),
			typeCategoryId: z.coerce.number(),
			eatInTakeAway: z
				.union([z.literal('eat-in'), z.literal('take-away')])
				.nullable(),
			isLeftovers: z.boolean().nullable(),
			isDelivery: z.boolean().nullable(),
			isWorked: z.boolean().nullable(),
		})
		.optional(),
	healthAndWellnessTransaction: z
		.object({
			categoryId: z.coerce.number(),
		})
		.optional(),
	homeTransaction: z
		.object({
			categoryId: z.coerce.number(),
			accommodationTransaction: z
				.object({
					typeId: z.coerce.number(),
					categoryId: z.coerce.number(),
				})
				.optional(),
		})
		.optional(),
	shoppingTransaction: z
		.object({
			categoryId: z.coerce.number(),
		})
		.optional(),
	transportationTransaction: z
		.object({
			categoryId: z.coerce.number(),
			flightTransaction: z
				.object({
					luggageCategoryId: z.coerce.number(),
					segments: z.array(
						z.object({
							order: z.coerce.number(),
							departureAirportId: z.coerce.number(),
							arrivalAirportId: z.coerce.number(),
							airlineId: z.coerce.number(),
							classId: z.coerce.number(),
							seatCategoryId: z.coerce.number(),
						}),
					),
				})
				.optional(),
			carTransaction: z
				.object({
					categoryId: z.coerce.number(),
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
			category: screen.transactionCategoryId ?? undefined,
			currency: defaultCurrency?.id,
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

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const error = await addTransaction({
			date: data.transactionDate,
			item: data.item,
			amount: data.amount,
			counterpartName: data.counterpart,
			currencyId: data.currency,
			paymentMethodId: data.paymentMethod,
			cityId: data.city,
			categoryId: data.category,
			description: data.description ?? null,
			foodAndDrinkTransaction: data.foodAndDrinkTransaction,
			healthAndWellnessTransaction: data.healthAndWellnessTransaction,
			homeTransaction: data.homeTransaction,
			shoppingTransaction: data.shoppingTransaction,
			transportationTransaction: data.transportationTransaction,
		})

		if (error) {
			toast(error.message)
			return
		}

		toast('Transaction added successfully')
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

					{currentCategory?.name === 'Food and drink' && (
						<Card className="space-y-5 p-6">
							<h3>Food and drink</h3>

							<FormField
								control={form.control}
								name="foodAndDrinkTransaction.placeCategoryId"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Place category</FormLabel>
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
										<FormLabel>Food type</FormLabel>
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
															<TooltipTrigger type="button">
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
															<TooltipTrigger type="button">
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
																<TooltipTrigger type="button">
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
										placeholder="123.45"
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
				</div>

				<Button type="submit" className="w-fit">
					Submit
				</Button>
			</form>
		</Form>
	)
}
