import { EatInTakeAway } from '@/types/globals.types'

import supabase from '@/lib/supabase'

// auth
type AuthProps = {
	email: string
	password: string
}

export async function signIn({ email, password }: AuthProps) {
	const { error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	})

	return { error }
}

export async function signUp({ email, password }: AuthProps) {
	const { error } = await supabase.auth.signUp({
		email: email,
		password: password,
	})

	return { error }
}

export async function signOut() {
	const { error } = await supabase.auth.signOut()

	return { error }
}

// select
export async function fetchSession() {
	const { data, error } = await supabase.auth.getSession()

	return { error, data }
}

export async function fetchProfile() {
	const { data: profile, error } = await supabase
		.from('profiles')
		.select()
		.single()

	return { profile, error }
}

export async function fetchTransactions() {
	const { data: transactions, error } = await supabase
		.from('transactions')
		.select()

	return { transactions, error }
}

export async function fetchFoodAndDrinkTransactions() {
	const { data: foodAndDrinkTransactions, error } = await supabase
		.from('foodAndDrinkTransactions')
		.select()

	return { foodAndDrinkTransactions, error }
}

export async function fetchHealthAndWellnessTransactions() {
	try {
		const { data: healthAndWellnessTransactions, error } = await supabase
			.from('healthAndWellnessTransactions')
			.select()

		if (error) throw error

		if (!healthAndWellnessTransactions) {
			console.error('No health and wellness transactions found')
			return
		}

		return healthAndWellnessTransactions
	} catch (error) {
		console.error('Error fetching health and wellness transactions:', error)
	}
}

export async function fetchHomeTransactions() {
	try {
		const { data: homeTransactions, error } = await supabase
			.from('homeTransactions')
			.select()

		if (error) throw error

		if (!homeTransactions) {
			console.error('No home transactions found')
			return
		}

		return homeTransactions
	} catch (error) {
		console.error('Error fetching home transactions:', error)
	}
}

export async function fetchAccommodationTransactions() {
	try {
		const { data: accommodationTransactions, error } = await supabase
			.from('accommodationTransactions')
			.select()

		if (error) throw error

		if (!accommodationTransactions) {
			console.error('No accommodation transactions found')
			return
		}

		return accommodationTransactions
	} catch (error) {
		console.error('Error fetching accommodation transactions:', error)
	}
}

export async function fetchShoppingTransactions() {
	try {
		const { data: shoppingTransactions, error } = await supabase
			.from('shoppingTransactions')
			.select()

		if (error) throw error

		if (!shoppingTransactions) {
			console.error('No shopping transactions found')
			return
		}

		return shoppingTransactions
	} catch (error) {
		console.error('Error fetching shopping transactions:', error)
	}
}

export async function fetchTransportationTransactions() {
	try {
		const { data: transportationTransactions, error } = await supabase
			.from('transportationTransactions')
			.select()

		if (error) throw error

		if (!transportationTransactions) {
			console.error('No transportation transactions found')
			return
		}

		return transportationTransactions
	} catch (error) {
		console.error('Error fetching transportation transactions:', error)
	}
}

export async function fetchFlightTransactions() {
	try {
		const { data: flightTransactions, error } = await supabase
			.from('flightTransactions')
			.select()

		if (error) throw error

		if (!flightTransactions) {
			console.error('No flight transactions found')
			return
		}

		return flightTransactions
	} catch (error) {
		console.error('Error fetching flight transactions:', error)
	}
}

export async function fetchFlightTransactionSegments() {
	try {
		const { data: flightTransactionSegments, error } = await supabase
			.from('flightTransactionSegments')
			.select()

		if (error) throw error

		if (!flightTransactionSegments) {
			console.error('No flight segments found')
			return
		}

		return flightTransactionSegments
	} catch (error) {
		console.error('Error fetching flight segments:', error)
	}
}

export async function fetchCarTransactions() {
	try {
		const { data: carTransactions, error } = await supabase
			.from('carTransactions')
			.select()

		if (error) throw error

		if (!carTransactions) {
			console.error('No car transactions found')
			return
		}

		return carTransactions
	} catch (error) {
		console.error('Error fetching car transactions:', error)
	}
}

export async function fetchCounterparts() {
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

export async function fetchPaymentMethods() {
	try {
		const { data: paymentMethods, error } = await supabase
			.from('paymentMethods')
			.select()

		if (error) throw error

		if (!paymentMethods) {
			console.error('No counterparts found')
			return
		}

		return paymentMethods
	} catch (error) {
		console.error('Error fetching payment methods:', error)
	}
}

export async function fetchCities() {
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

export async function fetchCountries() {
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

export async function fetchCurrencies() {
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

export async function fetchAirports() {
	try {
		const { data: airports, error } = await supabase
			.from('airports')
			.select()

		if (error) throw error

		if (!airports) {
			console.error('No airports found')
			return
		}

		return airports
	} catch (error) {
		console.error('Error fetching airports:', error)
	}
}

export async function fetchAirlines() {
	try {
		const { data: airlines, error } = await supabase
			.from('airlines')
			.select()

		if (error) throw error

		if (!airlines) {
			console.error('No airlines found')
			return
		}

		return airlines
	} catch (error) {
		console.error('Error fetching airlines:', error)
	}
}

export async function fetchAirlineAlliances() {
	try {
		const { data: airlineAlliances, error } = await supabase
			.from('airlineAlliances')
			.select()

		if (error) throw error

		if (!airlineAlliances) {
			console.error('No airline alliances found')
			return
		}

		return airlineAlliances
	} catch (error) {
		console.error('Error fetching airline alliances:', error)
	}
}

export async function fetchFlightClasses() {
	try {
		const { data: flightClasses, error } = await supabase
			.from('flightClasses')
			.select()

		if (error) throw error

		if (!flightClasses) {
			console.error('No flight classes found')
			return
		}

		return flightClasses
	} catch (error) {
		console.error('Error fetching flight classes:', error)
	}
}

export async function fetchFlightLuggageCategories() {
	try {
		const { data: flightLuggageCategories, error } = await supabase
			.from('flightLuggageCategories')
			.select()

		if (error) throw error

		if (!flightLuggageCategories) {
			console.error('No flight luggage categories found')
			return
		}

		return flightLuggageCategories
	} catch (error) {
		console.error('Error fetching flight luggage categories:', error)
	}
}

export async function fetchFlightSeatCategories() {
	try {
		const { data: flightSeatCategories, error } = await supabase
			.from('flightSeatCategories')
			.select()

		if (error) throw error

		if (!flightSeatCategories) {
			console.error('No flight seat categories found')
			return
		}

		return flightSeatCategories
	} catch (error) {
		console.error('Error fetching flight seat categories:', error)
	}
}

export async function fetchLoyaltyPrograms() {
	try {
		const { data: loyaltyPrograms, error } = await supabase
			.from('loyaltyPrograms')
			.select()

		if (error) throw error

		if (!loyaltyPrograms) {
			console.error('No loyalty programs found')
			return
		}

		return loyaltyPrograms
	} catch (error) {
		console.error('Error fetching loyalty programs:', error)
	}
}

export async function fetchPaymentMethodCategories() {
	try {
		const { data: paymentMethodCategories, error } = await supabase
			.from('paymentMethodCategories')
			.select()

		if (error) throw error

		if (!paymentMethodCategories) {
			console.error('No payment method categories found')
			return
		}

		return paymentMethodCategories
	} catch (error) {
		console.error('Error fetching payment method categories:', error)
	}
}

export async function fetchTransactionCategories() {
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

export async function fetchFoodAndDrinkPlaceCategories() {
	try {
		const { data: foodAndDrinkPlaceCategories, error } = await supabase
			.from('foodAndDrinkPlaceCategories')
			.select()

		if (error) throw error

		if (!foodAndDrinkPlaceCategories) {
			console.error('No food and drink place categories found')
			return
		}

		return foodAndDrinkPlaceCategories
	} catch (error) {
		console.error('Error fetching food and drink place categories:', error)
	}
}

export async function fetchFoodAndDrinkTypeCategories() {
	try {
		const { data: foodAndDrinkTypeCategories, error } = await supabase
			.from('foodAndDrinkTypeCategories')
			.select()

		if (error) throw error

		if (!foodAndDrinkTypeCategories) {
			console.error('No food and drink type categories found')
			return
		}

		return foodAndDrinkTypeCategories
	} catch (error) {
		console.error('Error fetching food and drink type categories:', error)
	}
}

export async function fetchHealthAndWellnessCategories() {
	try {
		const { data: healthAndWellnessCategories, error } = await supabase
			.from('healthAndWellnessCategories')
			.select()

		if (error) throw error

		if (!healthAndWellnessCategories) {
			console.error('No health and wellness categories found')
			return
		}

		return healthAndWellnessCategories
	} catch (error) {
		console.error('Error fetching health and wellness categories:', error)
	}
}

export async function fetchHomeCategories() {
	try {
		const { data: homeCategories, error } = await supabase
			.from('homeCategories')
			.select()

		if (error) throw error

		if (!homeCategories) {
			console.error('No home categories found')
			return
		}

		return homeCategories
	} catch (error) {
		console.error('Error fetching home categories:', error)
	}
}

export async function fetchAccommodationCategories() {
	try {
		const { data: accommodationCategories, error } = await supabase
			.from('accommodationCategories')
			.select()

		if (error) throw error

		if (!accommodationCategories) {
			console.error('No accommodation categories found')
			return
		}

		return accommodationCategories
	} catch (error) {
		console.error('Error fetching accommodation categories:', error)
	}
}

export async function fetchShoppingCategories() {
	try {
		const { data: shoppingCategories, error } = await supabase
			.from('shoppingCategories')
			.select()

		if (error) throw error

		if (!shoppingCategories) {
			console.error('No shopping categories found')
			return
		}

		return shoppingCategories
	} catch (error) {
		console.error('Error fetching shopping categories:', error)
	}
}

export async function fetchTransportationCategories() {
	try {
		const { data: transportationCategories, error } = await supabase
			.from('transportationCategories')
			.select()

		if (error) throw error

		if (!transportationCategories) {
			console.error('No transportation categories found')
			return
		}

		return transportationCategories
	} catch (error) {
		console.error('Error fetching transportation categories:', error)
	}
}

export async function fetchCarCategories() {
	try {
		const { data: carCategories, error } = await supabase
			.from('carCategories')
			.select()

		if (error) throw error

		if (!carCategories) {
			console.error('No car categories found')
			return
		}

		return carCategories
	} catch (error) {
		console.error('Error fetching car categories:', error)
	}
}

// update
type UpdateEmailProps = {
	email: string
}

export async function updateEmail({ email }: UpdateEmailProps) {
	const { error } = await supabase.auth.updateUser({
		email: email,
	})

	return { error }
}

type UpdateFirstNameProps = {
	userId: string
	firstName: string
}

export async function updateFirstName({
	userId,
	firstName,
}: UpdateFirstNameProps) {
	const { error } = await supabase
		.from('profiles')
		.update({ firstName: firstName })
		.eq('id', userId)

	return { error }
}

type UpdateLastNameProps = {
	userId: string
	lastName: string
}

export async function updateLastName({
	userId,
	lastName,
}: UpdateLastNameProps) {
	const { error } = await supabase
		.from('profiles')
		.update({ lastName: lastName })
		.eq('id', userId)

	return { error }
}

type UpdateBirthDateProps = {
	userId: string
	birthDate: string
}

export async function updateBirthDate({
	userId,
	birthDate,
}: UpdateBirthDateProps) {
	const { error } = await supabase
		.from('profiles')
		.update({ birthDate: birthDate })
		.eq('id', userId)

	return { error }
}

type UpdateWebsiteProps = {
	userId: string
	website: string | null
}

export async function updateWebsite({ userId, website }: UpdateWebsiteProps) {
	const { error } = await supabase
		.from('profiles')
		.update({ website: website })
		.eq('id', userId)

	return { error }
}

type UpdateAvatarUrlProps = {
	userId: string
	avatarUrl: string | null
}

export async function updateAvatarUrl({
	userId,
	avatarUrl,
}: UpdateAvatarUrlProps) {
	const { error } = await supabase
		.from('profiles')
		.update({ avatarUrl: avatarUrl })
		.eq('id', userId)

	return { error }
}

type UpdateOnboardingCompletedDateProps = {
	userId: string
	onboardingCompletedDate: string | null
}

export async function updateOnboardingCompletedDate({
	userId,
	onboardingCompletedDate,
}: UpdateOnboardingCompletedDateProps) {
	const { error } = await supabase
		.from('profiles')
		.update({
			onboardingCompletedDate: onboardingCompletedDate,
		})
		.eq('id', userId)

	return { error }
}

type UpdatePrimaryCurrencyProps = {
	userId: string
	currencyId: string
}

export async function updatePrimaryCurrency({
	userId,
	currencyId,
}: UpdatePrimaryCurrencyProps) {
	const { error } = await supabase
		.from('profiles')
		.update({ primaryCurrency: currencyId })
		.eq('id', userId)

	return { error }
}

type UpdateCityProps = {
	userId: string
	cityId: number
}

export async function updateCity({ userId, cityId }: UpdateCityProps) {
	const { error } = await supabase
		.from('profiles')
		.update({ city: cityId })
		.eq('id', userId)

	return { error }
}

type UpdateCounterpartProps = {
	counterpartId: string
	updateData: {
		name?: string
		isIncome?: boolean
		isExpense?: boolean
	}
}

// todo set updatedAt
export async function updateCounterpart({
	counterpartId,
	updateData,
}: UpdateCounterpartProps) {
	const { data, error } = await supabase
		.from('counterparts')
		.update(updateData)
		.eq('id', counterpartId)
		.select()

	const updatedCounterpart = data ? data[0] : null

	return { updatedCounterpart, error }
}

// insert
type InsertCounterpartProps = {
	userId: string
	name: string
	isIncome: boolean
	isExpense: boolean
}

export async function insertCounterpart({
	userId,
	name,
	isIncome,
	isExpense,
}: InsertCounterpartProps) {
	const { data, error } = await supabase
		.from('counterparts')
		.insert({
			user: userId,
			name: name,
			isIncome: isIncome,
			isExpense: isExpense,
		})
		.select()

	const newCounterpart = data ? data[0] : null

	return { newCounterpart, error }
}

type InsertFoodAndDrinkTransactionProps = {
	parentTransactionId: string
	placeCategoryId: number
	typeCategoryId: number
	eatInTakeAway?: EatInTakeAway
	isLeftovers?: boolean
	isDelivery?: boolean
	isWorked?: boolean
}

export async function insertFoodAndDrinkTransaction({
	parentTransactionId,
	placeCategoryId,
	typeCategoryId,
	eatInTakeAway,
	isLeftovers,
	isDelivery,
	isWorked,
}: InsertFoodAndDrinkTransactionProps) {
	const { data, error } = await supabase
		.from('foodAndDrinkTransactions')
		.insert({
			transaction: parentTransactionId,
			placeCategory: placeCategoryId,
			typeCategory: typeCategoryId,
			eatInTakeAway: eatInTakeAway,
			isLeftovers: isLeftovers,
			isDelivery: isDelivery,
			isWorked: isWorked,
		})
		.select()

	const newFoodAndDrinkTransaction = data ? data[0] : null

	return { newFoodAndDrinkTransaction, error }
}

type InsertHealthAndWellnessTransactionProps = {
	parentTransactionId: string
	categoryId: number
}

export async function insertHealthAndWellnessTransaction({
	parentTransactionId,
	categoryId,
}: InsertHealthAndWellnessTransactionProps) {
	const { data, error } = await supabase
		.from('healthAndWellnessTransactions')
		.insert({
			transaction: parentTransactionId,
			category: categoryId,
		})
		.select()

	const newHealthAndWellnessTransaction = data ? data[0] : null

	return { newHealthAndWellnessTransaction, error }
}

type InsertAccommodationTransactionProps = {
	parentHomeTransactionId: string
	categoryId: number
}

export async function insertAccommodationTransaction({
	parentHomeTransactionId,
	categoryId,
}: InsertAccommodationTransactionProps) {
	const { data, error } = await supabase
		.from('accommodationTransactions')
		.insert({
			homeTransaction: parentHomeTransactionId,
			category: categoryId,
		})
		.select()

	const newAccommodationTransaction = data ? data[0] : null

	return { newAccommodationTransaction, error }
}

type InsertHomeTransactionProps = {
	parentTransactionId: string
	categoryId: number
}

export async function insertHomeTransaction({
	parentTransactionId,
	categoryId,
}: InsertHomeTransactionProps) {
	const { data, error } = await supabase
		.from('homeTransactions')
		.insert({
			transaction: parentTransactionId,
			category: categoryId,
		})
		.select()

	const newHomeTransaction = data ? data[0] : null

	return { newHomeTransaction, error }
}

type InsertShoppingTransactionProps = {
	parentTransactionId: string
	categoryId: number
}

export async function insertShoppingTransaction({
	parentTransactionId,
	categoryId,
}: InsertShoppingTransactionProps) {
	const { data, error } = await supabase
		.from('shoppingTransactions')
		.insert({
			transaction: parentTransactionId,
			category: categoryId,
		})
		.select()

	const newShoppingTransaction = data ? data[0] : null

	return { newShoppingTransaction, error }
}

type InsertFlightTransactionSegment = {
	parentFlightTransactionId: string
	order: number
	departureAirportId: number
	arrivalAirportId: number
	airlineId: number
	classId: number
	seatCategoryId: number
}

export async function insertFlightTransactionSegment({
	parentFlightTransactionId,
	order,
	departureAirportId,
	arrivalAirportId,
	airlineId,
	classId,
	seatCategoryId,
}: InsertFlightTransactionSegment) {
	const { data, error } = await supabase
		.from('flightTransactionSegments')
		.insert({
			flightTransaction: parentFlightTransactionId,
			order: order,
			departureAirport: departureAirportId,
			arrivalAirport: arrivalAirportId,
			airline: airlineId,
			class: classId,
			seatCategory: seatCategoryId,
		})
		.select()

	const newFlightTransactionSegment = data ? data[0] : null

	return { newFlightTransactionSegment, error }
}

type InsertFlightTransactionProps = {
	parentTransportationTransactionId: string
	flyOutDate: string
	luggageCategoryId: number
}

export async function insertFlightTransaction({
	parentTransportationTransactionId,
	flyOutDate,
	luggageCategoryId,
}: InsertFlightTransactionProps) {
	const { data, error } = await supabase
		.from('flightTransactions')
		.insert({
			transportationTransaction: parentTransportationTransactionId,
			flyOutDate: flyOutDate,
			luggageCategory: luggageCategoryId,
		})
		.select()

	const newFlightTransaction = data ? data[0] : null

	return { newFlightTransaction, error }
}

type InsertCarTransactionProps = {
	parentTransportationTransactionId: string
	categoryId: number
}

export async function insertCarTransaction({
	parentTransportationTransactionId,
	categoryId,
}: InsertCarTransactionProps) {
	const { data, error } = await supabase
		.from('carTransactions')
		.insert({
			transportationTransaction: parentTransportationTransactionId,
			category: categoryId,
		})
		.select()

	const newCarTransaction = data ? data[0] : null

	return { newCarTransaction, error }
}

type InsertTransportationTransactionProps = {
	parentTransactionId: string
	categoryId: number
}

export async function insertTransportationTransaction({
	parentTransactionId,
	categoryId,
}: InsertTransportationTransactionProps) {
	const { data, error } = await supabase
		.from('transportationTransactions')
		.insert({
			transaction: parentTransactionId,
			category: categoryId,
		})
		.select()

	const newTransportationTransaction = data ? data[0] : null

	return { newTransportationTransaction, error }
}

type InsertTransactionProps = {
	userId: string
	transactionDate: string
	item: string
	amount: number
	tip: number | null
	counterpartId: string
	description: string | null
	currencyId: string
	cityId: number
	categoryId: number
	paymentMethodId: string
}

export async function insertTransaction({
	userId,
	transactionDate,
	item,
	amount,
	tip,
	counterpartId,
	description,
	currencyId,
	cityId,
	categoryId,
	paymentMethodId,
}: InsertTransactionProps) {
	const { data, error } = await supabase
		.from('transactions')
		.insert({
			user: userId,
			item: item,
			amount: amount,
			tip: tip,
			city: cityId,
			currency: currencyId,
			transactionDate: transactionDate,
			description: description,
			counterpart: counterpartId,
			category: categoryId,
			paymentMethod: paymentMethodId,
		})
		.select()

	const newTransaction = data ? data[0] : null

	return { newTransaction, error }
}

// delete
type DeleteTransactionProps = {
	transactionId: string
}

export async function deleteTransaction({
	transactionId,
}: DeleteTransactionProps) {
	const { error } = await supabase
		.from('transactions')
		.delete()
		.eq('id', transactionId)

	return { error }
}
