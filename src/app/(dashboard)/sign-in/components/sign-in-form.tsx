'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { SignIn } from '@/store/store-helper'
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

import LoadingIndicator from '@/components/loading-indicator'

export default function SignInForm() {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const formSchema = z.object({
		email: z.string().email(),
		password: z.string(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const handleSignIn = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)

		const error = await SignIn({
			email: values.email,
			password: values.password,
		})

		if (error) {
			console.log(error)
			toast(error.message)
			setIsLoading(false)
		}

		router.refresh()
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSignIn)}
					className="space-y-2"
				>
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
										autoComplete="current-password"
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
								'Sign in'
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
