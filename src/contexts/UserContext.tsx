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

import {
	City,
	Counterpart,
	Country,
	Currency,
	TransactionCategory,
} from '@/types/globals.types'

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
	isOnboardingCompleted: boolean
	avatarUrl: string | null
	birthDate: Date | null
	website: string | null
	createdAt: string | null
	updatedAt: string | null
	primaryCurrency: Currency | undefined
	transactions: Transaction[]
	counterparts: Counterpart[]
}

export type Transaction = {
	id: string
	item: string
	description: string | null
	amount: number
	transactionDate: Date
	createdAt: string
	updatedAt: string
	counterpart: Counterpart | undefined
	currency: Currency | undefined
	city: City | undefined
	country: Country | undefined
	category: TransactionCategory | undefined
}

// function prop types
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
	birthDate: Date | null
}

type SetAvatarUrlProps = {
	avatarUrl: string
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
	date: Date
	item: string
	amount: number
	counterpartName: string
	description?: string | null
	currency: Currency
	city: City
	category: TransactionCategory
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
	const { countries, cities, currencies, transactionCategories } =
		useDatabase()

	console.log('userprovider')

	const [user, setUser] = useState<User | null>()
	const [transactions, setTransactions] = useState<Transaction[] | null>()

	const fetchData = useCallback(async () => {
		console.log('fetchData')

		const { data: profile } = await supabase
			.from('profiles')
			.select()
			.single()

		const {
			data: { session },
		} = await supabase.auth.getSession()

		const sessionUser = session?.user

		const { data: counterparts } = await supabase
			.from('counterparts')
			.select()

		const { data: dbTransactions } = await supabase
			.from('transactions')
			.select()

		if (!dbTransactions) {
			setTransactions(null)
		} else {
			console.log('set transactions')
			const formattedTransactions = dbTransactions.map((transaction) => {
				const counterpart = counterparts?.find(
					(counterpart) =>
						counterpart.id === transaction.counterpartId,
				)
				const currency = currencies?.find(
					(currency) => currency.id === transaction.currencyId,
				)
				const city = cities?.find(
					(city) => city.id === transaction.cityId,
				)
				const country = countries?.find(
					(country) => country.id === city?.countryId,
				)
				const category = transactionCategories?.find(
					(category) => category.id === transaction.categoryId,
				)

				return {
					id: transaction.id,
					item: transaction.item,
					description: transaction.description,
					amount: transaction.amount,
					transactionDate: dayjs(
						transaction.transactionDate,
					).toDate(),
					createdAt: transaction.createdAt,
					updatedAt: transaction.updatedAt,
					counterpart: counterpart,
					currency: currency,
					city: city,
					country: country,
					category: category,
				}
			})

			setTransactions(formattedTransactions)
		}

		if (!profile || !sessionUser?.email) {
			setUser(null)
		} else {
			console.log('set user')
			setUser({
				id: profile.id,
				email: sessionUser.email,
				firstName: profile.firstName,
				lastName: profile.lastName,
				fullName: `${profile.firstName} ${profile.lastName}`,
				initials: `${profile.firstName?.[0]}${profile.lastName?.[0]}`,
				avatarUrl: profile.avatarUrl,
				isOnboardingCompleted: !!profile.onboardingCompletedDate,
				birthDate: profile.birthDate
					? new Date(profile.birthDate)
					: null,
				website: profile.website,
				createdAt: profile.createdAt,
				updatedAt: profile.updatedAt,
				primaryCurrency: currencies?.find(
					(currency) => currency.id === profile.primaryCurrencyId,
				),
				transactions: transactions ?? [],
				counterparts: counterparts ?? [],
			})
		}
	}, [cities, countries, currencies, transactionCategories, transactions])

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
		async ({ avatarUrl }: SetAvatarUrlProps) => {
			if (!user) {
				return
			}

			try {
				const { error } = await supabase
					.from('profiles')
					.update({ avatarUrl: avatarUrl })
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

			const currentDateString = dayjs().format()

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
		async ({ birthDate }: SetBirthDateProps) => {
			try {
				if (!user) {
					return
				}

				const formattedDate = birthDate
					? dayjs(birthDate).format()
					: null

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
					if (
						existingCounterpart[0].isIncome !== isIncome ||
						existingCounterpart[0].isExpense !== isExpense
					) {
						const { error } = await supabase
							.from('counterparts')
							.update({
								isIncome: isIncome,
								isExpense: isExpense,
							})
							.eq('id', existingCounterpart[0].id)

						fetchData()
						if (error) throw error
					}

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

	// TODO return promise
	const addTransaction = useCallback(
		async ({
			date,
			item,
			amount,
			counterpartName,
			description,
			currency,
			city,
			category,
		}: AddTransactionProps) => {
			try {
				if (!user) {
					return
				}

				const counterpart = await addCounterpart({
					name: counterpartName,
					isIncome: category.isIncome,
					isExpense: !category.isIncome,
				})

				if (!counterpart) {
					console.log('Could not add counterpart')
					return
				}

				const { error } = await supabase.from('transactions').insert([
					{
						userId: user.id,
						item: item,
						amount: amount,
						cityId: city.id,
						currencyId: currency.id,
						transactionDate: dayjs(date).format('YYYY-MM-DD'),
						description: description,
						counterpartId: counterpart.id,
						categoryId: category.id,
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
