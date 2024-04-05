import {
	Airline,
	AirlineAlliance,
	Airport,
	City,
	Counterpart,
	Country,
	Currency,
	FlightClass,
	FlightLuggageCategory,
	FlightSeatCategory,
	FoodPlaceCategory,
	FoodTypeCategory,
	LoyaltyProgram,
	PaymentMethod,
	PaymentMethodCategory,
	TransactionCategory,
} from '@/types/globals.types'

import { create } from 'zustand'

type Database = {
	cities: City[]
	setCities: (cities: City[]) => void
	countries: Country[]
	setCountries: (countries: Country[]) => void
	currencies: Currency[]
	setCurrencies: (currencies: Currency[]) => void
	airports: Airport[]
	setAirports: (airports: Airport[]) => void
	airlines: Airline[]
	setAirlines: (airlines: Airline[]) => void
	airlineAlliances: AirlineAlliance[]
	setAirlineAlliances: (airlineAlliances: AirlineAlliance[]) => void
	flightClasses: FlightClass[]
	setFlightClasses: (flightClasses: FlightClass[]) => void
	flightLuggageCategories: FlightLuggageCategory[]
	setFlightLuggageCategories: (
		flightLuggageCategories: FlightLuggageCategory[],
	) => void
	flightSeatCategories: FlightSeatCategory[]
	setFlightSeatCategories: (
		flightSeatCategories: FlightSeatCategory[],
	) => void
	loyaltyPrograms: LoyaltyProgram[]
	setLoyaltyPrograms: (loyaltyPrograms: LoyaltyProgram[]) => void
	paymentMethodCategories: PaymentMethodCategory[]
	setPaymentMethodCategories: (
		paymentMethodCategories: PaymentMethodCategory[],
	) => void
	transactionCategories: TransactionCategory[]
	setTransactionCategories: (
		transactionCategories: TransactionCategory[],
	) => void
	foodPlaceCategories: FoodPlaceCategory[]
	setFoodPlaceCategories: (foodPlaceCategories: FoodPlaceCategory[]) => void
	foodTypeCategories: FoodPlaceCategory[]
	setFoodTypeCategories: (foodTypeCategories: FoodPlaceCategory[]) => void
}

type User = {
	id: string | undefined
	setId: (id: string) => void
	email: string | undefined
	setEmail: (email: string | undefined) => void
	isAdmin: boolean | undefined
	setIsAdmin: (isAdmin: boolean | undefined) => void
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
	paymentMethods: PaymentMethod[]
	setPaymentMethods: (paymentMethods: PaymentMethod[]) => void
	counterparts: Counterpart[]
	setCounterparts: (counterparts: Counterpart[]) => void
	transactions: Transaction[]
	setTransactions: (transactions: Transaction[]) => void
}

export type Transaction = {
	id: string
	item: string
	description: string | null
	amount: number
	isIncome: boolean
	transactionDate: Date
	counterpart: Counterpart
	currency: Currency
	city: City
	country: Country
	category: TransactionCategory
	paymentMethod: PaymentMethod
	food: Food | null
	flight: Flight | null
	createdAt: string
	updatedAt: string
}

type Food = {
	id: string
	placeCategory: FoodPlaceCategory
	typeCategory: FoodTypeCategory
	isEatIn: boolean | null
	isTakeAway: boolean | null
	isLeftovers: boolean | null
	isDelivery: boolean | null
	isWorked: boolean | null
	createdAt: string
	updatedAt: string
}

type Flight = {
	id: string
	luggageCategory: FlightLuggageCategory
	segments: FlightSegment[]
	createdAt: string
	updatedAt: string
}

type FlightSegment = {
	id: string
	departureAirport: Airport
	arrivalAirport: Airport
	airline: Airline
	class: FlightClass
	seatCategory: FlightSeatCategory
	createdAt: string
	updatedAt: string
}

export const useDatabase = create<Database>()((set) => ({
	cities: [],
	setCities: (cities: City[]) => {
		set({ cities })
	},
	countries: [],
	setCountries: (countries: Country[]) => {
		set({ countries })
	},
	currencies: [],
	setCurrencies: (currencies: Currency[]) => {
		set({ currencies })
	},
	airports: [],
	setAirports: (airports: Airport[]) => {
		set({ airports })
	},
	airlines: [],
	setAirlines: (airlines: Airline[]) => {
		set({ airlines })
	},
	airlineAlliances: [],
	setAirlineAlliances: (airlineAlliances: AirlineAlliance[]) => {
		set({ airlineAlliances })
	},
	flightClasses: [],
	setFlightClasses: (flightClasses: FlightClass[]) => {
		set({ flightClasses })
	},
	flightLuggageCategories: [],
	setFlightLuggageCategories: (
		flightLuggageCategories: FlightLuggageCategory[],
	) => {
		set({ flightLuggageCategories })
	},
	flightSeatCategories: [],
	setFlightSeatCategories: (flightSeatCategories: FlightSeatCategory[]) => {
		set({ flightSeatCategories })
	},
	loyaltyPrograms: [],
	setLoyaltyPrograms: (loyaltyPrograms: LoyaltyProgram[]) => {
		set({ loyaltyPrograms })
	},
	paymentMethodCategories: [],
	setPaymentMethodCategories: (
		paymentMethodCategories: PaymentMethodCategory[],
	) => {
		set({ paymentMethodCategories })
	},
	transactionCategories: [],
	setTransactionCategories: (
		transactionCategories: TransactionCategory[],
	) => {
		set({ transactionCategories })
	},
	foodPlaceCategories: [],
	setFoodPlaceCategories: (foodPlaceCategories: FoodPlaceCategory[]) => {
		set({ foodPlaceCategories })
	},
	foodTypeCategories: [],
	setFoodTypeCategories: (foodTypeCategories: FoodTypeCategory[]) => {
		set({ foodTypeCategories })
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
	isAdmin: undefined,
	setIsAdmin: (isAdmin: boolean | undefined) => {
		set({ isAdmin })
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
	paymentMethods: [],
	setPaymentMethods: (paymentMethods: PaymentMethod[]) => {
		set({ paymentMethods })
	},
}))
