'use client'

import { useEffect, useState } from 'react'

import {
	FoodAndDrinkPlaceCategory,
	HomeCategory,
	TransactionCategory,
	TransportationCategory,
} from '@/types/globals.types'

import {
	addTransaction,
	getCityCountryStringFromCityId,
	getTransactionCategoryIcon,
} from '@/store/store-helper'
import { useDatabase, useUser } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverClose } from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { UseFormReturn, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
	CheckIcon,
	ChevronsUpDownIcon,
	InfoIcon,
	PlusIcon,
	XIcon,
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
					type: z.union([
						z.literal('rent'),
						z.literal('own'),
						z.literal('short-term'),
					]),
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
						invalid_type_error: 'Select a car category',
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

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			transactionDate: new Date(),
			category: screen.transactionCategoryId ?? 0,
			currency: defaultCurrency?.id,
			foodAndDrinkTransaction: {
				eatInTakeAway: 'eat-in',
				isLeftovers: false,
				isDelivery: false,
				isWorked: false,
			},
			homeTransaction: {
				accommodationTransaction: {
					type: 'rent',
				},
			},
		},
	})

	const selectedCategoryId = form.watch('category')

	const [selectedCategory, setSelectedCategory] = useState<
		TransactionCategory | undefined
	>(
		transactionCategories?.find(
			(category) => category.id === selectedCategoryId,
		),
	)

	useEffect(() => {
		setSelectedCategory(
			transactionCategories?.find(
				(category) => category.id === selectedCategoryId,
			),
		)
	}, [selectedCategoryId, transactionCategories])

	// register and unregister fields
	useEffect(() => {
		if (selectedCategory?.name === 'Food and drink') {
			form.register('foodAndDrinkTransaction')
		} else {
			form.unregister('foodAndDrinkTransaction')
		}

		if (selectedCategory?.name === 'Health and wellness') {
			form.register('healthAndWellnessTransaction')
		} else {
			form.unregister('healthAndWellnessTransaction')
		}

		if (selectedCategory?.name === 'Home') {
			form.register('homeTransaction')
		} else {
			form.unregister('homeTransaction')
		}

		if (selectedCategory?.name === 'Shopping') {
			form.register('shoppingTransaction')
		} else {
			form.unregister('shoppingTransaction')
		}

		if (selectedCategory?.name === 'Transportation') {
			form.register('transportationTransaction')
		} else {
			form.unregister('transportationTransaction')
		}
	}, [form, selectedCategory])

	function setTipAmount(tipPercentage: number) {
		const amount = form.watch('amount')

		if (!amount) {
			return
		}

		form.setValue('tip', amount * tipPercentage)
	}

	// todo remove console log
	// console.log(form.formState.errors)

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		toast(JSON.stringify(data))

		// todo remove console log
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

					{/* Custom fields that only show for some categories */}
					{selectedCategory &&
						[
							'Food and drink',
							'Health and wellness',
							'Home',
							'Shopping',
							'Transportation',
						].includes(selectedCategory.name) && (
							<Card className="space-y-5 p-6">
								<div className="flex items-center gap-4 pb-2">
									{getTransactionCategoryIcon({
										transactionCategory: selectedCategory,
									})}

									<h3>{selectedCategory.name}</h3>
								</div>

								{/* Food and drink */}
								{selectedCategory.name === 'Food and drink' && (
									<FoodAndDrinkCategoryFormFields
										form={form}
									/>
								)}

								{/* Health and wellness */}
								{selectedCategory.name ===
									'Health and wellness' && (
									<HealthAndWellnessCategoryFormFields
										form={form}
									/>
								)}

								{/* Home */}
								{selectedCategory.name === 'Home' && (
									<HomeCategoryFormFields form={form} />
								)}

								{/* Shopping */}
								{selectedCategory.name === 'Shopping' && (
									<ShoppingCategoryFormFields form={form} />
								)}

								{/* Transportation */}
								{selectedCategory.name === 'Transportation' && (
									<TransportationCategoryFormFields
										form={form}
									/>
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
													'w-[100px] justify-between',
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
									<PopoverContent
										align="start"
										className="w-[200px] p-0"
									>
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
														className="p-0"
													>
														<PopoverClose className="flex h-full w-full px-2 py-1.5">
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
														</PopoverClose>
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
															className="p-0"
														>
															<PopoverClose className="flex h-full w-full px-2 py-1.5">
																<CheckIcon
																	className={cn(
																		'mr-2 h-4 w-4',
																		paymentMethod.id ===
																			field.value
																			? 'opacity-100'
																			: 'opacity-0',
																	)}
																/>
																{
																	paymentMethod.name
																}
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
													? getCityCountryStringFromCityId(
															field.value,
													  )
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
														className="p-0"
													>
														<PopoverClose className="flex h-full w-full px-2 py-1.5">
															<CheckIcon
																className={cn(
																	'mr-2 h-4 w-4',
																	city.id ===
																		field.value
																		? 'opacity-100'
																		: 'opacity-0',
																)}
															/>
															{getCityCountryStringFromCityId(
																city.id,
															)}
														</PopoverClose>
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

type CategoryFormFieldsProps = {
	form: UseFormReturn<z.infer<typeof FormSchema>>
}

function FoodAndDrinkCategoryFormFields({ form }: CategoryFormFieldsProps) {
	const foodAndDrinkPlaceCategories = useDatabase(
		(state) => state.foodAndDrinkPlaceCategories,
	)
	const foodAndDrinkTypeCategories = useDatabase(
		(state) => state.foodAndDrinkTypeCategories,
	)

	const selectedEatInTakeAway = form.watch(
		'foodAndDrinkTransaction.eatInTakeAway',
	)

	const selectedFoodAndDrinkPlaceCategoryId = form.watch(
		'foodAndDrinkTransaction.placeCategoryId',
	)

	const [
		selectedFoodAndDrinkPlaceCategory,
		setSelectedFoodAndDrinkPlaceCategory,
	] = useState<FoodAndDrinkPlaceCategory | undefined>(
		foodAndDrinkPlaceCategories?.find(
			(category) => category.id === selectedFoodAndDrinkPlaceCategoryId,
		),
	)

	useEffect(() => {
		setSelectedFoodAndDrinkPlaceCategory(
			foodAndDrinkPlaceCategories?.find(
				(category) =>
					category.id === selectedFoodAndDrinkPlaceCategoryId,
			),
		)
	}, [selectedFoodAndDrinkPlaceCategoryId, foodAndDrinkPlaceCategories])

	return (
		<>
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
										{foodAndDrinkPlaceCategories?.map(
											(category) => (
												<CommandItem
													value={category.name}
													key={category.id}
													onSelect={() => {
														form.setValue(
															'foodAndDrinkTransaction.placeCategoryId',
															category.id ?? '',
														)
													}}
													className="p-0"
												>
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

			<FormField
				control={form.control}
				name="foodAndDrinkTransaction.typeCategoryId"
				render={({ field }) => (
					<FormItem className="flex flex-col">
						<FormLabel className="max-w-fit">Food type</FormLabel>
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
													(category) =>
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
									<CommandEmpty>No type found.</CommandEmpty>
									<CommandGroup className="max-h-[20rem] overflow-y-auto">
										{foodAndDrinkTypeCategories?.map(
											(category) => (
												<CommandItem
													value={category.name}
													key={category.id}
													onSelect={() => {
														form.setValue(
															'foodAndDrinkTransaction.typeCategoryId',
															category.id ?? '',
														)
													}}
													className="p-0"
												>
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

			{selectedFoodAndDrinkPlaceCategory?.hasOptions && (
				<>
					<FormField
						control={form.control}
						name="foodAndDrinkTransaction.eatInTakeAway"
						render={({ field }) => (
							<FormItem className="space-y-3 rounded-md border p-4">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value ?? undefined}
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
											checked={Boolean(field.value)}
											onCheckedChange={field.onChange}
										/>
									</FormControl>

									<FormLabel>Leftovers</FormLabel>

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
													Did you have enough
													leftovers to get an extra
													meal out of it?
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
											checked={Boolean(field.value)}
											onCheckedChange={field.onChange}
										/>
									</FormControl>

									<FormLabel>Delivery</FormLabel>

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
													Was this ordered as
													delivery?
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
									<FormMessage />
								</FormItem>
							)}
						/>

						{selectedEatInTakeAway === 'eat-in' && (
							<FormField
								control={form.control}
								name="foodAndDrinkTransaction.isWorked"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center space-x-3 space-y-0">
										<FormControl>
											<Checkbox
												checked={Boolean(field.value)}
												onCheckedChange={field.onChange}
											/>
										</FormControl>

										<FormLabel>Worked</FormLabel>

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
														Did you patronize this
														establishment to work?
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
		</>
	)
}

function HealthAndWellnessCategoryFormFields({
	form,
}: CategoryFormFieldsProps) {
	const healthAndWellnessCategories = useDatabase(
		(state) => state.healthAndWellnessCategories,
	)
	return (
		<FormField
			control={form.control}
			name="healthAndWellnessTransaction.categoryId"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel className="max-w-fit">Category</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										'w-[200px] justify-between',
										!field.value && 'text-muted-foreground',
									)}
								>
									{field.value
										? healthAndWellnessCategories?.find(
												(category) =>
													category.id === field.value,
										  )?.name
										: 'Select category'}
									<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput placeholder="Search category..." />
								<CommandEmpty>No category found.</CommandEmpty>
								<CommandGroup className="max-h-[20rem] overflow-y-auto">
									{healthAndWellnessCategories?.map(
										(category) => (
											<CommandItem
												value={category.name}
												key={category.id}
												onSelect={() => {
													form.setValue(
														'healthAndWellnessTransaction.categoryId',
														category.id ?? '',
													)
												}}
												className="p-0"
											>
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
	)
}

function HomeCategoryFormFields({ form }: CategoryFormFieldsProps) {
	const homeCategories = useDatabase((state) => state.homeCategories)
	const accommodationCategories = useDatabase(
		(state) => state.accommodationCategories,
	)

	const selectedAccommodationType = form.watch(
		'homeTransaction.accommodationTransaction.type',
	)

	const selectedHomeCategoryId = form.watch('homeTransaction.categoryId')

	const [selectedHomeCategory, setSelectedHomeCategory] = useState<
		HomeCategory | undefined
	>(
		homeCategories?.find(
			(category) => category.id === selectedHomeCategoryId,
		),
	)

	useEffect(() => {
		setSelectedHomeCategory(
			homeCategories?.find(
				(category) => category.id === selectedHomeCategoryId,
			),
		)
	}, [selectedHomeCategoryId, homeCategories])

	useEffect(() => {
		if (selectedHomeCategory?.name === 'Accommodation') {
			form.register('homeTransaction.accommodationTransaction')
		} else {
			form.unregister('homeTransaction.accommodationTransaction')
		}
	}, [form, selectedHomeCategory])

	return (
		<>
			<FormField
				control={form.control}
				name="homeTransaction.categoryId"
				render={({ field }) => (
					<FormItem className="flex flex-col">
						<FormLabel className="max-w-fit">Category</FormLabel>
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
											? homeCategories?.find(
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
										{homeCategories?.map((category) => (
											<CommandItem
												value={category.name}
												key={category.id}
												onSelect={() => {
													form.setValue(
														'homeTransaction.categoryId',
														category.id ?? '',
													)
												}}
												className="p-0"
											>
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
													{category.name}
												</PopoverClose>
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

			{selectedHomeCategory?.name === 'Accommodation' && (
				<>
					<FormField
						control={form.control}
						name="homeTransaction.accommodationTransaction.type"
						render={({ field }) => (
							<FormItem className="space-y-3 rounded-md border p-4">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value ?? undefined}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="rent" />
											</FormControl>
											<FormLabel className="font-normal">
												Rent
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="own" />
											</FormControl>
											<FormLabel className="font-normal">
												Own
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="short-term" />
											</FormControl>
											<FormLabel className="font-normal">
												Short term
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="homeTransaction.accommodationTransaction.categoryId"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="max-w-fit">
									Accommodation category
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
													? accommodationCategories?.find(
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
												{accommodationCategories
													?.filter(
														(category) =>
															category.type ===
															selectedAccommodationType,
													)
													.map((category) => (
														<CommandItem
															value={
																category.name
															}
															key={category.id}
															onSelect={() => {
																form.setValue(
																	'homeTransaction.accommodationTransaction.categoryId',
																	category.id ??
																		'',
																)
															}}
															className="p-0"
														>
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
																{category.name}
															</PopoverClose>
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
				</>
			)}
		</>
	)
}

function ShoppingCategoryFormFields({ form }: CategoryFormFieldsProps) {
	const shoppingCategories = useDatabase((state) => state.shoppingCategories)

	return (
		<FormField
			control={form.control}
			name="shoppingTransaction.categoryId"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel className="max-w-fit">Category</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										'w-[200px] justify-between',
										!field.value && 'text-muted-foreground',
									)}
								>
									{field.value
										? shoppingCategories?.find(
												(category) =>
													category.id === field.value,
										  )?.name
										: 'Select category'}
									<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput placeholder="Search category..." />
								<CommandEmpty>No category found.</CommandEmpty>
								<CommandGroup className="max-h-[20rem] overflow-y-auto">
									{shoppingCategories?.map((category) => (
										<CommandItem
											value={category.name}
											key={category.id}
											onSelect={() => {
												form.setValue(
													'shoppingTransaction.categoryId',
													category.id ?? '',
												)
											}}
											className="p-0"
										>
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
												{category.name}
											</PopoverClose>
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
	)
}

function TransportationCategoryFormFields({ form }: CategoryFormFieldsProps) {
	const transportationCategories = useDatabase(
		(state) => state.transportationCategories,
	)
	const flightLuggageCategories = useDatabase(
		(state) => state.flightLuggageCategories,
	)
	const airports = useDatabase((state) => state.airports)
	const flightClasses = useDatabase((state) => state.flightClasses)
	const flightSeatCategories = useDatabase(
		(state) => state.flightSeatCategories,
	)
	const carCategories = useDatabase((state) => state.carCategories)

	const selectedTransportationCategoryId = form.watch(
		'transportationTransaction.categoryId',
	)

	const [selectedTransportationCategory, setSelectedTransportationCategory] =
		useState<TransportationCategory | undefined>(
			transportationCategories?.find(
				(category) => category.id === selectedTransportationCategoryId,
			),
		)

	useEffect(() => {
		setSelectedTransportationCategory(
			transportationCategories?.find(
				(category) => category.id === selectedTransportationCategoryId,
			),
		)
	}, [selectedTransportationCategoryId, transportationCategories])

	useEffect(() => {
		if (selectedTransportationCategory?.name === 'Flight') {
			form.register('transportationTransaction.flightTransaction')
		} else {
			form.unregister('transportationTransaction.flightTransaction')
		}

		if (selectedTransportationCategory?.name === 'Car') {
			form.register('transportationTransaction.carTransaction')
		} else {
			form.unregister('transportationTransaction.carTransaction')
		}
	}, [form, selectedTransportationCategory])

	const { append, remove, fields } = useFieldArray({
		control: form.control,
		name: 'transportationTransaction.flightTransaction.segments',
	})

	return (
		<>
			<FormField
				control={form.control}
				name="transportationTransaction.categoryId"
				render={({ field }) => (
					<FormItem className="flex flex-col">
						<FormLabel className="max-w-fit">Category</FormLabel>
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
											? transportationCategories?.find(
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
										{transportationCategories?.map(
											(category) => (
												<CommandItem
													value={category.name}
													key={category.id}
													onSelect={() => {
														form.setValue(
															'transportationTransaction.categoryId',
															category.id ?? '',
														)
													}}
													className="p-0"
												>
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

			{selectedTransportationCategory?.name === 'Flight' && (
				<>
					<FormField
						control={form.control}
						name="transportationTransaction.flightTransaction.luggageCategoryId"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel className="max-w-fit">
									Luggage category
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
													? flightLuggageCategories?.find(
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
												{flightLuggageCategories?.map(
													(category) => (
														<CommandItem
															value={
																category.name
															}
															key={category.id}
															onSelect={() => {
																form.setValue(
																	'transportationTransaction.flightTransaction.luggageCategoryId',
																	category.id ??
																		'',
																)
															}}
															className="p-0"
														>
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

					{/* segments */}

					{fields.map((segment, index) => (
						<div
							key={segment.id}
							className="space-y-3 rounded-md border p-4"
						>
							<div className="flex justify-between">
								<h4>Flight segment {index + 1}</h4>

								{index > 0 && (
									<button
										type="button"
										onClick={() => remove(index)}
										className="h-4 w-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									>
										<XIcon className="h-4 w-4" />
										<span className="sr-only">
											Remove segment
										</span>
									</button>
								)}
							</div>

							<FormField
								control={form.control}
								name={`transportationTransaction.flightTransaction.segments.${index}.departureAirportId`}
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="max-w-fit">
											Departure airport
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-[350px] justify-between',
															!field.value &&
																'text-muted-foreground',
														)}
													>
														{field.value
															? airports?.find(
																	(airport) =>
																		airport.id ===
																		field.value,
															  )?.name
															: 'Select airport'}
														<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[350px] p-0">
												<Command>
													<CommandInput placeholder="Search airport..." />
													<CommandEmpty>
														No airport found.
													</CommandEmpty>
													<CommandGroup className="max-h-[20rem] overflow-y-auto">
														{airports?.map(
															(airport) => (
																<CommandItem
																	value={
																		airport.name
																	}
																	key={
																		airport.id
																	}
																	onSelect={() => {
																		form.setValue(
																			`transportationTransaction.flightTransaction.segments.${index}.departureAirportId`,
																			airport.id ??
																				'',
																		)
																	}}
																	className="p-0"
																>
																	<PopoverClose className="flex h-full w-full px-2 py-1.5">
																		<CheckIcon
																			className={cn(
																				'mr-2 h-4 w-4',
																				airport.id ===
																					field.value
																					? 'opacity-100'
																					: 'opacity-0',
																			)}
																		/>
																		{
																			airport.name
																		}
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

							<FormField
								control={form.control}
								name={`transportationTransaction.flightTransaction.segments.${index}.arrivalAirportId`}
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="max-w-fit">
											Arrival airport
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-[350px] justify-between',
															!field.value &&
																'text-muted-foreground',
														)}
													>
														{field.value
															? airports?.find(
																	(airport) =>
																		airport.id ===
																		field.value,
															  )?.name
															: 'Select airport'}
														<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[350px] p-0">
												<Command>
													<CommandInput placeholder="Search airport..." />
													<CommandEmpty>
														No airport found.
													</CommandEmpty>
													<CommandGroup className="max-h-[20rem] overflow-y-auto">
														{airports?.map(
															(airport) => (
																<CommandItem
																	value={
																		airport.name
																	}
																	key={
																		airport.id
																	}
																	onSelect={() => {
																		form.setValue(
																			`transportationTransaction.flightTransaction.segments.${index}.arrivalAirportId`,
																			airport.id ??
																				'',
																		)
																	}}
																	className="p-0"
																>
																	<PopoverClose className="flex h-full w-full px-2 py-1.5">
																		<CheckIcon
																			className={cn(
																				'mr-2 h-4 w-4',
																				airport.id ===
																					field.value
																					? 'opacity-100'
																					: 'opacity-0',
																			)}
																		/>
																		{
																			airport.name
																		}
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

							<FormField
								control={form.control}
								name={`transportationTransaction.flightTransaction.segments.${index}.classId`}
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="max-w-fit">
											Flight class
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
															? flightClasses?.find(
																	(
																		flightClass,
																	) =>
																		flightClass.id ===
																		field.value,
															  )?.name
															: 'Select class'}
														<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[200px] p-0">
												<Command>
													<CommandInput placeholder="Search class..." />
													<CommandEmpty>
														No class found.
													</CommandEmpty>
													<CommandGroup className="max-h-[20rem] overflow-y-auto">
														{flightClasses?.map(
															(flightClass) => (
																<CommandItem
																	value={
																		flightClass.name
																	}
																	key={
																		flightClass.id
																	}
																	onSelect={() => {
																		form.setValue(
																			`transportationTransaction.flightTransaction.segments.${index}.classId`,
																			flightClass.id ??
																				'',
																		)
																	}}
																	className="p-0"
																>
																	<PopoverClose className="flex h-full w-full px-2 py-1.5">
																		<CheckIcon
																			className={cn(
																				'mr-2 h-4 w-4',
																				flightClass.id ===
																					field.value
																					? 'opacity-100'
																					: 'opacity-0',
																			)}
																		/>
																		{
																			flightClass.name
																		}
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

							<FormField
								control={form.control}
								name={`transportationTransaction.flightTransaction.segments.${index}.seatCategoryId`}
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="max-w-fit">
											Flight seat style
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
															? flightSeatCategories?.find(
																	(
																		category,
																	) =>
																		category.id ===
																		field.value,
															  )?.name
															: 'Select style'}
														<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[200px] p-0">
												<Command>
													<CommandInput placeholder="Search style..." />
													<CommandEmpty>
														No style found.
													</CommandEmpty>
													<CommandGroup className="max-h-[20rem] overflow-y-auto">
														{flightSeatCategories?.map(
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
																			`transportationTransaction.flightTransaction.segments.${index}.seatCategoryId`,
																			category.id ??
																				'',
																		)
																	}}
																	className="p-0"
																>
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
																		{
																			category.name
																		}
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
						</div>
					))}

					<Button
						size="sm"
						variant="outline"
						type="button"
						onClick={() =>
							append({
								order: fields.length + 1,
								departureAirportId: 0,
								arrivalAirportId: 0,
								airlineId: 0,
								classId: 0,
								seatCategoryId: 0,
							})
						}
						className="h-8"
					>
						<PlusIcon className="mr-2 h-5 w-5" />
						Add segment
					</Button>
				</>
			)}

			{/* car transaction */}

			{selectedTransportationCategory?.name === 'Car' && (
				<FormField
					control={form.control}
					name="transportationTransaction.carTransaction.categoryId"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="max-w-fit">
								Car category
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
												? carCategories?.find(
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
											{carCategories?.map((category) => (
												<CommandItem
													value={category.name}
													key={category.id}
													onSelect={() => {
														form.setValue(
															'transportationTransaction.carTransaction.categoryId',
															category.id ?? '',
														)
													}}
													className="p-0"
												>
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
														{category.name}
													</PopoverClose>
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
			)}
		</>
	)
}
