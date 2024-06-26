import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { type CookieOptions, createServerClient } from '@supabase/ssr'

import type { Database } from '@/types/supabase.types'

import { env } from '@/env'

export const config = {
	matcher: ['/sign-in/', '/sign-up', '/onboarding', '/dashboard/:path*'],
}

export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					response.cookies.set({
						name,
						value,
						...options,
					})
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: '',
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					response.cookies.set({
						name,
						value: '',
						...options,
					})
				},
			},
		},
	)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data: profiles } = await supabase.from('profiles').select(`
  		onboardingCompletedDate,
  		isAdmin
	`)

	const isOnboardingCompleted = !!profiles?.[0]?.onboardingCompletedDate
	const isAdmin = !!profiles?.[0]?.isAdmin

	const path = request.nextUrl.pathname
	const isPortalPath = path === '/sign-in' || path === '/sign-up'
	const isDashboardPath = path.startsWith('/dashboard')
	const isOnboardingPath = path === '/onboarding'

	// if user is signed in and the current path is /sign-in or /sign-up, redirect the user to /dashboard
	if (session && isPortalPath) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	// if user is not signed in and the current path is /dashboard or /onboarding, redirect the user to /
	if ((!session && isDashboardPath) || (!session && isOnboardingPath)) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	// if user is signed in and the current path is /dashboard and the user has not completed onboarding, redirect the user to /onboarding
	if (isDashboardPath && !isOnboardingCompleted) {
		return NextResponse.redirect(new URL('/onboarding', request.url))
	}

	// if user is signed in and the current path is /onboarding and the user has completed onboarding, redirect the user to /dashboard
	if (isOnboardingPath && isOnboardingCompleted) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	// if user is signed in and the current path is /dashboard/database and the user is not an admin, redirect the user to /dashboard
	if (isDashboardPath && !isAdmin && path.startsWith('/dashboard/database')) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	return response
}
