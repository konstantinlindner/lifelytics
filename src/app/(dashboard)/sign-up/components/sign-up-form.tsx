'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { SignUp } from '@/store/store-helper'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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

import LoadingIndicator from '@/components/loading-indicator'

function SignUpForm() {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const formSchema = z.object({
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(),
		password: z
			.string({
				required_error: 'Password is required',
			})
			.min(8, {
				message: 'Password should be at least 8 characters long',
			}),
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
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const handleSignUp = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)

		const error = await SignUp({
			email: values.email,
			password: values.password,
			firstName: values.firstName,
			lastName: values.lastName,
		})

		if (error) {
			console.error('Somethign went wrong signing up:', error)
			toast(error.message)
			setIsLoading(false)
		}

		router.refresh()
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSignUp)}
					className="space-y-2"
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
										placeholder="John"
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
										placeholder="Appleseed"
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
										placeholder="name@domain.com"
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="********"
										type="password"
										autoComplete="new-password"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="pt-6">
						<Button
							disabled={isLoading}
							className="w-full"
							type="submit"
						>
							{isLoading ? (
								<LoadingIndicator size="sm" />
							) : (
								'Sign up'
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default SignUpForm
