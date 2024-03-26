'use client'

import { useState } from 'react'

import {
	setBirthDate,
	setFirstName,
	setLastName,
	setWebsite,
	updateEmail,
} from '@/store/store-helper'
import { useUser } from '@/store/use-store'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import DatePicker from '@/components/date-picker'
import LoadingIndicator from '@/components/loading-indicator'
import ProfilePictureUpload from '@/components/profile-picture-picker'

export default function Profile() {
	const [isLoading, setIsLoading] = useState(false)

	const firstName = useUser((state) => state.firstName)
	const lastName = useUser((state) => state.lastName)
	const email = useUser((state) => state.email)
	const birthDate = useUser((state) => state.birthDate)
	const website = useUser((state) => state.website)

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
	})

	// todo fix issue with fake empty fields

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			firstName: firstName ?? undefined,
			lastName: lastName ?? undefined,
			email: email,
			birthDate: birthDate ?? undefined,
			website: website ?? undefined,
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
											toYear={2024}
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
