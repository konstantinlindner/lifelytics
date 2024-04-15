import {
	AccommodationCategory,
	AccommodationType,
	Airline,
	AirlineAlliance,
	Airport,
	CarCategory,
	City,
	Counterpart,
	Country,
	Currency,
	EatInTakeAway,
	FlightClass,
	FlightLuggageCategory,
	FlightSeatCategory,
	FoodAndDrinkPlaceCategory,
	FoodAndDrinkTypeCategory,
	HealthAndWellnessCategory,
	HomeCategory,
	LoyaltyProgram,
	PaymentMethodCategory,
	ShoppingCategory,
	TransactionCategory,
	TransportationCategory,
} from '@/types/globals.types'

import { create } from 'zustand'

type Database = {
	accommodationCategories: AccommodationCategory[]
	setAccommodationCategories: (
		accommodationCategories: AccommodationCategory[],
	) => void
	airlineAlliances: AirlineAlliance[]
	setAirlineAlliances: (airlineAlliances: AirlineAlliance[]) => void
	airlines: Airline[]
	setAirlines: (airlines: Airline[]) => void
	airports: Airport[]
	setAirports: (airports: Airport[]) => void
	carCategories: CarCategory[]
	setCarCategories: (carCategories: CarCategory[]) => void
	cities: City[]
	setCities: (cities: City[]) => void
	countries: Country[]
	setCountries: (countries: Country[]) => void
	currencies: Currency[]
	setCurrencies: (currencies: Currency[]) => void
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
	foodAndDrinkPlaceCategories: FoodAndDrinkPlaceCategory[]
	setFoodAndDrinkPlaceCategories: (
		foodAndDrinkPlaceCategories: FoodAndDrinkPlaceCategory[],
	) => void
	foodAndDrinkTypeCategories: FoodAndDrinkTypeCategory[]
	setFoodAndDrinkTypeCategories: (
		foodAndDrinkTypeCategories: FoodAndDrinkTypeCategory[],
	) => void
	healthAndWellnessCategories: HealthAndWellnessCategory[]
	setHealthAndWellnessCategories: (
		healthAndWellnessCategories: HealthAndWellnessCategory[],
	) => void
	homeCategories: HomeCategory[]
	setHomeCategories: (homeCategories: HomeCategory[]) => void
	loyaltyPrograms: LoyaltyProgram[]
	setLoyaltyPrograms: (loyaltyPrograms: LoyaltyProgram[]) => void
	paymentMethodCategories: PaymentMethodCategory[]
	setPaymentMethodCategories: (
		paymentMethodCategories: PaymentMethodCategory[],
	) => void
	shoppingCategories: ShoppingCategory[]
	setShoppingCategories: (shoppingCategories: ShoppingCategory[]) => void
	transactionCategories: TransactionCategory[]
	setTransactionCategories: (
		transactionCategories: TransactionCategory[],
	) => void
	transportationCategories: TransportationCategory[]
	setTransportationCategories: (
		transportationCategories: TransportationCategory[],
	) => void
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
	createdAt: string | undefined
	setCreatedAt: (createdAt: string) => void
	updatedAt: string | undefined
	setUpdatedAt: (updatedAt: string) => void
}

export type PaymentMethod = {
	id: string
	name: string
	category: PaymentMethodCategory
	loyaltyProgram: LoyaltyProgram | null
	createdAt: string
	updatedAt: string
}

export type Transaction = {
	id: string
	item: string
	description: string | null
	amount: number
	tip: number | null
	isIncome: boolean
	transactionDate: Date
	counterpart: Counterpart
	currency: Currency
	city: City
	country: Country
	category: TransactionCategory
	paymentMethod: PaymentMethod
	foodAndDrinkTransaction: FoodAndDrinkTransaction | null
	healthAndWellnessTransaction: HealthAndWellnessTransaction | null
	homeTransaction: HomeTransaction | null
	shoppingTransaction: ShoppingTransaction | null
	transportationTransaction: TransportationTransaction | null
	createdAt: string
	updatedAt: string
}
type FoodAndDrinkTransaction = {
	id: string
	placeCategory: FoodAndDrinkPlaceCategory
	typeCategory: FoodAndDrinkTypeCategory
	eatInTakeAway: EatInTakeAway | null
	isLeftovers: boolean | null
	isDelivery: boolean | null
	isWorked: boolean | null
	createdAt: string
	updatedAt: string
}

type HealthAndWellnessTransaction = {
	id: string
	category: HealthAndWellnessCategory
	createdAt: string
	updatedAt: string
}

type HomeTransaction = {
	id: string
	category: HomeCategory
	accommodationTransaction: AccommodationTransaction | null
	createdAt: string
	updatedAt: string
}

type AccommodationTransaction = {
	id: string
	category: AccommodationCategory
	createdAt: string
	updatedAt: string
}

type ShoppingTransaction = {
	id: string
	category: ShoppingCategory
	createdAt: string
	updatedAt: string
}

type TransportationTransaction = {
	id: string
	category: TransportationCategory
	flightTransaction: FlightTransaction | null
	carTransaction: CarTransaction | null
	createdAt: string
	updatedAt: string
}

type FlightTransaction = {
	id: string
	luggageCategory: FlightLuggageCategory
	segments: FlightTransactionSegment[]
	createdAt: string
	updatedAt: string
}

export type FlightTransactionSegment = {
	id: string
	order: number
	departureAirport: Airport
	arrivalAirport: Airport
	airline: Airline
	class: FlightClass
	seatCategory: FlightSeatCategory
	createdAt: string
	updatedAt: string
}

type CarTransaction = {
	id: string
	category: CarCategory
	createdAt: string
	updatedAt: string
}

export const useDatabase = create<Database>()((set) => ({
	accommodationCategories: [],
	setAccommodationCategories: (
		accommodationCategories: AccommodationCategory[],
	) => {
		set({ accommodationCategories })
	},
	airlineAlliances: [],
	setAirlineAlliances: (airlineAlliances: AirlineAlliance[]) => {
		set({ airlineAlliances })
	},
	airlines: [],
	setAirlines: (airlines: Airline[]) => {
		set({ airlines })
	},
	airports: [],
	setAirports: (airports: Airport[]) => {
		set({ airports })
	},
	carCategories: [],
	setCarCategories: (carCategories: CarCategory[]) => {
		set({ carCategories })
	},
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
	foodAndDrinkPlaceCategories: [],
	setFoodAndDrinkPlaceCategories: (
		foodAndDrinkPlaceCategories: FoodAndDrinkPlaceCategory[],
	) => {
		set({ foodAndDrinkPlaceCategories })
	},
	foodAndDrinkTypeCategories: [],
	setFoodAndDrinkTypeCategories: (
		foodAndDrinkTypeCategories: FoodAndDrinkTypeCategory[],
	) => {
		set({ foodAndDrinkTypeCategories })
	},
	healthAndWellnessCategories: [],
	setHealthAndWellnessCategories: (
		healthAndWellnessCategories: HealthAndWellnessCategory[],
	) => {
		set({ healthAndWellnessCategories })
	},
	homeCategories: [],
	setHomeCategories: (homeCategories: HomeCategory[]) => {
		set({ homeCategories })
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
	shoppingCategories: [],
	setShoppingCategories: (shoppingCategories: ShoppingCategory[]) => {
		set({ shoppingCategories })
	},
	transactionCategories: [],
	setTransactionCategories: (
		transactionCategories: TransactionCategory[],
	) => {
		set({ transactionCategories })
	},
	transportationCategories: [],
	setTransportationCategories: (
		transportationCategories: TransportationCategory[],
	) => {
		set({ transportationCategories })
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
