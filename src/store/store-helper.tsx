import {
	City,
	Currency,
	EatInTakeAway,
	TransactionCategory,
} from '@/types/globals.types'

import {
	deleteTransaction,
	fetchAccommodationCategories,
	fetchAccommodationTransactions,
	fetchAirlineAlliances,
	fetchAirlines,
	fetchAirports,
	fetchCarCategories,
	fetchCarTransactions,
	fetchCities,
	fetchCounterparts,
	fetchCountries,
	fetchCurrencies,
	fetchFlightClasses,
	fetchFlightLuggageCategories,
	fetchFlightSeatCategories,
	fetchFlightTransactionSegments,
	fetchFlightTransactions,
	fetchFoodAndDrinkPlaceCategories,
	fetchFoodAndDrinkTransactions,
	fetchFoodAndDrinkTypeCategories,
	fetchHealthAndWellnessCategories,
	fetchHealthAndWellnessTransactions,
	fetchHomeCategories,
	fetchHomeTransactions,
	fetchLoyaltyPrograms,
	fetchPaymentMethodCategories,
	fetchPaymentMethods,
	fetchProfile,
	fetchSession,
	fetchShoppingCategories,
	fetchShoppingTransactions,
	fetchTransactionCategories,
	fetchTransactions,
	fetchTransportationCategories,
	fetchTransportationTransactions,
	insertAccommodationTransaction,
	insertCarTransaction,
	insertCounterpart,
	insertFlightTransaction,
	insertFlightTransactionSegment,
	insertFoodAndDrinkTransaction,
	insertHealthAndWellnessTransaction,
	insertHomeTransaction,
	insertShoppingTransaction,
	insertTransaction,
	insertTransportationTransaction,
	signIn,
	signOut,
	signUp,
	updateAvatarUrl,
	updateBirthDate,
	updateCity,
	updateCounterpart,
	updateEmail,
	updateFirstName,
	updateLastName,
	updateOnboardingCompletedDate,
	updatePrimaryCurrency,
	updateWebsite,
} from '@/database/queries'

import {
	FlightTransactionSegment,
	PaymentMethod,
	Transaction,
	useDatabase,
	useUser,
} from '@/store/use-store'

import { cn } from '@/lib/utils'

import dayjs from 'dayjs'

import {
	BaggageClaimIcon,
	BriefcaseBusinessIcon,
	CarIcon,
	CircleDollarSignIcon,
	CoinsIcon,
	CreditCardIcon,
	DramaIcon,
	GiftIcon,
	HeartIcon,
	HomeIcon,
	PercentIcon,
	ReceiptIcon,
	RotateCwIcon,
	ShoppingBagIcon,
	Undo2Icon,
	UtensilsCrossedIcon,
} from 'lucide-react'

// setup the store
export async function InitializeStore() {
	// set database
	const setCities = useDatabase.getState().setCities
	const setCountries = useDatabase.getState().setCountries
	const setCurrencies = useDatabase.getState().setCurrencies
	const setAirports = useDatabase.getState().setAirports
	const setAirlines = useDatabase.getState().setAirlines
	const setAirlineAlliances = useDatabase.getState().setAirlineAlliances
	const setFlightClasses = useDatabase.getState().setFlightClasses
	const setFlightLuggageCategories =
		useDatabase.getState().setFlightLuggageCategories
	const setFlightSeatCategories =
		useDatabase.getState().setFlightSeatCategories
	const setLoyaltyPrograms = useDatabase.getState().setLoyaltyPrograms
	const setPaymentMethodCategories =
		useDatabase.getState().setPaymentMethodCategories
	const setTransactionCategories =
		useDatabase.getState().setTransactionCategories
	const setFoodAndDrinkPlaceCategories =
		useDatabase.getState().setFoodAndDrinkPlaceCategories
	const setFoodAndDrinkTypeCategories =
		useDatabase.getState().setFoodAndDrinkTypeCategories
	const setHealthAndWellnessCategories =
		useDatabase.getState().setHealthAndWellnessCategories
	const setHomeCategories = useDatabase.getState().setHomeCategories
	const setAccommodationCategories =
		useDatabase.getState().setAccommodationCategories
	const setShoppingCategories = useDatabase.getState().setShoppingCategories
	const setTransportationCategories =
		useDatabase.getState().setTransportationCategories
	const setCarCategories = useDatabase.getState().setCarCategories

	const [
		cities,
		countries,
		currencies,
		airports,
		airlines,
		airlineAlliances,
		flightClasses,
		flightLuggageCategories,
		flightSeatCategories,
		loyaltyPrograms,
		paymentMethodCategories,
		transactionCategories,
		foodAndDrinkPlaceCategories,
		foodAndDrinkTypeCategories,
		healthAndWellnessCategories,
		homeCategories,
		accommodationCategories,
		shoppingCategories,
		transportationCategories,
		carCategories,
	] = await Promise.all([
		fetchCities(),
		fetchCountries(),
		fetchCurrencies(),
		fetchAirports(),
		fetchAirlines(),
		fetchAirlineAlliances(),
		fetchFlightClasses(),
		fetchFlightLuggageCategories(),
		fetchFlightSeatCategories(),
		fetchLoyaltyPrograms(),
		fetchPaymentMethodCategories(),
		fetchTransactionCategories(),
		fetchFoodAndDrinkPlaceCategories(),
		fetchFoodAndDrinkTypeCategories(),
		fetchHealthAndWellnessCategories(),
		fetchHomeCategories(),
		fetchAccommodationCategories(),
		fetchShoppingCategories(),
		fetchTransportationCategories(),
		fetchCarCategories(),
	])

	if (cities) setCities(cities)
	if (countries) setCountries(countries)
	if (currencies) setCurrencies(currencies)
	if (airports) setAirports(airports)
	if (airlines) setAirlines(airlines)
	if (airlineAlliances) setAirlineAlliances(airlineAlliances)
	if (flightClasses) setFlightClasses(flightClasses)
	if (flightLuggageCategories)
		setFlightLuggageCategories(flightLuggageCategories)
	if (flightSeatCategories) setFlightSeatCategories(flightSeatCategories)
	if (loyaltyPrograms) setLoyaltyPrograms(loyaltyPrograms)
	if (paymentMethodCategories)
		setPaymentMethodCategories(paymentMethodCategories)
	if (transactionCategories) setTransactionCategories(transactionCategories)
	if (foodAndDrinkPlaceCategories)
		setFoodAndDrinkPlaceCategories(foodAndDrinkPlaceCategories)
	if (foodAndDrinkTypeCategories)
		setFoodAndDrinkTypeCategories(foodAndDrinkTypeCategories)
	if (healthAndWellnessCategories)
		setHealthAndWellnessCategories(healthAndWellnessCategories)
	if (homeCategories) setHomeCategories(homeCategories)
	if (accommodationCategories)
		setAccommodationCategories(accommodationCategories)
	if (shoppingCategories) setShoppingCategories(shoppingCategories)
	if (transportationCategories)
		setTransportationCategories(transportationCategories)
	if (carCategories) setCarCategories(carCategories)

	// set user
	const setId = useUser.getState().setId
	const setEmail = useUser.getState().setEmail
	const setIsAdmin = useUser.getState().setIsAdmin
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
	const setPaymentMethods = useUser.getState().setPaymentMethods

	const [
		session,
		profile,
		counterparts,
		paymentMethods,
		transactions,
		foodAndDrinkTransactions,
		healthAndWellnessTransactions,
		homeTransactions,
		accommodationTransactions,
		shoppingTransactions,
		transportationTransactions,
		flightTransactions,
		flightTransactionSegments,
		carTransactions,
	] = await Promise.all([
		fetchSession(),
		fetchProfile(),
		fetchCounterparts(),
		fetchPaymentMethods(),
		fetchTransactions(),
		fetchFoodAndDrinkTransactions(),
		fetchHealthAndWellnessTransactions(),
		fetchHomeTransactions(),
		fetchAccommodationTransactions(),
		fetchShoppingTransactions(),
		fetchTransportationTransactions(),
		fetchFlightTransactions(),
		fetchFlightTransactionSegments(),
		fetchCarTransactions(),
	])

	if (session) setEmail(session.user.email)
	if (profile) {
		setId(profile.id)
		setIsAdmin(profile.isAdmin)
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
		setCity(getCityFromId(profile.city))
		setCountry(getCountryFromCityId(profile.city))
		setPrimaryCurrency(getCurrencyFromId(profile.primaryCurrency))
	}
	if (counterparts) setCounterparts(counterparts)

	if (paymentMethods) {
		const formattedPaymentMethods = paymentMethods
			.map((paymentMethod) => {
				const category = getPaymentMethodCategoryFromId(
					paymentMethod.category,
				)

				if (!category) {
					console.error(
						`Error: Payment method with id: ${paymentMethod.id} does not have a category`,
					)
					return
				}

				return {
					id: paymentMethod.id,
					name: paymentMethod.name,
					category: category,
					loyaltyProgram: getLoyaltyProgramFromId(
						paymentMethod.loyaltyProgram,
					),
					createdAt: paymentMethod.createdAt,
					updatedAt: paymentMethod.updatedAt,
				}
			})
			.filter((paymentMethod): paymentMethod is PaymentMethod =>
				Boolean(paymentMethod),
			)

		setPaymentMethods(formattedPaymentMethods)
	}

	if (transactions) {
		const formattedTransactions = transactions
			.map((transaction) => {
				const foodAndDrinkTransaction = foodAndDrinkTransactions?.find(
					(transactionItem) =>
						transactionItem.transaction === transaction.id,
				)

				const formattedFoodAndDrinkTransaction = (() => {
					if (foodAndDrinkTransaction) {
						return {
							id: foodAndDrinkTransaction.id,
							placeCategory: getFoodAndDrinkPlaceCategoryFromId(
								foodAndDrinkTransaction.placeCategory,
							),
							typeCategory: getFoodAndDrinkTypeCategoryFromId(
								foodAndDrinkTransaction?.typeCategory,
							),
							eatInTakeAway:
								foodAndDrinkTransaction.eatInTakeAway,
							isLeftovers: foodAndDrinkTransaction.isLeftovers,
							isDelivery: foodAndDrinkTransaction.isDelivery,
							isWorked: foodAndDrinkTransaction.isWorked,
							createdAt: foodAndDrinkTransaction.createdAt,
							updatedAt: foodAndDrinkTransaction.updatedAt,
						}
					}
				})()

				const healthAndWellnessTransaction =
					healthAndWellnessTransactions?.find(
						(transactionItem) =>
							transactionItem.transaction === transaction.id,
					)

				const formattedHealthAndWellnessTransaction = (() => {
					if (healthAndWellnessTransaction) {
						return {
							id: healthAndWellnessTransaction.id,
							category: getHealthAndWellnessCategoryFromId(
								healthAndWellnessTransaction.category,
							),
							createdAt: healthAndWellnessTransaction.createdAt,
							updatedAt: healthAndWellnessTransaction.updatedAt,
						}
					}
				})()

				const homeTransaction = homeTransactions?.find(
					(transactionItem) =>
						transactionItem.transaction === transaction.id,
				)

				const formattedHomeTransaction = (() => {
					if (homeTransaction) {
						const accommodationTransaction =
							accommodationTransactions?.find(
								(transactionItem) =>
									transactionItem.homeTransaction ===
									homeTransaction.id,
							)

						const formattedAccommodationTransaction = (() => {
							if (accommodationTransaction) {
								return {
									id: accommodationTransaction.id,
									category: getAccommodationCategoryFromId(
										accommodationTransaction.category,
									),
									createdAt:
										accommodationTransaction.createdAt,
									updatedAt:
										accommodationTransaction.updatedAt,
								}
							}
						})()

						return {
							id: homeTransaction.id,
							category: getHomeCategoryFromId(
								homeTransaction.category,
							),
							accommodationTransaction:
								formattedAccommodationTransaction ?? null,
							createdAt: homeTransaction.createdAt,
							updatedAt: homeTransaction.updatedAt,
						}
					}
				})()

				const shoppingTransaction = shoppingTransactions?.find(
					(transaction) => transaction.transaction === transaction.id,
				)

				const formattedShoppingTransaction = (() => {
					if (shoppingTransaction) {
						return {
							id: shoppingTransaction.id,
							category: getShoppingCategoryFromId(
								shoppingTransaction.category,
							),
							createdAt: shoppingTransaction.createdAt,
							updatedAt: shoppingTransaction.updatedAt,
						}
					}
				})()

				const transportationTransaction =
					transportationTransactions?.find(
						(transaction) =>
							transaction.transaction === transaction.id,
					)

				const formattedTransportationTransaction = (() => {
					if (transportationTransaction) {
						const flightTransaction = flightTransactions?.find(
							(transactionItem) =>
								transactionItem.transportationTransaction ===
								transportationTransaction.id,
						)

						const formattedFlightTransaction = (() => {
							if (flightTransaction) {
								const flightTransactionSegmentChildren =
									flightTransactionSegments?.filter(
										(segment) =>
											segment.flightTransaction ===
											flightTransaction.id,
									)

								return {
									id: flightTransaction.id,
									luggageCategory:
										getFlightLuggageCategoryFromId(
											flightTransaction.luggageCategory,
										),
									segments:
										flightTransactionSegmentChildren?.map(
											(segment) => ({
												id: segment.id,
												order: segment.order,
												departureAirport:
													getAirportFromId(
														segment.departureAirport,
													),
												arrivalAirport:
													getAirportFromId(
														segment.arrivalAirport,
													),
												airline: getAirlineFromId(
													segment.airline,
												),
												class: getFlightClassFromId(
													segment.class,
												),
												seatCategory:
													getFlightSeatCategoryFromId(
														segment.seatCategory,
													),
												createdAt: segment.createdAt,
												updatedAt: segment.updatedAt,
											}),
										),
									createdAt: flightTransaction.createdAt,
									updatedAt: flightTransaction.updatedAt,
								}
							}
						})()

						const carTransaction = carTransactions?.find(
							(transactionItem) =>
								transactionItem.transportationTransaction ===
								transportationTransaction.id,
						)

						const formattedCarTransaction = (() => {
							if (carTransaction) {
								return {
									id: carTransaction.id,
									category: getCarCategoryFromId(
										carTransaction.category,
									),
									createdAt: carTransaction.createdAt,
									updatedAt: carTransaction.updatedAt,
								}
							}
						})()

						return {
							id: transportationTransaction.id,
							category: getTransportationCategoryFromId(
								transportationTransaction.category,
							),
							flightTransaction:
								formattedFlightTransaction ?? null,
							carTransaction: formattedCarTransaction ?? null,
							createdAt: transportationTransaction.createdAt,
							updatedAt: transportationTransaction.updatedAt,
						}
					}
				})()

				const transactionCategory = getTransactionCategoryFromId(
					transaction.category,
				)
				const isIncome = transactionCategory?.isIncome
				const counterpart = getCounterpartFromId(
					transaction.counterpart,
				)
				const currency = getCurrencyFromId(transaction.currency)
				const city = getCityFromId(transaction.city)
				const country = getCountryFromCityId(transaction.city)

				if (
					!transactionCategory ||
					!counterpart ||
					!currency ||
					!city ||
					!country ||
					isIncome === undefined
				) {
					console.error('Transaction data is incomplete')
					return
				}

				return {
					id: transaction.id,
					item: transaction.item,
					description: transaction.description,
					amount: transaction.amount,
					tip: transaction.tip,
					isIncome: isIncome,
					transactionDate: dayjs(
						transaction.transactionDate,
					).toDate(),
					counterpart: counterpart,
					currency: currency,
					city: city,
					country: country,
					category: transactionCategory,
					paymentMethod: getPaymentMethodFromId(
						transaction.paymentMethod,
					),
					foodAndDrinkTransaction:
						formattedFoodAndDrinkTransaction ?? null,
					healthAndWellnessTransaction:
						formattedHealthAndWellnessTransaction ?? null,
					homeTransaction: formattedHomeTransaction ?? null,
					shoppingTransaction: formattedShoppingTransaction ?? null,
					transportationTransaction:
						formattedTransportationTransaction ?? null,
					createdAt: transaction.createdAt,
					updatedAt: transaction.updatedAt,
				}
			})
			.filter((transaction): transaction is Transaction =>
				Boolean(transaction),
			)

		setTransactions(formattedTransactions)
	}
}

// helpers
type HandleSignInProps = {
	email: string
	password: string
}

export async function handleSignIn({ email, password }: HandleSignInProps) {
	const error = await signIn({ email: email, password: password })

	if (error) return error

	await InitializeStore()
}

type HandleSignUpProps = {
	email: string
	password: string
	firstName: string
	lastName: string
}

export async function handleSignUp({
	email,
	password,
	firstName,
	lastName,
}: HandleSignUpProps) {
	const error = await signUp({
		email: email,
		password: password,
	})

	if (error) return error

	await InitializeStore()

	const userId = useUser.getState().id

	await updateFirstName({ userId: userId ?? '', firstName: firstName })
	await updateLastName({ userId: userId ?? '', lastName: lastName })
}

export async function handleSignOut() {
	const error = await signOut()

	if (error) return error
}

type HandleUpdateEmailProps = {
	email: string
}

export async function handleUpdateEmail({ email }: HandleUpdateEmailProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setEmail = useUser.getState().setEmail

	const previousEmail = useUser.getState().email

	// optimistically set the state
	setEmail(email)

	try {
		if (email === previousEmail) {
			throw new Error('The new email is the same as the current one.')
		}

		const error = await updateEmail({ email: email })

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setEmail(previousEmail)

		console.error('Error updating email:', error)
	}
}

type HandleUpdateFirstNameProps = {
	firstName: string
}

export async function handleUpdateFirstName({
	firstName,
}: HandleUpdateFirstNameProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setFirstName = useUser.getState().setFirstName
	const setFullName = useUser.getState().setFullName
	const setInitials = useUser.getState().setInitials

	const previousFirstName = useUser.getState().firstName
	const previousLastName = useUser.getState().firstName
	const previousFullName = useUser.getState().fullName
	const previousInitials = useUser.getState().initials

	// optimistically set the state
	setFirstName(firstName)
	setFullName(`${firstName} ${previousLastName}`)
	setInitials(`${firstName[0]}${previousLastName?.[0]}`)

	try {
		if (firstName === previousFirstName) {
			throw new Error(
				'The new first name is the same as the current one.',
			)
		}

		const error = await updateFirstName({
			userId: userId,
			firstName: firstName,
		})

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setFirstName(previousFirstName)
		setFullName(previousFullName)
		setInitials(previousInitials)

		console.error('Error setting first name:', error)
	}
}

type HandleUpdateLastNameProps = {
	lastName: string
}

export async function handleUpdateLastName({
	lastName,
}: HandleUpdateLastNameProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setLastName = useUser.getState().setLastName
	const setFullName = useUser.getState().setFullName
	const setInitials = useUser.getState().setInitials

	const previousLastName = useUser.getState().lastName
	const previousFirstName = useUser.getState().firstName
	const previousFullName = useUser.getState().fullName
	const previousInitials = useUser.getState().initials

	// optimistically set the state
	setLastName(lastName)
	setFullName(`${previousFirstName} ${lastName}`)
	setInitials(`${previousFirstName?.[0]}${lastName[0]}`)

	try {
		if (lastName === previousLastName) {
			throw new Error('The new last name is the same as the current one.')
		}

		const error = await updateLastName({
			userId: userId,
			lastName: lastName,
		})

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setLastName(previousLastName)
		setFullName(previousFullName)
		setInitials(previousInitials)

		console.error('Error setting last name:', error)
	}
}

type HandleUpdateBirthDateProps = {
	birthDate: Date | null
}

export async function handleUpdateBirthDate({
	birthDate,
}: HandleUpdateBirthDateProps) {
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

		const error = await updateBirthDate({
			userId: userId,
			birthDate: dayjs(birthDate).format(),
		})

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setBirthDate(previousBirthDate)

		console.error('Error setting birth date:', error)
	}
}

type HandleUpdateWebsiteProps = {
	website: string | null
}

export async function handleUpdateWebsite({
	website,
}: HandleUpdateWebsiteProps) {
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

		const error = await updateWebsite({
			userId: userId,
			website: website,
		})

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setWebsite(previousWebsite)

		console.error('Error setting website:', error)
	}
}

type HandleUpdateAvatarUrlProps = {
	avatarUrl: string | null
}

export async function handleUpdateAvatarUrl({
	avatarUrl,
}: HandleUpdateAvatarUrlProps) {
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

		const error = await updateAvatarUrl({
			userId: userId,
			avatarUrl: avatarUrl,
		})

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

		const error = await updateOnboardingCompletedDate({
			userId: userId,
			onboardingCompletedDate: value ? dayjs().format() : null,
		})

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setIsOnboardingCompleted(previousValue)

		console.error('Error setting onboarding completed value:', error)
	}
}

type HandleUpdatePrimaryCurrencyProps = {
	currency: Currency
}

export async function handleUpdatePrimaryCurrency({
	currency,
}: HandleUpdatePrimaryCurrencyProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setPrimaryCurrency = useUser.getState().setPrimaryCurrency

	const previousPrimaryCurrency = useUser.getState().primaryCurrency

	// optimistically set the state
	setPrimaryCurrency(currency)

	try {
		if (currency === previousPrimaryCurrency) {
			throw new Error(
				'The new primary currency is the same as the current one.',
			)
		}

		const error = await updatePrimaryCurrency({
			userId: userId,
			currencyId: currency.id,
		})

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setPrimaryCurrency(previousPrimaryCurrency)

		console.error('Error setting primary currency:', error)
	}
}

type HandleUpdateLocationProps = {
	city: City
}

export async function handleUpdateLocation({
	city,
}: HandleUpdateLocationProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setCity = useUser.getState().setCity
	const setCountry = useUser.getState().setCountry

	const previousCity = useUser.getState().city
	const previousCountry = useUser.getState().country
	const newCountry = useDatabase
		.getState()
		.countries?.find((country) => country.id === city.country)

	// optimistically set the state
	setCity(city)
	setCountry(newCountry)

	try {
		if (city === previousCity) {
			throw new Error('The new city is the same as the current one.')
		}

		const error = await updateCity({ userId: userId, cityId: city.id })

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setCity(previousCity)
		setCountry(previousCountry)

		console.error('Error updating location:', error)
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
	const userId = getUserId()

	if (!userId) {
		console.error('No user ID found')
		return null
	}

	const setCounterparts = useUser.getState().setCounterparts

	const existingCounterparts = useUser.getState().counterparts
	const existingMatchingCounterpart = existingCounterparts.find(
		(counterpart) => counterpart.name === name,
	)

	// if there are is no counterpart with this name in the database, create one
	if (!existingMatchingCounterpart) {
		try {
			const { error, newCounterpart } = await insertCounterpart({
				userId: userId,
				name: name,
				isIncome: isIncome,
				isExpense: isExpense,
			})

			if (error || !newCounterpart)
				throw new Error('Error adding counterpart to db')

			setCounterparts([...existingCounterparts, newCounterpart])

			return newCounterpart
		} catch (error) {
			console.error('Error adding counterpart to db:', error)
			return null
		}
	}

	// if there is a counterpart already created but not with the same attributes, update them
	if (
		existingMatchingCounterpart.isIncome !== isIncome ||
		existingMatchingCounterpart.isExpense !== isExpense
	) {
		const data = {
			isIncome: existingMatchingCounterpart.isIncome,
			isExpense: existingMatchingCounterpart.isExpense,
		}

		if (!data.isIncome && isIncome) {
			data.isIncome = isIncome
		}

		if (!data.isExpense && isExpense) {
			data.isExpense = isExpense
		}

		try {
			const { error, updatedCounterpart } = await updateCounterpart({
				counterpartId: existingMatchingCounterpart.id,
				updateData: data,
			})

			if (error || !updatedCounterpart)
				throw new Error('Error updating counterpart in db')

			setCounterparts(
				existingCounterparts.map((counterpart) =>
					counterpart.id === updatedCounterpart.id
						? {
								...counterpart,
								isIncome: updatedCounterpart.isIncome,
								isExpense: updatedCounterpart.isExpense,
						  }
						: counterpart,
				),
			)

			return updatedCounterpart
		} catch (error) {
			console.error('Error updating counterpart in db:', error)
			return null
		}
	} else {
		return existingMatchingCounterpart
	}
}

type FoodAndDrinkTransactionInput = {
	placeCategoryId: number
	typeCategoryId: number
	eatInTakeAway?: EatInTakeAway
	isLeftovers?: boolean
	isDelivery?: boolean
	isWorked?: boolean
}

type AddFoodAndDrinkTransactionProps = {
	parentTransactionId: string
	foodAndDrinkTransaction?: FoodAndDrinkTransactionInput
}

async function addFoodAndDrinkTransaction({
	parentTransactionId,
	foodAndDrinkTransaction,
}: AddFoodAndDrinkTransactionProps) {
	if (!foodAndDrinkTransaction) {
		return null
	}

	try {
		const { newFoodAndDrinkTransaction, error } =
			await insertFoodAndDrinkTransaction({
				parentTransactionId: parentTransactionId,
				placeCategoryId: foodAndDrinkTransaction.placeCategoryId,
				typeCategoryId: foodAndDrinkTransaction.typeCategoryId,
				eatInTakeAway: foodAndDrinkTransaction.eatInTakeAway,
				isLeftovers: foodAndDrinkTransaction.isLeftovers,
				isDelivery: foodAndDrinkTransaction.isDelivery,
				isWorked: foodAndDrinkTransaction.isWorked,
			})

		if (error || !newFoodAndDrinkTransaction)
			throw new Error('Error adding food and drink transaction to db')

		const placeCategory = getFoodAndDrinkPlaceCategoryFromId(
			newFoodAndDrinkTransaction.placeCategory,
		)
		const typeCategory = getFoodAndDrinkTypeCategoryFromId(
			newFoodAndDrinkTransaction.typeCategory,
		)

		if (!placeCategory || !typeCategory) {
			console.error('Food and drink transaction data is incomplete')
			return null
		}

		const formattedFoodAndDrinkTransaction = {
			id: newFoodAndDrinkTransaction.id,
			placeCategory: placeCategory,
			typeCategory: typeCategory,
			eatInTakeAway: newFoodAndDrinkTransaction.eatInTakeAway,
			isLeftovers: newFoodAndDrinkTransaction.isLeftovers,
			isDelivery: newFoodAndDrinkTransaction.isDelivery,
			isWorked: newFoodAndDrinkTransaction.isWorked,
			createdAt: newFoodAndDrinkTransaction.createdAt,
			updatedAt: newFoodAndDrinkTransaction.updatedAt,
		}

		return formattedFoodAndDrinkTransaction
	} catch (error) {
		console.error('Error adding food and drink transaction to db:', error)
		return null
	}
}

type HealthAndWellnessTransactionInput = {
	categoryId: number
}

type HealthAndWellnessTransactionProps = {
	parentTransactionId: string
	healthAndWellnessTransaction?: HealthAndWellnessTransactionInput
}

async function addHealthAndWellnessTransaction({
	parentTransactionId,
	healthAndWellnessTransaction,
}: HealthAndWellnessTransactionProps) {
	if (!healthAndWellnessTransaction) {
		return null
	}

	try {
		const { newHealthAndWellnessTransaction, error } =
			await insertHealthAndWellnessTransaction({
				parentTransactionId: parentTransactionId,
				categoryId: healthAndWellnessTransaction.categoryId,
			})

		if (error || !newHealthAndWellnessTransaction)
			throw new Error(
				'Error adding health and wellness transaction to db',
			)

		const category = getHealthAndWellnessCategoryFromId(
			newHealthAndWellnessTransaction.category,
		)

		if (!category) {
			console.error('Health and wellness transaction data is incomplete')
			return null
		}

		const formattedHealthAndWellnessTransaction = {
			id: newHealthAndWellnessTransaction.id,
			category: category,
			createdAt: newHealthAndWellnessTransaction.createdAt,
			updatedAt: newHealthAndWellnessTransaction.updatedAt,
		}

		return formattedHealthAndWellnessTransaction
	} catch (error) {
		console.error(
			'Error adding health and wellness transaction to db:',
			error,
		)
		return null
	}
}

type AccommodationTransactionInput = {
	categoryId: number
}

type AccommodationTransactionProps = {
	parentHomeTransactionId: string
	accommodationTransaction?: AccommodationTransactionInput
}

async function addAccommodationTransaction({
	parentHomeTransactionId,
	accommodationTransaction,
}: AccommodationTransactionProps) {
	if (!accommodationTransaction) {
		return null
	}

	try {
		const { newAccommodationTransaction, error } =
			await insertAccommodationTransaction({
				parentHomeTransactionId: parentHomeTransactionId,
				categoryId: accommodationTransaction.categoryId,
			})

		if (error || !newAccommodationTransaction)
			throw new Error('Error adding accommodation transaction to db')

		const category = getAccommodationCategoryFromId(
			newAccommodationTransaction.category,
		)

		if (!category) {
			console.error('Accommodation transaction data is incomplete')
			return null
		}

		const formattedAccommodationTransaction = {
			id: newAccommodationTransaction.id,
			category: category,
			createdAt: newAccommodationTransaction.createdAt,
			updatedAt: newAccommodationTransaction.updatedAt,
		}

		return formattedAccommodationTransaction
	} catch (error) {
		console.error('Error adding accommodation transaction to db:', error)
		return null
	}
}

type HomeTransactionInput = {
	categoryId: number
	accommodationTransaction?: AccommodationTransactionInput
}

type HomeTransactionProps = {
	parentTransactionId: string
	homeTransaction?: HomeTransactionInput
}

async function addHomeTransaction({
	parentTransactionId,
	homeTransaction,
}: HomeTransactionProps) {
	if (!homeTransaction) {
		return null
	}

	try {
		const { newHomeTransaction, error } = await insertHomeTransaction({
			parentTransactionId: parentTransactionId,
			categoryId: homeTransaction.categoryId,
		})

		if (error || !newHomeTransaction)
			throw new Error('Error adding home transaction to db')

		const category = getHomeCategoryFromId(newHomeTransaction.category)

		if (!category) {
			console.error('Home transaction data is incomplete')
			return null
		}

		const newAccommodationTransaction = await addAccommodationTransaction({
			parentHomeTransactionId: newHomeTransaction.id,
			accommodationTransaction: homeTransaction.accommodationTransaction,
		})

		const formattedHomeTransaction = {
			id: newHomeTransaction.id,
			category: category,
			accommodationTransaction: newAccommodationTransaction,
			createdAt: newHomeTransaction.createdAt,
			updatedAt: newHomeTransaction.updatedAt,
		}

		return formattedHomeTransaction
	} catch (error) {
		console.error('Error adding home transaction to db:', error)
		return null
	}
}

type ShoppingTransactionInput = {
	categoryId: number
}

type ShoppingTransactionProps = {
	parentTransactionId: string
	shoppingTransaction?: ShoppingTransactionInput
}

async function addShoppingTransaction({
	parentTransactionId,
	shoppingTransaction,
}: ShoppingTransactionProps) {
	if (!shoppingTransaction) {
		return null
	}

	try {
		const { newShoppingTransaction, error } =
			await insertShoppingTransaction({
				parentTransactionId: parentTransactionId,
				categoryId: shoppingTransaction.categoryId,
			})

		if (error || !newShoppingTransaction)
			throw new Error('Error adding shopping transaction to db')

		const category = getShoppingCategoryFromId(
			newShoppingTransaction.category,
		)

		if (!category) {
			console.error('Shopping transaction data is incomplete')
			return null
		}

		const formattedShoppingTransaction = {
			id: newShoppingTransaction.id,
			category: category,
			createdAt: newShoppingTransaction.createdAt,
			updatedAt: newShoppingTransaction.updatedAt,
		}

		return formattedShoppingTransaction
	} catch (error) {
		console.error('Error adding shopping transaction to db:', error)
		return null
	}
}

type FlightTransactionSegmentInput = {
	order: number
	departureAirportId: number
	arrivalAirportId: number
	airlineId: number
	classId: number
	seatCategoryId: number
}[]

type FlightTransactionSegmentProps = {
	parentFlightTransactionId: string
	segments: FlightTransactionSegmentInput
}

async function addFlightTransactionSegments({
	parentFlightTransactionId,
	segments,
}: FlightTransactionSegmentProps) {
	if (!segments) {
		return null
	}

	try {
		const newFlightTransactionSegments = await Promise.all(
			segments.map(async (segment) => {
				const { newFlightTransactionSegment, error } =
					await insertFlightTransactionSegment({
						parentFlightTransactionId: parentFlightTransactionId,
						order: segment.order,
						departureAirportId: segment.departureAirportId,
						arrivalAirportId: segment.arrivalAirportId,
						airlineId: segment.airlineId,
						classId: segment.classId,
						seatCategoryId: segment.seatCategoryId,
					})

				if (error || !newFlightTransactionSegment)
					throw new Error('Error adding flight segment to db')

				const departureAirport = getAirportFromId(
					newFlightTransactionSegment.departureAirport,
				)
				const arrivalAirport = getAirportFromId(
					newFlightTransactionSegment.arrivalAirport,
				)
				const airline = getAirlineFromId(
					newFlightTransactionSegment.airline,
				)
				const flightClass = getFlightClassFromId(
					newFlightTransactionSegment.class,
				)
				const seatCategory = getFlightSeatCategoryFromId(
					newFlightTransactionSegment.seatCategory,
				)

				if (
					!departureAirport ||
					!arrivalAirport ||
					!airline ||
					!flightClass ||
					!seatCategory
				) {
					console.error('Flight segment data is incomplete')
					return null
				}

				return {
					id: newFlightTransactionSegment.id,
					order: newFlightTransactionSegment.order,
					departureAirport: departureAirport,
					arrivalAirport: arrivalAirport,
					airline: airline,
					class: flightClass,
					seatCategory: seatCategory,
					createdAt: newFlightTransactionSegment.createdAt,
					updatedAt: newFlightTransactionSegment.updatedAt,
				}
			}),
		)

		const filteredNewFlightTransactionSegments =
			newFlightTransactionSegments.filter(
				(segment): segment is FlightTransactionSegment =>
					Boolean(segment),
			)

		return filteredNewFlightTransactionSegments
	} catch (error) {
		console.error('Error adding flight segments to db:', error)
		return null
	}
}

type FlightTransactionInput = {
	flyOutDate: Date
	luggageCategoryId: number
	segments: FlightTransactionSegmentInput
}

type FlightTransactionProps = {
	parentTransportationTransactionId: string
	flightTransaction?: FlightTransactionInput
}

async function addFlightTransaction({
	parentTransportationTransactionId,
	flightTransaction,
}: FlightTransactionProps) {
	if (!flightTransaction) {
		return null
	}

	try {
		const { newFlightTransaction, error } = await insertFlightTransaction({
			parentTransportationTransactionId:
				parentTransportationTransactionId,
			flyOutDate: dayjs(flightTransaction.flyOutDate).format(),
			luggageCategoryId: flightTransaction.luggageCategoryId,
		})

		if (error || !newFlightTransaction)
			throw new Error('Error adding flight transaction to db')

		const luggageCategory = getFlightLuggageCategoryFromId(
			newFlightTransaction.luggageCategory,
		)

		if (!luggageCategory) {
			console.error('Flight transaction data is incomplete')
			return null
		}

		const newFlightTransactionSegments = await addFlightTransactionSegments(
			{
				parentFlightTransactionId: newFlightTransaction.id,
				segments: flightTransaction.segments,
			},
		)

		if (!newFlightTransactionSegments) {
			console.error('Flight transaction segments not found')
			return null
		}

		const formattedFlightTransaction = {
			id: newFlightTransaction.id,
			flyOutDate: flightTransaction.flyOutDate,
			luggageCategory: luggageCategory,
			segments: newFlightTransactionSegments,
			createdAt: newFlightTransaction.createdAt,
			updatedAt: newFlightTransaction.updatedAt,
		}

		return formattedFlightTransaction
	} catch (error) {
		console.error('Error adding flight transaction to db:', error)
		return null
	}
}

type CarTransactionInput = {
	categoryId: number
}

type CarTransactionProps = {
	parentTransportationTransactionId: string
	carTransaction?: CarTransactionInput
}

async function addCarTransaction({
	parentTransportationTransactionId,
	carTransaction,
}: CarTransactionProps) {
	if (!carTransaction) {
		return null
	}

	try {
		const { newCarTransaction, error } = await insertCarTransaction({
			parentTransportationTransactionId:
				parentTransportationTransactionId,
			categoryId: carTransaction.categoryId,
		})

		if (error || !newCarTransaction)
			throw new Error('Error adding car transaction to db')

		const category = getCarCategoryFromId(newCarTransaction.category)

		if (!category) {
			console.error('Car transaction data is incomplete')
			return null
		}

		const formattedCarTransaction = {
			id: newCarTransaction.id,
			category: category,
			createdAt: newCarTransaction.createdAt,
			updatedAt: newCarTransaction.updatedAt,
		}

		return formattedCarTransaction
	} catch (error) {
		console.error('Error adding car transaction to db:', error)
		return null
	}
}

type TransportationTransactionInput = {
	categoryId: number
	flightTransaction?: FlightTransactionInput
	carTransaction?: CarTransactionInput
}

type TransportationTransactionProps = {
	parentTransactionId: string
	transportationTransaction?: TransportationTransactionInput
}

async function addTransportationTransaction({
	parentTransactionId,
	transportationTransaction,
}: TransportationTransactionProps) {
	if (!transportationTransaction) {
		return null
	}

	try {
		const { newTransportationTransaction, error } =
			await insertTransportationTransaction({
				parentTransactionId: parentTransactionId,
				categoryId: transportationTransaction.categoryId,
			})

		if (error || !newTransportationTransaction)
			throw new Error('Error adding transportation transaction to db')

		const category = getTransportationCategoryFromId(
			newTransportationTransaction.category,
		)

		if (!category) {
			console.error('Transportation transaction data is incomplete')
			return null
		}

		const newFlightTransaction = await addFlightTransaction({
			parentTransportationTransactionId: newTransportationTransaction.id,
			flightTransaction: transportationTransaction.flightTransaction,
		})

		const newCarTransaction = await addCarTransaction({
			parentTransportationTransactionId: newTransportationTransaction.id,
			carTransaction: transportationTransaction.carTransaction,
		})

		const formattedTransportationTransaction = {
			id: newTransportationTransaction.id,
			category: category,
			flightTransaction: newFlightTransaction,
			carTransaction: newCarTransaction,
			createdAt: newTransportationTransaction.createdAt,
			updatedAt: newTransportationTransaction.updatedAt,
		}

		return formattedTransportationTransaction
	} catch (error) {
		console.error('Error adding transportation transaction to db:', error)
		return null
	}
}

type AddTransactionProps = {
	date: Date
	item: string
	amount: number
	tip: number | null
	counterpartName: string
	description: string | null
	currencyId: string
	cityId: number
	categoryId: number
	paymentMethodId: string
	foodAndDrinkTransaction?: FoodAndDrinkTransactionInput
	healthAndWellnessTransaction?: HealthAndWellnessTransactionInput
	homeTransaction?: HomeTransactionInput
	shoppingTransaction?: ShoppingTransactionInput
	transportationTransaction?: TransportationTransactionInput
}

export async function addTransaction({
	date,
	item,
	amount,
	tip,
	counterpartName,
	description,
	currencyId,
	cityId,
	categoryId,
	paymentMethodId,
	foodAndDrinkTransaction,
	healthAndWellnessTransaction,
	homeTransaction,
	shoppingTransaction,
	transportationTransaction,
}: AddTransactionProps) {
	const userId = getUserId()

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const transactionCategory = getTransactionCategoryFromId(categoryId)

	if (!transactionCategory) {
		console.error('Transaction category not found')
		return
	}

	const counterpart = await addCounterpart({
		name: counterpartName,
		isIncome: transactionCategory.isIncome,
		isExpense: !transactionCategory.isIncome,
	})

	if (!counterpart) {
		console.error('Counterpart not found, returned:', counterpart)
		return
	}

	try {
		// const { data: newTransaction, error } = await supabase
		// 	.from('transactions')
		// 	.insert({
		// 		user: userId,
		// 		item: item,
		// 		amount: amount,
		// 		tip: tip,
		// 		city: cityId,
		// 		currency: currencyId,
		// 		transactionDate: dayjs(date).format('YYYY-MM-DD'),
		// 		description: description,
		// 		counterpart: counterpart.id,
		// 		category: categoryId,
		// 		paymentMethod: paymentMethodId,
		// 	})
		// 	.select()

		const { newTransaction, error } = await insertTransaction({
			userId: userId,
			item: item,
			amount: amount,
			tip: tip,
			cityId: cityId,
			currencyId: currencyId,
			transactionDate: dayjs(date).format(),
			description: description,
			counterpartId: counterpart.id,
			categoryId: categoryId,
			paymentMethodId: paymentMethodId,
		})

		if (error || !newTransaction)
			throw new Error('Error adding transaction to db')

		const setTransactions = useUser.getState().setTransactions

		const existingTransactions = useUser.getState().transactions
		const city = getCityFromId(cityId)
		const country = getCountryFromCityId(cityId)
		const currency = getCurrencyFromId(currencyId)
		const paymentMethod = getPaymentMethodFromId(paymentMethodId)

		if (!city || !country || !currency || !paymentMethod) {
			console.error('Transaction data is incomplete')
			return
		}

		const newFoodAndDrinkTransaction = await addFoodAndDrinkTransaction({
			foodAndDrinkTransaction,
			parentTransactionId: newTransaction.id,
		})
		const newHealthAndWellnessTransaction =
			await addHealthAndWellnessTransaction({
				healthAndWellnessTransaction,
				parentTransactionId: newTransaction.id,
			})
		const newHomeTransaction = await addHomeTransaction({
			homeTransaction,
			parentTransactionId: newTransaction.id,
		})
		const newShoppingTransaction = await addShoppingTransaction({
			shoppingTransaction,
			parentTransactionId: newTransaction.id,
		})
		const newTransportationTransaction = await addTransportationTransaction(
			{
				transportationTransaction,
				parentTransactionId: newTransaction.id,
			},
		)

		setTransactions([
			...existingTransactions,
			{
				id: newTransaction.id,
				item: item,
				description: description,
				amount: amount,
				tip: tip,
				isIncome: transactionCategory?.isIncome,
				transactionDate: date,
				counterpart: counterpart,
				currency: currency,
				city: city,
				country: country,
				category: transactionCategory,
				paymentMethod: paymentMethod,
				foodAndDrinkTransaction: newFoodAndDrinkTransaction,
				healthAndWellnessTransaction: newHealthAndWellnessTransaction,
				homeTransaction: newHomeTransaction,
				shoppingTransaction: newShoppingTransaction,
				transportationTransaction: newTransportationTransaction,
				createdAt: newTransaction.createdAt,
				updatedAt: newTransaction.updatedAt,
			},
		])
	} catch (error) {
		console.error('Error adding transaction to db:', error)
	}
}

type HandleDeleteTransactionProps = {
	transactionId: string
}

export async function handleDeleteTransaction({
	transactionId,
}: HandleDeleteTransactionProps) {
	const setTransactions = useUser.getState().setTransactions

	const existingTransactions = useUser.getState().transactions

	const transaction = existingTransactions.find(
		(transaction) => transaction.id === transactionId,
	)

	if (!transaction) {
		console.error('Transaction not found')
		return
	}

	try {
		const error = await deleteTransaction({
			transactionId: transactionId,
		})

		if (error) throw error

		setTransactions(
			existingTransactions.filter(
				(existingTransaction) =>
					existingTransaction.id !== transaction.id,
			),
		)
	} catch (error) {
		console.error('Error deleting transaction:', error)
	}
}

type GetTransactionCategoryIconProps = {
	transactionCategory: TransactionCategory | undefined | null
	className?: string
}

export function getTransactionCategoryIcon({
	transactionCategory,
	className,
}: GetTransactionCategoryIconProps) {
	switch (transactionCategory?.name) {
		case 'Home':
			return <HomeIcon className={cn(className)} />
		case 'Food and drink':
			return <UtensilsCrossedIcon className={cn(className)} />
		case 'Transportation':
			return <CarIcon className={cn(className)} />
		case 'Entertainment':
			return <DramaIcon className={cn(className)} />
		case 'Health and wellness':
			return <HeartIcon className={cn(className)} />
		case 'Shopping':
			return <ShoppingBagIcon className={cn(className)} />
		case 'Savings and investments':
			return <PercentIcon className={cn(className)} />
		case 'Subscriptions':
			return <RotateCwIcon className={cn(className)} />
		case 'Other expenses':
			return <CircleDollarSignIcon className={cn(className)} />
		case 'Salary':
			return <CoinsIcon className={cn(className)} />
		case 'Consulting':
			return <BriefcaseBusinessIcon className={cn(className)} />
		case 'Sale':
			return <ReceiptIcon className={cn(className)} />
		case 'Gift':
			return <GiftIcon className={cn(className)} />
		case 'Tax return':
			return <Undo2Icon className={cn(className)} />
		case 'Realized investment':
			return <PercentIcon className={cn(className)} />
		case 'Insurance claim':
			return <BaggageClaimIcon className={cn(className)} />
		case 'Cashback':
			return <CreditCardIcon className={cn(className)} />
		case 'Other income':
			return <CircleDollarSignIcon className={cn(className)} />
		default:
			return null
	}
}

// Get object from id functions, etc
export function getUserId() {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return null
	}

	return userId
}

export function getAccommodationCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.accommodationCategories?.find((category) => category.id === id)

	if (!category) {
		console.error('Accommodation category not found')
		return null
	}

	return category
}

export function getAirlineAllianceFromId(id: number) {
	const alliance = useDatabase
		.getState()
		.airlineAlliances?.find((alliance) => alliance.id === id)

	if (!alliance) {
		console.error('Airline alliance not found')
		return null
	}

	return alliance
}

export function getAirlineFromId(id: number) {
	const airline = useDatabase
		.getState()
		.airlines?.find((airline) => airline.id === id)

	if (!airline) {
		console.error('Airline not found')
		return null
	}

	return airline
}

export function getAirportFromId(id: number) {
	const airport = useDatabase
		.getState()
		.airports?.find((airport) => airport.id === id)

	if (!airport) {
		console.error('Airport not found')
		return null
	}

	return airport
}

export function getCarCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.carCategories?.find((category) => category.id === id)

	if (!category) {
		console.error('Car category not found')
		return null
	}

	return category
}

export function getCityFromId(id: number | null) {
	if (!id) {
		console.error('No city ID found')
		return null
	}

	const city = useDatabase.getState().cities?.find((city) => city.id === id)

	if (!city) {
		console.error('City not found')
		return null
	}

	return city
}

export function getCityCountryStringFromCityId(id: number | null) {
	if (!id) {
		return null
	}

	const city = getCityFromId(id)

	if (!city) {
		console.error('City not found (country city string from city id)')
		return null
	}

	// if the city is online, return only the city name
	if (city.name === 'Online') {
		return city.name
	}

	const country = getCountryFromId(city.country)

	if (!country) {
		console.error('Country not found')
		return null
	}

	return `${city.name}, ${country.name}`
}

export function getCounterpartFromId(id: string) {
	const counterpart = useUser
		.getState()
		.counterparts?.find((counterpart) => counterpart.id === id)

	if (!counterpart) {
		console.error('Counterpart not found (from ID)')
		return null
	}

	return counterpart
}

export function getCountryFromId(id: number) {
	const country = useDatabase
		.getState()
		.countries?.find((country) => country.id === id)

	if (!country) {
		console.error('Country not found')
		return null
	}

	return country
}

export function getCountryFromCityId(id: number | null) {
	if (!id) {
		console.error('No city ID found (country from city id)')
		return null
	}

	const city = getCityFromId(id)

	if (!city) {
		console.error('City not found (country from city id)')
		return null
	}

	const country = getCountryFromId(city.country)

	if (!country) {
		console.error('Country not found')
		return null
	}

	return country
}

export function getCurrencyFromId(id: string | null) {
	if (!id) {
		console.error('No currency ID found')
		return null
	}

	const currency = useDatabase
		.getState()
		.currencies?.find((currency) => currency.id === id)

	if (!currency) {
		console.error('Currency not found')
		return null
	}

	return currency
}

export function getFlightClassFromId(id: number) {
	const flightClass = useDatabase
		.getState()
		.flightClasses?.find((flightClass) => flightClass.id === id)

	if (!flightClass) {
		console.error('Flight class not found')
		return null
	}

	return flightClass
}

export function getFlightLuggageCategoryFromId(id: number) {
	const luggageCategory = useDatabase
		.getState()
		.flightLuggageCategories?.find(
			(luggageCategory) => luggageCategory.id === id,
		)

	if (!luggageCategory) {
		console.error('Flight luggage category not found')
		return null
	}

	return luggageCategory
}

export function getFlightSeatCategoryFromId(id: number) {
	const seatCategory = useDatabase
		.getState()
		.flightSeatCategories?.find((seatCategory) => seatCategory.id === id)

	if (!seatCategory) {
		console.error('Flight seat category not found')
		return null
	}

	return seatCategory
}

export function getFoodAndDrinkPlaceCategoryFromId(id: number) {
	const placeCategory = useDatabase
		.getState()
		.foodAndDrinkPlaceCategories?.find(
			(placeCategory) => placeCategory.id === id,
		)

	if (!placeCategory) {
		console.error('Food and drink place category not found')
		return null
	}

	return placeCategory
}

export function getFoodAndDrinkTypeCategoryFromId(id: number) {
	const typeCategory = useDatabase
		.getState()
		.foodAndDrinkTypeCategories?.find(
			(typeCategory) => typeCategory.id === id,
		)

	if (!typeCategory) {
		console.error('Food and drink type category not found')
		return null
	}

	return typeCategory
}

export function getHealthAndWellnessCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.healthAndWellnessCategories?.find((category) => category.id === id)

	if (!category) {
		console.error('Health and wellness category not found')
		return null
	}

	return category
}

export function getHomeCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.homeCategories?.find((category) => category.id === id)

	if (!category) {
		console.error('Home category not found')
		return null
	}

	return category
}

export function getLoyaltyProgramFromId(id: number | null) {
	if (!id) {
		return null
	}

	const program = useDatabase
		.getState()
		.loyaltyPrograms?.find((program) => program.id === id)

	if (!program) {
		console.error('Loyalty program not found')
		return null
	}

	return program
}

export function getPaymentMethodCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.paymentMethodCategories?.find((method) => method.id === id)

	if (!category) {
		console.error('Payment method category not found')
		return null
	}

	return category
}

export function getPaymentMethodFromId(id: string) {
	const method = useUser
		.getState()
		.paymentMethods?.find((method) => method.id === id)

	if (!method) {
		console.error('Payment method not found')
		return null
	}

	return method
}

export function getShoppingCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.shoppingCategories?.find((category) => category.id === id)

	if (!category) {
		console.error('Shopping category not found')
		return null
	}

	return category
}

export function getTransactionCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.transactionCategories?.find((category) => category.id === id)

	if (!category) {
		console.error('Transaction category not found')
		return null
	}

	return category
}

export function getTransactionFromId(id: string) {
	const transaction = useUser
		.getState()
		.transactions?.find((transaction) => transaction.id === id)

	if (!transaction) {
		console.error('Transaction not found')
		return null
	}

	return transaction
}

export function getTransportationCategoryFromId(id: number) {
	const category = useDatabase
		.getState()
		.transportationCategories?.find((category) => category.id === id)

	if (!category) {
		console.error('Transportation category not found')
		return null
	}

	return category
}
