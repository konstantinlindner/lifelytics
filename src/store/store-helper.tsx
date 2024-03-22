'use client'

// todo check if works with server
import { City, Currency, TransactionCategory } from '@/types/globals.types'

import supabase from '@/lib/supabase'

import { useDatabase, useUser } from '@/store/store'
import dayjs from 'dayjs'

type SignInProps = {
	email: string
	password: string
}

export async function SignIn({ email, password }: SignInProps) {
	const { error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	})

	if (error) return error

	await InitializeStore()
}

type SignUpProps = {
	email: string
	password: string
	firstName: string
	lastName: string
}

export async function SignUp({
	email,
	password,
	firstName,
	lastName,
}: SignUpProps) {
	const { error } = await supabase.auth.signUp({
		email: email,
		password: password,
	})

	if (error) return error

	await InitializeStore()

	// todo send to supabase with signUp call
	await setFirstName({ firstName: firstName })
	await setLastName({ lastName: lastName })
}

// setup the store
export async function InitializeStore() {
	// set database
	const setCurrencies = useDatabase.getState().setCurrencies
	const setCities = useDatabase.getState().setCities
	const setCountries = useDatabase.getState().setCountries
	const setTransactionCategories =
		useDatabase.getState().setTransactionCategories

	const currencies = await fetchCurrencies()
	const cities = await fetchCities()
	const countries = await fetchCountries()
	const transactionCategories = await fetchTransactionCategories()

	if (currencies) setCurrencies(currencies)
	if (cities) setCities(cities)
	if (countries) setCountries(countries)
	if (transactionCategories) setTransactionCategories(transactionCategories)

	// set user
	const setId = useUser.getState().setId
	const setEmail = useUser.getState().setEmail
	const setFirstName = useUser.getState().setFirstName
	const setLastName = useUser.getState().setLastName
	const setFullName = useUser.getState().setFullName
	const setInitials = useUser.getState().setInitials
	const setIsOnboardingCompleted = useUser.getState().setIsOnboardingCompleted
	const setAvatarUrl = useUser.getState().setAvatarUrl
	const setBirthDate = useUser.getState().setBirthDate
	const setWebsite = useUser.getState().setWebsite
	const setCreatedAt = useUser.getState().setCreatedAt
	const setUpdatedAt = useUser.getState().setUpdatedAt
	const setCity = useUser.getState().setCity
	const setCountry = useUser.getState().setCountry
	const setPrimaryCurrency = useUser.getState().setPrimaryCurrency
	const setTransactions = useUser.getState().setTransactions
	const setCounterparts = useUser.getState().setCounterparts

	const session = await fetchSession()

	if (session) setEmail(session.user.email)

	const profile = await fetchProfile()

	if (profile) {
		setId(profile.id)
		setFirstName(profile.firstName)
		setLastName(profile.lastName)
		setFullName(`${profile.firstName} ${profile.lastName}`)
		setInitials(`${profile.firstName?.[0]}${profile.lastName?.[0]}`)
		setIsOnboardingCompleted(!!profile.onboardingCompletedDate)
		setAvatarUrl(profile.avatarUrl)
		setBirthDate(
			profile.birthDate ? dayjs(profile.birthDate).toDate() : null,
		)
		setWebsite(profile.website)
		setCreatedAt(profile.createdAt)
		setUpdatedAt(profile.updatedAt)
		const userCity = cities?.find(
			(city) => city.id === profile.LocationCityId,
		)
		setCity(userCity)
		setCountry(
			countries?.find((country) => country.id === userCity?.countryId),
		)
		setPrimaryCurrency(
			currencies?.find(
				(currency) => currency.id === profile.primaryCurrencyId,
			),
		)
	}

	const counterparts = await fetchCounterparts()

	if (counterparts) setCounterparts(counterparts)

	const transactions = await fetchTransactions()

	if (transactions) {
		const formattedTransactions = transactions.map((transaction) => {
			const counterpart = useUser
				.getState()
				.counterparts?.find(
					(counterpart) =>
						counterpart.id === transaction.counterpartId,
				)
			const currency = useDatabase
				.getState()
				.currencies?.find(
					(currency) => currency.id === transaction.currencyId,
				)
			const city = useDatabase
				.getState()
				.cities?.find((city) => city.id === transaction.cityId)
			const country = useDatabase
				.getState()
				.countries?.find((country) => country.id === city?.countryId)
			const category = useDatabase
				.getState()
				.transactionCategories?.find(
					(category) => category.id === transaction.categoryId,
				)

			return {
				id: transaction.id,
				item: transaction.item,
				description: transaction.description,
				amount: transaction.amount,
				transactionDate: dayjs(transaction.transactionDate).toDate(),
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
}

// fetch from DB
async function fetchSession() {
	try {
		const { data, error } = await supabase.auth.getSession()

		if (error) throw error

		if (!data) return

		return data.session
	} catch (error) {
		console.error('Error fetching session:', error)
	}
}

async function fetchProfile() {
	try {
		const { data: profile, error } = await supabase
			.from('profiles')
			.select()
			.single()

		if (error) throw error

		if (!profile) {
			console.error('No profile found')
			return
		}

		return profile
	} catch (error) {
		console.error('Error fetching profile:', error)
	}
}

async function fetchTransactions() {
	try {
		const { data: transactions, error } = await supabase
			.from('transactions')
			.select()

		if (error) throw error

		if (!transactions) {
			console.error('No transactions found')
			return
		}

		return transactions
	} catch (error) {
		console.error('Error fetching transactions:', error)
	}
}

async function fetchCounterparts() {
	try {
		const { data: counterparts, error } = await supabase
			.from('counterparts')
			.select()

		if (error) throw error

		if (!counterparts) {
			console.error('No counterparts found')
			return
		}

		return counterparts
	} catch (error) {
		console.error('Error fetching counterparts:', error)
	}
}

async function fetchCurrencies() {
	try {
		const { data: currencies, error } = await supabase
			.from('currencies')
			.select()

		if (error) throw error

		if (!currencies) {
			console.error('No currencies found')
			return
		}

		return currencies
	} catch (error) {
		console.error('Error fetching currencies:', error)
	}
}

async function fetchCities() {
	try {
		const { data: cities, error } = await supabase.from('cities').select()

		if (error) throw error

		if (!cities) {
			console.error('No cities found')
			return
		}

		return cities
	} catch (error) {
		console.error('Error fetching cities:', error)
	}
}

async function fetchCountries() {
	try {
		const { data: countries, error } = await supabase
			.from('countries')
			.select()

		if (error) throw error

		if (!countries) {
			console.error('No countries found')
			return
		}

		return countries
	} catch (error) {
		console.error('Error fetching countries:', error)
	}
}

async function fetchTransactionCategories() {
	try {
		const { data: transactionCategories, error } = await supabase
			.from('transactionCategories')
			.select()

		if (error) throw error

		if (!transactionCategories) {
			console.error('No transaction categories found')
			return
		}

		return transactionCategories
	} catch (error) {
		console.error('Error fetching transaction categories:', error)
	}
}

// helper functions

type SetFirstNameProps = {
	firstName: string
}

export async function setFirstName({ firstName }: SetFirstNameProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setFirstName = useUser.getState().setFirstName

	const previousFirstName = useUser.getState().firstName

	// optimistically set the state
	setFirstName(firstName)

	try {
		if (firstName === previousFirstName) {
			throw new Error(
				'The new first name is the same as the current one.',
			)
		}

		const { error } = await supabase
			.from('profiles')
			.update({ firstName: firstName })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setFirstName(previousFirstName)

		console.error('Error setting first name:', error)
	}
}

type SetLastNameProps = {
	lastName: string
}

export async function setLastName({ lastName }: SetLastNameProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setLastName = useUser.getState().setLastName

	const previousLastName = useUser.getState().lastName

	// optimistically set the state
	setLastName(lastName)

	try {
		if (lastName === previousLastName) {
			throw new Error('The new last name is the same as the current one.')
		}

		const { error } = await supabase
			.from('profiles')
			.update({ lastName: lastName })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setLastName(previousLastName)

		console.error('Error setting last name:', error)
	}
}

type SetBirthDateProps = {
	birthDate: Date | null
}

export async function setBirthDate({ birthDate }: SetBirthDateProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setBirthDate = useUser.getState().setBirthDate

	const previousBirthDate = useUser.getState().birthDate

	// optimistically set the state
	setBirthDate(birthDate)

	try {
		if (birthDate === previousBirthDate) {
			throw new Error(
				'The new birth date is the same as the current one.',
			)
		}

		const { error } = await supabase
			.from('profiles')
			.update({ birthDate: dayjs(birthDate).format() })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setBirthDate(previousBirthDate)

		console.error('Error setting birth date:', error)
	}
}

type SetWebsiteProps = {
	website: string | null
}

export async function setWebsite({ website }: SetWebsiteProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setWebsite = useUser.getState().setWebsite

	const previousWebsite = useUser.getState().website

	// optimistically set the state
	setWebsite(website)

	try {
		if (website === previousWebsite) {
			throw new Error('The new website is the same as the current one.')
		}

		const { error } = await supabase
			.from('profiles')
			.update({ website: website })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setWebsite(previousWebsite)

		console.error('Error setting website:', error)
	}
}

type SetAvatarUrlProps = {
	avatarUrl: string | null
}

export async function setAvatarUrl({ avatarUrl }: SetAvatarUrlProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setAvatarUrl = useUser.getState().setAvatarUrl

	const previousAvatarUrl = useUser.getState().avatarUrl

	// optimistically set the state
	setAvatarUrl(avatarUrl)

	try {
		if (avatarUrl === previousAvatarUrl) {
			throw new Error(
				'The new avatar URL is the same as the current one.',
			)
		}

		const { error } = await supabase
			.from('profiles')
			.update({ avatarUrl: avatarUrl })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setAvatarUrl(previousAvatarUrl)

		console.error('Error setting avatar URL:', error)
	}
}

type SetIsOnboardingCompletedProps = {
	value: boolean
}

export async function setIsOnboardingCompleted({
	value,
}: SetIsOnboardingCompletedProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setIsOnboardingCompleted = useUser.getState().setIsOnboardingCompleted

	const previousValue = useUser.getState().isOnboardingCompleted

	// optimistically set the state
	setIsOnboardingCompleted(value)

	try {
		if (value === previousValue) {
			throw new Error(
				'The new onboarding completed value is the same as the current one.',
			)
		}

		const { error } = await supabase
			.from('profiles')
			.update({
				onboardingCompletedDate: value ? dayjs().toString() : null,
			})
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setIsOnboardingCompleted(previousValue)

		console.error('Error setting onboarding completed value:', error)
	}
}

type AddCounterpartProps = {
	name: string
	isIncome: boolean
	isExpense: boolean
}

async function addCounterpart({
	name,
	isIncome,
	isExpense,
}: AddCounterpartProps) {
	const setCounterparts = useUser.getState().setCounterparts

	const existingCounterparts = useUser.getState().counterparts
	const existingMatchingCounterpart = existingCounterparts.find(
		(counterpart) => counterpart.name === name,
	)

	// if there are is no counterpart with this name in the database, create one
	if (!existingMatchingCounterpart) {
		try {
			const { data: newCounterpart, error } = await supabase
				.from('counterparts')
				.insert([
					{
						userId: useUser.getState().id,
						name: name,
						isIncome: isIncome,
						isExpense: isExpense,
					},
				])
				.select()

			if (error) throw error

			setCounterparts([...existingCounterparts, ...newCounterpart])

			return
		} catch (error) {
			console.error('Error adding counterpart to db:', error)
			return
		}
	}

	// if there is a counterpart already created but not with the same attributes, update them
	if (
		existingMatchingCounterpart.isIncome !== isIncome ||
		existingMatchingCounterpart.isExpense !== isExpense
	) {
		try {
			const { data: updatedCounterpart, error } = await supabase
				.from('counterparts')
				.update({
					isIncome: isIncome,
					isExpense: isExpense,
				})
				.eq('id', existingMatchingCounterpart.id)
				.select()

			if (error) throw error

			setCounterparts(
				existingCounterparts.map((counterpart) =>
					counterpart.id === updatedCounterpart[0].id
						? {
								...counterpart,
								isIncome: updatedCounterpart[0].isIncome,
								isExpense: updatedCounterpart[0].isExpense,
						  }
						: counterpart,
				),
			)
		} catch (error) {
			console.error('Error updating counterpart in db:', error)
		}
	}
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

export async function addTransaction({
	date,
	item,
	amount,
	counterpartName,
	description,
	currency,
	city,
	category,
}: AddTransactionProps) {
	const setTransactions = useUser.getState().setTransactions

	const existingTransactions = useUser.getState().transactions
	const country = useDatabase
		.getState()
		.countries?.find((country) => country.id === city.countryId)

	await addCounterpart({
		name: counterpartName,
		isIncome: category.isIncome,
		isExpense: !category.isIncome,
	})

	const counterpart = useUser
		.getState()
		.counterparts?.find(
			(counterpart) => counterpart.name === counterpartName,
		)

	if (!counterpart) {
		console.error('Counterpart not found')
		return
	}

	try {
		const { data: newTransaction, error } = await supabase
			.from('transactions')
			.insert([
				{
					userId: useUser.getState().id ?? '',
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
			.select()

		if (error) throw error

		if (newTransaction) {
			setTransactions([
				...existingTransactions,
				{
					id: newTransaction[0].id,
					item: item,
					description: description,
					amount: amount,
					transactionDate: date,
					createdAt: newTransaction[0].createdAt,
					updatedAt: newTransaction[0].updatedAt,
					counterpart: counterpart,
					currency: currency,
					city: city,
					country: country,
					category: category,
				},
			])
		}
	} catch (error) {
		console.error('Error adding transaction to db:', error)
	}
}
