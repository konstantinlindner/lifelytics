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
	Country,
	Currency,
	TransactionCategory,
} from '@/types/globals.types'

import supabase from '@/lib/supabase'

const Context = createContext({
	currencies: null as Currency[] | null,
	cities: null as City[] | null,
	countries: null as Country[] | null,
	transactionCategories: null as TransactionCategory[] | null,
	fetchDatabaseData: () => {},
})

export const useDatabase = () => useContext(Context)

export const DatabaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currencies, setCurrencies] = useState<Currency[] | null>()
	const [cities, setCities] = useState<City[] | null>()
	const [countries, setCountries] = useState<Country[] | null>()
	const [transactionCategories, setTransactionCategories] = useState<
		TransactionCategory[] | null
	>()

	console.log('databaseContext')

	const fetchDatabaseData = useCallback(async () => {
		const { data: currencies, error: currenciesError } = await supabase
			.from('currencies')
			.select()

		const { data: cities, error: citiesError } = await supabase
			.from('cities')
			.select()

		const { data: countries, error: countriesError } = await supabase
			.from('countries')
			.select()

		const {
			data: transactionCategories,
			error: transactionCategoriesError,
		} = await supabase.from('transactionCategories').select()

		if (currenciesError) {
			console.error('Error fetching currencies:', currenciesError)
		}
		if (citiesError) {
			console.error('Error fetching cities:', citiesError)
		}
		if (countriesError) {
			console.error('Error fetching countries:', countriesError)
		}
		if (transactionCategoriesError) {
			console.error(
				'Error fetching transaction categories:',
				transactionCategoriesError,
			)
		}

		if (!currencies) {
			setCurrencies(null)
		}
		if (!cities) {
			setCities(null)
		}
		if (!countries) {
			setCountries(null)
		}
		if (!transactionCategories) {
			setTransactionCategories(null)
		}

		setCurrencies(currencies)
		setCities(cities)
		setCountries(countries)
		setTransactionCategories(transactionCategories)
	}, [])

	useEffect(() => {
		fetchDatabaseData()
	}, [fetchDatabaseData])

	if (
		currencies === undefined ||
		countries === undefined ||
		cities === undefined ||
		transactionCategories === undefined
	) {
		return null
	}

	return (
		<Context.Provider
			value={{
				currencies,
				cities,
				countries,
				transactionCategories,
				fetchDatabaseData,
			}}
		>
			{children}
		</Context.Provider>
	)
}
