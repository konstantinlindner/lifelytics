'use client'

import { useState } from 'react'

import { setPrimaryCurrency } from '@/store/store-helper'
import { useDatabase, useUser } from '@/store/use-store'

import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { BadgeCheckIcon, CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import LoadingIndicator from '@/components/loading-indicator'

import SignOutButton from '../../components/sign-out-button'

const formSchema = z.object({
	currency: z.string({
		required_error: 'Please select a currency',
	}),
})

export default function Account() {
	const [isLoading, setIsLoading] = useState(false)

	const currencies = useDatabase((state) => state.currencies)
	const currency = useUser((state) => state.primaryCurrency)

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			currency: currency?.id ?? undefined,
		},
		resolver: zodResolver(formSchema),
	})

	const handleSave = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)

		try {
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

			toast('Successfully saved changes')
		} catch (error) {
			console.error('Something went wrong saving the changes', error)
			toast('Something went wrong saving the changes')
		}

		setIsLoading(false)
	}

	function handleAccountDeletion() {
		toast('Not yet implemented')
	}

	return (
		<main className="flex flex-col gap-4">
			<Card className="flex max-w-sm flex-col gap-6 p-6">
				<div className="flex gap-2">
					<BadgeCheckIcon className="" />
					<p>
						Member since{' '}
						{dayjs(useUser((state) => state.createdAt)).format(
							'MMMM YYYY',
						)}
					</p>
				</div>
			</Card>

			<Card className="flex max-w-sm flex-col gap-6 p-6">
				<CardTitle>Settings</CardTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSave)}
						className="space-y-2"
					>
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
						<div className="pt-4">
							<Button type="submit">
								{isLoading ? (
									<LoadingIndicator size="sm" />
								) : (
									'Save changes'
								)}
							</Button>
						</div>
					</form>
				</Form>
			</Card>

			<Card className="flex max-w-sm flex-col gap-4 p-6">
				<div className="flex max-w-xs flex-col gap-4">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">
								Delete account
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete your account and remove
									your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleAccountDeletion}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<SignOutButton />
				</div>
			</Card>
		</main>
	)
}
