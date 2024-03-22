import Link from 'next/link'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

import Logo from '@/components/logo'

import SignInForm from './components/sign-in-form'

export default async function SignIn() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
				<Button variant="ghost">
					<ChevronLeft className="mr-2 h-5 w-5" />
					Back
				</Button>
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<div className="mx-auto h-6 w-6">
						<Logo hideText />
					</div>
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome back
					</h1>
					<p className="text-sm text-muted-foreground">
						Enter your email to sign in to your account
					</p>
				</div>
				<SignInForm />
				<p className="px-8 text-center text-sm text-muted-foreground">
					<Link
						href="/sign-up"
						className="hover:text-brand underline underline-offset-4"
					>
						Don&apos;t have an account? Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
