import {
	City,
	Counterpart,
	Country,
	Currency,
	TransactionCategory,
} from '@/types/globals.types'

import { create } from 'zustand'

type Database = {
	currencies: Currency[]
	setCurrencies: (currencies: Currency[]) => void
	cities: City[]
	setCities: (cities: City[]) => void
	countries: Country[]
	setCountries: (countries: Country[]) => void
	transactionCategories: TransactionCategory[]
	setTransactionCategories: (
		transactionCategories: TransactionCategory[],
	) => void
}

type User = {
	id: string | undefined
	setId: (id: string) => void
	email: string | undefined
	setEmail: (email: string | undefined) => void
	firstName: string | undefined | null
	setFirstName: (firstName: string | undefined | null) => void
	lastName: string | undefined | null
	setLastName: (lastName: string | undefined | null) => void
	fullName: string | undefined
	setFullName: (fullName: string | undefined) => void
	initials: string | undefined
	setInitials: (initials: string | undefined) => void
	isOnboardingCompleted: boolean | undefined
	setIsOnboardingCompleted: (value: boolean | undefined) => void
	avatarUrl: string | undefined | null
	setAvatarUrl: (avatarUrl: string | undefined | null) => void
	birthDate: Date | undefined | null
	setBirthDate: (birthDate: Date | undefined | null) => void
	website: string | undefined | null
	setWebsite: (website: string | undefined | null) => void
	createdAt: string | undefined
	setCreatedAt: (createdAt: string) => void
	updatedAt: string | undefined
	setUpdatedAt: (updatedAt: string) => void
	city: City | undefined | null
	setCity: (city: City | undefined | null) => void
	country: Country | undefined | null
	setCountry: (country: Country | undefined | null) => void
	primaryCurrency: Currency | undefined | null
	setPrimaryCurrency: (currency: Currency | undefined | null) => void
	counterparts: Counterpart[]
	setCounterparts: (counterparts: Counterpart[]) => void
	transactions: Transaction[]
	setTransactions: (transactions: Transaction[]) => void
}

export type Transaction = {
	id: string
	item: string
	description: string | undefined | null
	amount: number
	isIncome: boolean | undefined
	transactionDate: Date
	createdAt: string
	updatedAt: string
	counterpart: Counterpart | undefined
	currency: Currency | undefined
	city: City | undefined
	country: Country | undefined
	category: TransactionCategory | undefined
}

export const useDatabase = create<Database>()((set) => ({
	currencies: [],
	setCurrencies: (currencies: Currency[]) => {
		set({ currencies })
	},
	cities: [],
	setCities: (cities: City[]) => {
		set({ cities })
	},
	countries: [],
	setCountries: (countries: Country[]) => {
		set({ countries })
	},
	transactionCategories: [],
	setTransactionCategories: (
		transactionCategories: TransactionCategory[],
	) => {
		set({ transactionCategories })
	},
}))

export const useUser = create<User>((set) => ({
	id: undefined,
	setId: (id: string) => {
		set({ id })
	},
	email: undefined,
	setEmail: (email: string | undefined) => {
		set({ email })
	},
	firstName: undefined,
	setFirstName: (firstName: string | undefined | null) => {
		set({ firstName })
	},
	lastName: undefined,
	setLastName: (lastName: string | undefined | null) => {
		set({ lastName })
	},
	fullName: undefined,
	setFullName: (fullName: string | undefined) => {
		set({ fullName })
	},
	initials: undefined,
	setInitials: (initials: string | undefined) => {
		set({ initials })
	},
	isOnboardingCompleted: undefined,
	setIsOnboardingCompleted: (value: boolean | undefined) => {
		set({ isOnboardingCompleted: value })
	},
	avatarUrl: undefined,
	setAvatarUrl: (avatarUrl: string | undefined | null) => {
		set({ avatarUrl })
	},
	birthDate: undefined,
	setBirthDate: (birthDate: Date | undefined | null) => {
		set({ birthDate })
	},
	website: undefined,
	setWebsite: (website: string | undefined | null) => {
		set({ website })
	},
	createdAt: undefined,
	setCreatedAt: (createdAt: string) => {
		set({ createdAt })
	},
	updatedAt: undefined,
	setUpdatedAt: (updatedAt: string) => {
		set({ updatedAt })
	},
	city: undefined,
	setCity: (city: City | undefined | null) => {
		set({ city })
	},
	country: undefined,
	setCountry: (country: Country | undefined | null) => {
		set({ country })
	},
	primaryCurrency: undefined,
	setPrimaryCurrency: (currency: Currency | undefined | null) => {
		set({ primaryCurrency: currency })
	},
	counterparts: [],
	setCounterparts: (counterparts: Counterpart[]) => {
		set({ counterparts })
	},
	transactions: [],
	setTransactions: (transactions: Transaction[]) => {
		set({ transactions })
	},
}))
