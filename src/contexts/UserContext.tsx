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
	updatedAt: string | null
	transactions: Transaction[]
	counterparts: Counterpart[]
}

type Transaction = {
	id: string
	item: string | null
	description: string | null
	amount: number | null
	currency: string | null
	country: number | null
	transactionDate: string | null
	createdAt: string | null
	updatedAt: string | null
}

type Counterpart = {
	id: string
	name: string | null
	isIncome: boolean | null
	isExpense: boolean | null
	createdAt: string | null
	updatedAt: string | null
}

type AddNamesToUserProfileProps = {
	firstName: string
	lastName: string
}

type SetEmailProps = {
	email: string
}

type SetFirstNameProps = {
	firstName: string
}

type SetLastNameProps = {
	lastName: string
}

type SetBirthDateProps = {
	date: Date | null
}

type SetAvatarUrlProps = {
	urlString: string
}

type SetWebsiteProps = {
	website: string
}

type AddCounterpartProps = {
	name: string
	isIncome: boolean
	isExpense: boolean
}

type AddTransactionProps = {
	transactionDate: Date
	item: string
	amount: number
	counterpartName: string
	currencyId: string
	countryId: number
	description?: string
}

const Context = createContext({
	user: null as User | null,
	fetchData: () => {},
	addNamesToUserProfile: (props: AddNamesToUserProfileProps) => {},
	setOnboardingCompleted: () => {},
	setEmail: (props: SetEmailProps) => {},
	setFirstName: (props: SetFirstNameProps) => {},
	setLastName: (props: SetLastNameProps) => {},
	setBirthDate: (props: SetBirthDateProps) => {},
	setAvatarUrl: (props: SetAvatarUrlProps) => {},
	setWebsite: (props: SetWebsiteProps) => {},
	addCounterpart: (props: AddCounterpartProps) => {},
	addTransaction: (props: AddTransactionProps) => {},
})

export const useUser = () => useContext(Context)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
      createdAt,
	  updatedAt
	`)

		const {
			data: { session },
		} = await supabase.auth.getSession()

		const { data: counterparts } = await supabase.from('counterparts')
			.select(`
		id,
		createdAt,
		updatedAt,
		isIncome,
		isExpense,
		name
		`)

		const { data: transactions } = await supabase.from('transactions')
			.select(`
      	id,
      	item,
      	description,
      	amount,
      	currency ( code ),
      	country ( name ),
	  	counterpart ( name ),
      	transactionDate,
      	createdAt,
	  	updatedAt
    	`)

		const formattedTransactions = transactions?.map((transaction) => ({
			id: transaction.id,
			item: transaction.item,
			description: transaction.description,
			amount: transaction.amount,
			//@ts-ignore
			currency: transaction.currency.code,
			// @ts-ignore
			country: transaction.country.name,
			transactionDate: transaction.transactionDate,
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
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
				updatedAt: profile.updatedAt,
				transactions: formattedTransactions ?? [],
				counterparts: counterparts ?? [],
			})
		}
	}, [])

	// TODO handle only first or only last name
	const addNamesToUserProfile = useCallback(
		async ({ firstName, lastName }: AddNamesToUserProfileProps) => {
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
		async ({ urlString }: SetAvatarUrlProps) => {
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

	const setOnboardingCompleted = useCallback(async () => {
		try {
			if (!user) {
				return
			}

			// TODO use dayjs?
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
		async ({ email }: SetEmailProps) => {
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
		async ({ firstName }: SetFirstNameProps) => {
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
		async ({ lastName }: SetLastNameProps) => {
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
		async ({ date }: SetBirthDateProps) => {
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
		async ({ website }: SetWebsiteProps) => {
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

	const addCounterpart = useCallback(
		async ({
			name,
			isIncome,
			isExpense,
		}: AddCounterpartProps): Promise<Counterpart | null> => {
			try {
				if (!user) {
					return null
				}

				const { data: existingCounterpart } = await supabase
					.from('counterparts')
					.select()
					.eq('name', name)

				if (existingCounterpart?.length) {
					return existingCounterpart[0]
				}

				const { data: counterpart, error } = await supabase
					.from('counterparts')
					.insert([
						{
							userId: user.id,
							name: name,
							isIncome: isIncome,
							isExpense: isExpense,
						},
					])
					.select()

				fetchData()
				if (error) throw error

				return counterpart[0]
			} catch (error) {
				console.error(error)
				return null
			}
		},
		[user, fetchData],
	)

	const addTransaction = useCallback(
		async ({
			transactionDate,
			item,
			amount,
			counterpartName,
			currencyId,
			countryId,
			description,
		}: AddTransactionProps) => {
			try {
				if (!user) {
					return
				}

				// TODO handle isIncome and isExpense
				const counterpart = await addCounterpart({
					name: counterpartName,
					isIncome: false,
					isExpense: false,
				})

				const { error } = await supabase.from('transactions').insert([
					{
						userId: user.id,
						item: item,
						amount: amount,
						country: countryId,
						currency: currencyId,
						transactionDate:
							dayjs(transactionDate).format('YYYY-MM-DD'),
						description: description,
						counterpart: counterpart?.id,
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
		[user, addCounterpart, fetchData],
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
				setOnboardingCompleted,
				setEmail,
				setFirstName,
				setLastName,
				setBirthDate,
				setAvatarUrl,
				setWebsite,
				addCounterpart,
				addTransaction,
			}}
		>
			{children}
		</Context.Provider>
	)
}
