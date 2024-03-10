'use client'

import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import { useDatabase } from '@/contexts/DatabaseContext'

import supabase from '@/lib/supabase'

import dayjs from 'dayjs'

import LoadingIndicator from '@/components/loadingIndicator'

type User = {
	id: string
	email: string
	firstName: string | null
	lastName: string | null
	fullName: string | null
	initials: string | null
	hasCompletedOnboarding: boolean
	avatarUrl: string | null
	birthDate: Date | null
	website: string | null
	createdAt: string | null
	transactions: Transaction[]
}

type Transaction = {
	id: string
	title: string | null
	description: string | null
	amount: number | null
	currency: string | null
	country: number | null
	date: string | null
	createdAt: string | null
}

const Context = createContext({
	user: null as User | null,
	fetchData: () => {},
	addNamesToUserProfile: (firstName: string, lastName: string) => {},
	setOnboardingComplete: () => {},
	setEmail: (email: string) => {},
	setFirstName: (firstName: string) => {},
	setLastName: (lastName: string) => {},
	setBirthDate: (date: Date | null) => {},
	setAvatarUrl: (urlString: string) => {},
	setWebsite: (website: string) => {},
	addTransaction: (
		title: string,
		amount: number,
		currencyId: string,
		countryId: number,
		date: Date,
	) => {},
})

export const useUser = () => useContext(Context)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	// const { countries, currencies } = useDatabase()
	const [user, setUser] = useState<User | null>()

	const fetchData = useCallback(async () => {
		const { data: profiles } = await supabase.from('profiles').select(`
      id,
      firstName,
      lastName,
      onboardingCompletedDate,
      avatarUrl,
      birthDate,
      website,
      createdAt
    `)

		const {
			data: { session },
		} = await supabase.auth.getSession()

		const { data: transactions } = await supabase.from('transactions')
			.select(`
      id,
      title,
      description,
      amount,
      currency ( code ),
      country ( name ),
      date,
      createdAt
    `)

		const formattedTransactions = transactions?.map((transaction) => ({
			id: transaction.id,
			title: transaction.title,
			description: transaction.description,
			amount: transaction.amount,
			//@ts-ignore
			currency: transaction.currency.code,
			// @ts-ignore
			country: transaction.country.name,
			date: transaction.date,
			createdAt: transaction.createdAt,
		}))

		const profile = profiles?.[0]
		const sessionUser = session?.user

		if (!profile || !sessionUser?.email) {
			setUser(null)
		} else {
			setUser({
				id: profile.id,
				email: sessionUser.email,
				firstName: profile.firstName,
				lastName: profile.lastName,
				fullName: `${profile.firstName} ${profile.lastName}`,
				initials: `${profile.firstName?.[0]}${profile.lastName?.[0]}`,
				avatarUrl: profile.avatarUrl,
				hasCompletedOnboarding: !!profile.onboardingCompletedDate,
				birthDate: profile.birthDate
					? new Date(profile.birthDate)
					: null,
				website: profile.website,
				createdAt: profile.createdAt,
				transactions: formattedTransactions ?? [],
			})
		}
	}, [])

	const addNamesToUserProfile = useCallback(
		async (firstName: string, lastName: string) => {
			const {
				data: { session },
			} = await supabase.auth.getSession()

			if (!session) {
				return
			}

			const id = session.user.id

			try {
				const { error } = await supabase
					.from('profiles')
					.update({ firstName: firstName, lastName: lastName })
					.eq('id', id)

				fetchData()
				if (error) throw error
			} catch (error) {
				console.error(error)
			}
		},
		[fetchData],
	)

	const setAvatarUrl = useCallback(
		async (urlString: string) => {
			if (!user) {
				return
			}

			try {
				const { error } = await supabase
					.from('profiles')
					.update({ avatarUrl: urlString })
					.eq('id', user.id)

				fetchData()
				if (error) throw error
			} catch (error) {
				console.error(error)
			}
		},
		[user, fetchData],
	)

	const setOnboardingComplete = useCallback(async () => {
		try {
			if (!user) {
				return
			}

			const currentDateString = new Date().toLocaleString()

			const { error } = await supabase
				.from('profiles')
				.update({ onboardingCompletedDate: currentDateString })
				.eq('id', user.id)

			fetchData()
			if (error) throw error
		} catch (error) {
			console.error(error)
		}
	}, [user, fetchData])

	const setEmail = useCallback(
		async (email: string) => {
			try {
				const { error } = await supabase.auth.updateUser({
					email: email,
				})

				fetchData()
				if (error) throw error
			} catch (error) {
				console.error(error)
			}
		},
		[fetchData],
	)

	const setFirstName = useCallback(
		async (firstName: string) => {
			try {
				if (!user) {
					return
				}

				const { error } = await supabase
					.from('profiles')
					.update({ firstName: firstName })
					.eq('id', user.id)

				fetchData()
				if (error) throw error
			} catch (error) {
				console.error(error)
			}
		},
		[user, fetchData],
	)

	const setLastName = useCallback(
		async (lastName: string) => {
			try {
				if (!user) {
					return
				}

				const { error } = await supabase
					.from('profiles')
					.update({ lastName: lastName })
					.eq('id', user.id)

				fetchData()
				if (error) throw error
			} catch (error) {
				console.error(error)
			}
		},
		[user, fetchData],
	)

	const setBirthDate = useCallback(
		async (date: Date | null) => {
			try {
				if (!user) {
					return
				}

				const formattedDate = date ? date.toLocaleString() : null

				const { error } = await supabase
					.from('profiles')
					.update({ birthDate: formattedDate })
					.eq('id', user.id)

				fetchData()
				if (error) throw error
			} catch (error) {
				console.error(error)
			}
		},
		[user, fetchData],
	)

	const setWebsite = useCallback(
		async (website: string) => {
			try {
				if (!user) {
					return
				}

				const { error } = await supabase
					.from('profiles')
					.update({ website: website })
					.eq('id', user.id)

				fetchData()
				if (error) throw error
			} catch (error) {
				console.error(error)
			}
		},
		[user, fetchData],
	)

	const addTransaction = useCallback(
		async (
			title: string,
			amount: number,
			currencyId: string,
			countryId: number,
			date: Date,
		) => {
			try {
				if (!user) {
					return
				}

				const { error } = await supabase.from('transactions').insert([
					{
						userId: user.id,
						title: title,
						amount: amount,
						country: countryId,
						currency: currencyId,
						date: dayjs(date).format('YYYY-MM-DD'),
					},
				])

				fetchData()

				if (error) {
					throw error
				}
			} catch (error) {
				console.error(error)
			}
		},
		[user, fetchData],
	)

	useEffect(() => {
		fetchData()
	}, [fetchData])

	if (user === undefined)
		return (
			<div className="flex min-h-screen w-full items-center justify-center">
				<LoadingIndicator size="lg" />
			</div>
		)

	return (
		<Context.Provider
			value={{
				user,
				fetchData,
				addNamesToUserProfile,
				setOnboardingComplete,
				setEmail,
				setFirstName,
				setLastName,
				setBirthDate,
				setAvatarUrl,
				setWebsite,
				addTransaction,
			}}
		>
			{children}
		</Context.Provider>
	)
}
