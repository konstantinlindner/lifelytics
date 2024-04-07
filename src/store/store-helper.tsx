import { City, Currency, TransactionCategory } from '@/types/globals.types'

import {
	PaymentMethod,
	Transaction,
	useDatabase,
	useUser,
} from '@/store/use-store'

import supabase from '@/lib/supabase'

import dayjs from 'dayjs'

import {
	CarIcon,
	CircleDollarSignIcon,
	CoinsIcon,
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

	await setFirstName({ firstName: firstName })
	await setLastName({ lastName: lastName })
}

export async function SignOut() {
	const { error } = await supabase.auth.signOut({})

	if (error) return error
}

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
		flightSegments,
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
		fetchFlightSegments(),
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
		const userCity = cities?.find((city) => city.id === profile.city)
		setCity(userCity)
		setCountry(
			countries?.find((country) => country.id === userCity?.country),
		)
		setPrimaryCurrency(
			currencies?.find(
				(currency) => currency.id === profile.primaryCurrency,
			),
		)
	}
	if (counterparts) setCounterparts(counterparts)

	if (paymentMethods) {
		const formattedPaymentMethods = paymentMethods
			.map((paymentMethod) => {
				const category = paymentMethodCategories?.find(
					(category) => category.id === paymentMethod.category,
				)

				if (!category) {
					console.error(
						`Error: Payment method with id: ${paymentMethod.id} does not have a category`,
					)
					return
				}

				const loyaltyProgram = loyaltyPrograms?.find(
					(loyaltyProgram) =>
						loyaltyProgram.id === paymentMethod.loyaltyProgram,
				)

				return {
					id: paymentMethod.id,
					name: paymentMethod.name,
					category: category,
					loyaltyProgram: loyaltyProgram ?? null,
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
							placeCategory: useDatabase
								.getState()
								.foodAndDrinkPlaceCategories?.find(
									(category) =>
										category.id ===
										foodAndDrinkTransaction.foodPlaceCategory,
								),
							typeCategory: useDatabase
								.getState()
								.foodAndDrinkTypeCategories?.find(
									(category) =>
										category.id ===
										foodAndDrinkTransaction?.foodTypeCategory,
								),
							isEatIn: foodAndDrinkTransaction.isEatIn,
							isTakeAway: foodAndDrinkTransaction.isTakeAway,
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
							category: useDatabase
								.getState()
								.healthAndWellnessCategories?.find(
									(category) =>
										category.id ===
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
									type: useDatabase
										.getState()
										.accommodationTypes?.find(
											(type) =>
												type.id ===
												accommodationTransaction.type,
										),
									category: useDatabase
										.getState()
										.accommodationCategories?.find(
											(category) =>
												category.id ===
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
							category: useDatabase
								.getState()
								.homeCategories?.find(
									(category) =>
										category.id ===
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
							category: useDatabase
								.getState()
								.shoppingCategories?.find(
									(category) =>
										category.id ===
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
								const flightSegmentChildren =
									flightSegments?.filter(
										(segment) =>
											segment.flightTransaction ===
											flightTransaction.id,
									)

								return {
									id: flightTransaction.id,
									luggageCategory: useDatabase
										.getState()
										.flightLuggageCategories?.find(
											(category) =>
												category.id ===
												flightTransaction.luggageCategory,
										),
									segments: flightSegmentChildren?.map(
										(segment) => ({
											id: segment.id,
											order: segment.order,
											departureAirport: useDatabase
												.getState()
												.airports?.find(
													(airport) =>
														airport.id ===
														segment.departureAirport,
												),
											arrivalAirport: useDatabase
												.getState()
												.airports?.find(
													(airport) =>
														airport.id ===
														segment.arrivalAirport,
												),
											airline: useDatabase
												.getState()
												.airlines?.find(
													(airline) =>
														airline.id ===
														segment.airline,
												),
											class: useDatabase
												.getState()
												.flightClasses?.find(
													(flightClass) =>
														flightClass.id ===
														segment.class,
												),
											seatCategory: useDatabase
												.getState()
												.flightSeatCategories?.find(
													(seatCategory) =>
														seatCategory.id ===
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
									category: useDatabase
										.getState()
										.carCategories?.find(
											(category) =>
												category.id ===
												carTransaction.category,
										),
									createdAt: carTransaction.createdAt,
									updatedAt: carTransaction.updatedAt,
								}
							}
						})()

						return {
							id: transportationTransaction.id,
							category: useDatabase
								.getState()
								.transportationCategories?.find(
									(category) =>
										category.id ===
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

				const category = useDatabase
					.getState()
					.transactionCategories?.find(
						(category) => category.id === transaction.category,
					)
				const isIncome = category?.isIncome
				const counterpart = useUser
					.getState()
					.counterparts?.find(
						(counterpart) =>
							counterpart.id === transaction.counterpart,
					)
				const currency = useDatabase
					.getState()
					.currencies?.find(
						(currency) => currency.id === transaction.currency,
					)
				const city = useDatabase
					.getState()
					.cities?.find((city) => city.id === transaction.city)
				const country = useDatabase
					.getState()
					.countries?.find((country) => country.id === city?.country)

				if (
					!category ||
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
					isIncome: isIncome,
					transactionDate: dayjs(
						transaction.transactionDate,
					).toDate(),
					counterpart: counterpart,
					currency: currency,
					city: city,
					country: country,
					category: category,
					paymentMethod: useUser
						.getState()
						.paymentMethods?.find(
							(paymentMethod) =>
								paymentMethod.id === transaction.paymentMethod,
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

// fetch from DB
async function fetchSession() {
	try {
		const { data, error } = await supabase.auth.getSession()

		if (error) throw error

		if (!data) {
			console.error('No data for session returned')
			return
		}

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

async function fetchFoodAndDrinkTransactions() {
	try {
		const { data: foodAndDrinkTransactions, error } = await supabase
			.from('foodAndDrinkTransactions')
			.select()

		if (error) throw error

		if (!foodAndDrinkTransactions) {
			console.error('No food and drink transactions found')
			return
		}

		return foodAndDrinkTransactions
	} catch (error) {
		console.error('Error fetching food and drink transactions:', error)
	}
}

async function fetchHealthAndWellnessTransactions() {
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

async function fetchHomeTransactions() {
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

async function fetchAccommodationTransactions() {
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

async function fetchShoppingTransactions() {
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

async function fetchTransportationTransactions() {
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

async function fetchFlightTransactions() {
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

async function fetchFlightSegments() {
	try {
		const { data: flightSegments, error } = await supabase
			.from('flightSegments')
			.select()

		if (error) throw error

		if (!flightSegments) {
			console.error('No flight segments found')
			return
		}

		return flightSegments
	} catch (error) {
		console.error('Error fetching flight segments:', error)
	}
}

async function fetchCarTransactions() {
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

async function fetchPaymentMethods() {
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

async function fetchAirports() {
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

async function fetchAirlines() {
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

async function fetchAirlineAlliances() {
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

async function fetchFlightClasses() {
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

async function fetchFlightLuggageCategories() {
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

async function fetchFlightSeatCategories() {
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

async function fetchLoyaltyPrograms() {
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

async function fetchPaymentMethodCategories() {
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

async function fetchFoodAndDrinkPlaceCategories() {
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

async function fetchFoodAndDrinkTypeCategories() {
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

// helper functions

type UpdateEmailProps = {
	email: string
}

export async function updateEmail({ email }: UpdateEmailProps) {
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

		const { error } = await supabase.auth.updateUser({
			email: email,
		})

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setEmail(previousEmail)

		console.error('Error updating email:', error)
	}
}

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

		const { error } = await supabase
			.from('profiles')
			.update({ firstName: firstName })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setFirstName(previousFirstName)
		setFullName(previousFullName)
		setInitials(previousInitials)

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

		const { error } = await supabase
			.from('profiles')
			.update({ lastName: lastName })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setLastName(previousLastName)
		setFullName(previousFullName)
		setInitials(previousInitials)

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

type setPrimaryCurrencyProps = {
	primaryCurrency: Currency
}

export async function setPrimaryCurrency({
	primaryCurrency,
}: setPrimaryCurrencyProps) {
	const userId = useUser.getState().id

	if (!userId) {
		console.error('No user ID found')
		return
	}

	const setPrimaryCurrency = useUser.getState().setPrimaryCurrency

	const previousPrimaryCurrency = useUser.getState().primaryCurrency

	// optimistically set the state
	setPrimaryCurrency(primaryCurrency)

	try {
		if (primaryCurrency === previousPrimaryCurrency) {
			throw new Error(
				'The new primary currency is the same as the current one.',
			)
		}

		const { error } = await supabase
			.from('profiles')
			.update({ primaryCurrency: primaryCurrency.id })
			.eq('id', userId)

		if (error) throw error
	} catch (error) {
		// if there's an error, revert to previous state
		setPrimaryCurrency(previousPrimaryCurrency)

		console.error('Error setting primary currency:', error)
	}
}

type SetLocationProps = {
	city: City
}

export async function setLocation({ city }: SetLocationProps) {
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

		const { error } = await supabase
			.from('profiles')
			.update({ city: city.id })
			.eq('id', userId)

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
	const user = useUser.getState().id

	if (!user) {
		console.error('No user ID found')
		return
	}

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
						user: user,
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
		const updateData: { isIncome?: boolean; isExpense?: boolean } = {}

		if (existingMatchingCounterpart.isIncome !== isIncome) {
			updateData.isIncome = isIncome
		}

		if (existingMatchingCounterpart.isExpense !== isExpense) {
			updateData.isExpense = isExpense
		}

		try {
			const { data: updatedCounterpart, error } = await supabase
				.from('counterparts')
				.update(updateData)
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
	description: string | null
	currency: Currency
	city: City
	category: TransactionCategory
	paymentMethod: PaymentMethod
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
	paymentMethod,
}: AddTransactionProps) {
	const user = useUser.getState().id

	if (!user) {
		console.error('No user ID found')
		return
	}

	const setTransactions = useUser.getState().setTransactions

	const existingTransactions = useUser.getState().transactions
	const country = useDatabase
		.getState()
		.countries?.find((country) => country.id === city.country)

	if (!country) {
		console.error('Country not found')
		return
	}

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
					user: user,
					item: item,
					amount: amount,
					city: city.id,
					currency: currency.id,
					transactionDate: dayjs(date).format('YYYY-MM-DD'),
					description: description,
					counterpart: counterpart.id,
					category: category.id,
					paymentMethod: paymentMethod.id,
				},
			])
			.select()

		if (error) return error

		if (newTransaction) {
			setTransactions([
				...existingTransactions,
				{
					id: newTransaction[0].id,
					item: item,
					description: description,
					amount: amount,
					isIncome: category?.isIncome,
					transactionDate: date,

					counterpart: counterpart,
					currency: currency,
					city: city,
					country: country,
					category: category,
					paymentMethod: paymentMethod,
					// todo here we set child transactions
					foodAndDrinkTransaction: null,
					healthAndWellnessTransaction: null,
					homeTransaction: null,
					shoppingTransaction: null,
					transportationTransaction: null,
					createdAt: newTransaction[0].createdAt,
					updatedAt: newTransaction[0].updatedAt,
				},
			])
		}
	} catch (error) {
		console.error('Error adding transaction to db:', error)
	}
}

type DeleteTransactionProps = {
	transactionId: string
}

export async function deleteTransaction({
	transactionId,
}: DeleteTransactionProps) {
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
		const { error } = await supabase
			.from('transactions')
			.delete()
			.eq('id', transactionId)

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
	transactionCategory: TransactionCategory
	className?: string
}

export function getTransactionCategoryIcon({
	transactionCategory,
	className,
}: GetTransactionCategoryIconProps) {
	switch (transactionCategory.name) {
		case 'Home':
			return <HomeIcon className={className} />
		case 'Food and drink':
			return <UtensilsCrossedIcon className={className} />
		case 'Transportation':
			return <CarIcon className={className} />
		case 'Entertainment':
			return <DramaIcon className={className} />
		case 'Health and wellness':
			return <HeartIcon className={className} />
		case 'Shopping':
			return <ShoppingBagIcon className={className} />
		case 'Savings and investments':
			return <PercentIcon className={className} />
		case 'Subscriptions':
			return <RotateCwIcon className={className} />
		case 'Other expenses':
			return <CircleDollarSignIcon className={className} />
		case 'Salary':
			return <CoinsIcon className={className} />
		case 'Sale':
			return <ReceiptIcon className={className} />
		case 'Gift':
			return <GiftIcon className={className} />
		case 'Tax return':
			return <Undo2Icon className={className} />
		case 'Realized investment':
			return <PercentIcon className={className} />
		case 'Other income':
			return <CircleDollarSignIcon className={className} />
		default:
			return null
	}
}
