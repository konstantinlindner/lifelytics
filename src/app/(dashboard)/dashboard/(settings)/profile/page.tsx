'use client'

import { useState } from 'react'

import {
	setBirthDate,
	setFirstName,
	setLastName,
	setLocation,
	setPrimaryCurrency,
	setWebsite,
	updateEmail,
} from '@/store/store-helper'
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

import DatePicker from '@/components/date-picker'
import LoadingIndicator from '@/components/loading-indicator'
import ProfilePictureUpload from '@/components/profile-picture-picker'

const formSchema = z.object({
	firstName: z
		.string({
			required_error: 'First name is required',
		})
		.trim()
		.min(2, {
			message: 'First name should be at least 2 characters long',
		}),
	lastName: z
		.string({
			required_error: 'Last name is required',
		})
		.trim()
		.min(2, {
			message: 'Last name should be at least 2 characters long',
		}),
	email: z
		.string({
			required_error: 'Email is required',
		})
		.email(),
	birthDate: z.date().optional(),
	website: z.string().trim().optional(),
	currency: z.string({
		required_error: 'Please select a currency',
	}),
	city: z.coerce.number({
		required_error: 'Please select a city',
	}),
})

export default function Profile() {
	const [isLoading, setIsLoading] = useState(false)

	const currencies = useDatabase((state) => state.currencies)
	const cities = useDatabase((state) => state.cities)

	const firstName = useUser((state) => state.firstName)
	const lastName = useUser((state) => state.lastName)
	const email = useUser((state) => state.email)
	const birthDate = useUser((state) => state.birthDate)
	const website = useUser((state) => state.website)
	const currency = useUser((state) => state.primaryCurrency)
	const city = useUser((state) => state.city)

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			firstName: firstName ?? undefined,
			lastName: lastName ?? undefined,
			email: email,
			birthDate: birthDate ?? undefined,
			website: website ?? undefined,
			currency: currency?.id ?? undefined,
			city: city?.id ?? undefined,
		},
		resolver: zodResolver(formSchema),
	})

	const handleSave = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)

		try {
			if (values.firstName !== firstName) {
				await setFirstName({ firstName: values.firstName })
			}

			if (values.lastName !== lastName) {
				await setLastName({ lastName: values.lastName })
			}

			if (values.email !== email) {
				await updateEmail({ email: values.email })
			}

			if (values.birthDate && values.birthDate !== birthDate) {
				await setBirthDate({ birthDate: values.birthDate })
			}

			if (values.website && values.website !== website) {
				await setWebsite({ website: values.website })
			}

			const primaryCurrency = currencies.find(
				(currency) => currency.id === values.currency,
			)
			if (
				primaryCurrency &&
				values.currency &&
				values.currency !== currency?.id
			) {
				await setPrimaryCurrency({ primaryCurrency })
			}

			const location = cities.find((city) => city.id === values.city)

			if (location && values.city && values.city !== city?.id) {
				await setLocation({ city: location })
			}

			// toast
			values.email !== email
				? toast('Please check your inbox to confirm change of email')
				: toast('Successfully saved changes')
		} catch (error) {
			console.error('Something went wrong saving the changes', error)
			toast('Something went wrong saving the changes')
		}

		setIsLoading(false)
	}

	return (
		<main>
			<div className="flex flex-col content-start space-y-4">
				<ProfilePictureUpload />

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSave)}
						className="max-w-xs space-y-2"
					>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input
											id="firstName"
											defaultValue={firstName ?? ''}
											type="text"
											autoCapitalize="words"
											autoComplete="given-name"
											autoCorrect="on"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input
											id="lastName"
											defaultValue={lastName ?? ''}
											type="text"
											autoCapitalize="words"
											autoComplete="family-name"
											autoCorrect="on"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											id="email"
											defaultValue={email ?? ''}
											type="email"
											autoCapitalize="none"
											autoComplete="email"
											autoCorrect="off"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="birthDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of birth</FormLabel>
									<FormControl>
										<DatePicker
											initialDate={
												birthDate
													? birthDate
													: undefined
											}
											fromYear={1900}
											toYear={dayjs().year()}
											{...field}
											handleDateChange={(date) => {
												field.onChange(date)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="website"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website</FormLabel>
									<FormControl>
										<Input
											id="website"
											defaultValue={website ?? ''}
											type="text"
											autoCapitalize="none"
											autoCorrect="off"
											{...field}
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
									<FormLabel>Default currency</FormLabel>
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
													{currencies?.map(
														(currency) => (
															<CommandItem
																value={
																	currency.name
																}
																key={
																	currency.id
																}
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
															value={
																city.name ?? ''
															}
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

						<div className="pt-6">
							<Button type="submit">
								{isLoading ? (
									<LoadingIndicator size="sm" />
								) : (
									'Save'
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</main>
	)
}
