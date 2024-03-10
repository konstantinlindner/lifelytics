export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			countries: {
				Row: {
					continent: Database['public']['Enums']['continents'] | null
					id: number
					iso2: string
					iso3: string | null
					localName: string | null
					name: string | null
				}
				Insert: {
					continent?: Database['public']['Enums']['continents'] | null
					id?: number
					iso2: string
					iso3?: string | null
					localName?: string | null
					name?: string | null
				}
				Update: {
					continent?: Database['public']['Enums']['continents'] | null
					id?: number
					iso2?: string
					iso3?: string | null
					localName?: string | null
					name?: string | null
				}
				Relationships: []
			}
			currencies: {
				Row: {
					createdAt: string | null
					id: string
					name: string | null
					code: string | null
					symbol: string | null
					isSymbolPrefix: boolean
					updatedAt: string | null
				}
				Insert: {
					createdAt?: string | null
					id?: string
					name?: string | null
					code?: string | null
					symbol?: string | null
					isSymbolPrefix?: boolean
					updatedAt?: string | null
				}
				Update: {
					createdAt?: string | null
					id?: string
					name?: string | null
					code?: string | null
					symbol?: string | null
					isSymbolPrefix?: boolean
					updatedAt?: string | null
				}
				Relationships: []
			}
			profiles: {
				Row: {
					avatarUrl: string | null
					createdAt: string | null
					birthDate: string | null
					firstName: string | null
					id: string
					lastName: string | null
					transactions: string | null
					updatedAt: string | null
					website: string | null
					onboardingCompletedDate: string | null
				}
				Insert: {
					avatarUrl?: string | null
					createdAt?: string | null
					birthDate?: string | null
					firstName?: string | null
					id?: string
					lastName?: string | null
					transactions?: string | null
					updatedAt?: string | null
					website?: string | null
					onboardingCompletedDate?: string | null
				}
				Update: {
					avatarUrl?: string | null
					createdAt?: string | null
					birthDate?: string | null
					firstName?: string | null
					id?: string | null
					lastName?: string | null
					transactions?: string | null
					updatedAt?: string | null
					website?: string | null
					onboardingCompletedDate?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'profiles_transactions_fkey'
						columns: ['transactions']
						referencedRelation: 'transactions'
						referencedColumns: ['id']
					},
				]
			}
			transactions: {
				Row: {
					amount: number | null
					country: number | null
					createdAt: string | null
					currency: string | null
					date: string | null
					id: string
					title: string | null
					description: string | null
					updatedAt: string | null
					userId: string | null
				}
				Insert: {
					amount?: number | null
					country?: number | null
					createdAt?: string | null
					currency?: string | null
					date?: string | null
					id?: string
					title?: string | null
					description?: string | null
					updatedAt?: string | null
					userId?: string | null
				}
				Update: {
					amount?: number | null
					country?: number | null
					createdAt?: string | null
					currency?: string | null
					date?: string | null
					id?: string
					title?: string | null
					description?: string | null
					updatedAt?: string | null
					userId?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'transactions_country_fkey'
						columns: ['country']
						referencedRelation: 'countries'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'transactions_currency_fkey'
						columns: ['currency']
						referencedRelation: 'currencies'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'transactions_user_id_fkey'
						columns: ['userId']
						referencedRelation: 'profiles'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			continents:
				| 'Africa'
				| 'Antarctica'
				| 'Asia'
				| 'Europe'
				| 'Oceania'
				| 'North America'
				| 'South America'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
