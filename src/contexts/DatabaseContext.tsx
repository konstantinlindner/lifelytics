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

type Currencies = {
	id: string
	name: string | null
	code: string | null
	symbol: string | null
	isSymbolPrefix: boolean
	createdAt: string | null
	updatedAt: string | null
}[]

type Countries = {
	id: number
	name: string | null
	localName: string | null
	iso2: string
	iso3: string | null
	continent: string | null
}[]

const Context = createContext({
	currencies: null as Currencies | null,
	countries: null as Countries | null,
	fetchDatabaseData: () => {},
})

export const useDatabase = () => useContext(Context)

export const DatabaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currencies, setCurrencies] = useState<Currencies | null>()
	const [countries, setCountries] = useState<Countries | null>()

	const fetchDatabaseData = useCallback(async () => {
		const { data: currencies } = await supabase.from('currencies').select(`
        id,
        name,
        code,
        symbol,
        isSymbolPrefix,
        createdAt,
        updatedAt
    `)

		const { data: countries } = await supabase.from('countries').select(`
        id,
        name,
        localName,
        iso2,
        iso3,
        continent
    `)

		if (!currencies) {
			setCurrencies(null)
		} else {
			const formattedCurrencies = currencies.map((currency) => ({
				id: currency.id,
				name: currency.name,
				code: currency.code,
				symbol: currency.symbol,
				isSymbolPrefix: currency.isSymbolPrefix,
				createdAt: currency.createdAt,
				updatedAt: currency.updatedAt,
			}))

			setCurrencies(formattedCurrencies)
		}

		if (!countries) {
			setCountries(null)
		} else {
			const formattedCountries = countries.map((country) => ({
				id: country.id,
				name: country.name,
				localName: country.localName,
				iso2: country.iso2,
				iso3: country.iso3,
				continent: country.continent,
			}))

			setCountries(formattedCountries)
		}
	}, [])

	useEffect(() => {
		fetchDatabaseData()
	}, [fetchDatabaseData])

	if (currencies === undefined || countries === undefined) {
		return null
	}

	return (
		<Context.Provider value={{ currencies, countries, fetchDatabaseData }}>
			{children}
		</Context.Provider>
	)
}
