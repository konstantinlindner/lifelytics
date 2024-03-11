export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			cities: {
				Row: {
					country: number
					createdAt: string
					englishName: string
					id: string
					localName: string
					updatedAt: string
				}
				Insert: {
					country: number
					createdAt?: string
					englishName?: string
					id?: string
					localName?: string
					updatedAt?: string
				}
				Update: {
					country?: number
					createdAt?: string
					englishName?: string
					id?: string
					localName?: string
					updatedAt?: string
				}
				Relationships: [
					{
						foreignKeyName: 'cities_country_fkey'
						columns: ['country']
						isOneToOne: false
						referencedRelation: 'countries'
						referencedColumns: ['id']
					},
				]
			}
			counterparts: {
				Row: {
					createdAt: string
					id: string
					isExpense: boolean
					isIncome: boolean
					name: string | null
					updatedAt: string | null
					userId: string | null
				}
				Insert: {
					createdAt?: string
					id?: string
					isExpense?: boolean
					isIncome?: boolean
					name?: string | null
					updatedAt?: string | null
					userId?: string | null
				}
				Update: {
					createdAt?: string
					id?: string
					isExpense?: boolean
					isIncome?: boolean
					name?: string | null
					updatedAt?: string | null
					userId?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'public_counterparts_userId_fkey'
						columns: ['userId']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['id']
					},
				]
			}
			countries: {
				Row: {
					continent: Database['public']['Enums']['continents'] | null
					currency: string | null
					id: number
					iso2: string
					iso3: string
					localName: string | null
					name: string
				}
				Insert: {
					continent?: Database['public']['Enums']['continents'] | null
					currency?: string | null
					id?: number
					iso2?: string
					iso3?: string
					localName?: string | null
					name?: string
				}
				Update: {
					continent?: Database['public']['Enums']['continents'] | null
					currency?: string | null
					id?: number
					iso2?: string
					iso3?: string
					localName?: string | null
					name?: string
				}
				Relationships: [
					{
						foreignKeyName: 'countries_currency_fkey'
						columns: ['currency']
						isOneToOne: false
						referencedRelation: 'currencies'
						referencedColumns: ['id']
					},
				]
			}
			currencies: {
				Row: {
					code: string
					createdAt: string
					id: string
					isSymbolPrefix: boolean
					name: string
					symbol: string
					updatedAt: string
				}
				Insert: {
					code?: string
					createdAt?: string
					id?: string
					isSymbolPrefix?: boolean
					name?: string
					symbol?: string
					updatedAt?: string
				}
				Update: {
					code?: string
					createdAt?: string
					id?: string
					isSymbolPrefix?: boolean
					name?: string
					symbol?: string
					updatedAt?: string
				}
				Relationships: []
			}
			food: {
				Row: {
					city: string
					createdAt: string
					foodPlaceCategory: Database['public']['Enums']['foodPlaceCategories']
					foodTypeCategory: Database['public']['Enums']['foodTypeCategories']
					id: string
					place: string
					updatedAt: string
				}
				Insert: {
					city: string
					createdAt?: string
					foodPlaceCategory: Database['public']['Enums']['foodPlaceCategories']
					foodTypeCategory: Database['public']['Enums']['foodTypeCategories']
					id?: string
					place?: string
					updatedAt?: string
				}
				Update: {
					city?: string
					createdAt?: string
					foodPlaceCategory?: Database['public']['Enums']['foodPlaceCategories']
					foodTypeCategory?: Database['public']['Enums']['foodTypeCategories']
					id?: string
					place?: string
					updatedAt?: string
				}
				Relationships: [
					{
						foreignKeyName: 'food_city_fkey'
						columns: ['city']
						isOneToOne: false
						referencedRelation: 'cities'
						referencedColumns: ['id']
					},
				]
			}
			income: {
				Row: {
					category: Database['public']['Enums']['incomeCategories']
					createdAt: string
					from: string
					id: string
					transactionId: string
					updatedAt: string
					what: string
				}
				Insert: {
					category: Database['public']['Enums']['incomeCategories']
					createdAt?: string
					from?: string
					id?: string
					transactionId: string
					updatedAt?: string
					what?: string
				}
				Update: {
					category?: Database['public']['Enums']['incomeCategories']
					createdAt?: string
					from?: string
					id?: string
					transactionId?: string
					updatedAt?: string
					what?: string
				}
				Relationships: [
					{
						foreignKeyName: 'income_transactionId_fkey'
						columns: ['transactionId']
						isOneToOne: false
						referencedRelation: 'transactions'
						referencedColumns: ['id']
					},
				]
			}
			paymentMethods: {
				Row: {
					createdAt: string
					id: string
					name: string
					updatedAt: string
					userId: string
				}
				Insert: {
					createdAt?: string
					id?: string
					name?: string
					updatedAt?: string
					userId: string
				}
				Update: {
					createdAt?: string
					id?: string
					name?: string
					updatedAt?: string
					userId?: string
				}
				Relationships: [
					{
						foreignKeyName: 'paymentMethods_userId_fkey'
						columns: ['userId']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['id']
					},
				]
			}
			profiles: {
				Row: {
					avatarUrl: string | null
					birthDate: string | null
					createdAt: string
					firstName: string | null
					id: string
					lastName: string | null
					onboardingCompletedDate: string | null
					primaryCurrency: string | null
					updatedAt: string
					website: string | null
				}
				Insert: {
					avatarUrl?: string | null
					birthDate?: string | null
					createdAt?: string
					firstName?: string | null
					id: string
					lastName?: string | null
					onboardingCompletedDate?: string | null
					primaryCurrency?: string | null
					updatedAt?: string
					website?: string | null
				}
				Update: {
					avatarUrl?: string | null
					birthDate?: string | null
					createdAt?: string
					firstName?: string | null
					id?: string
					lastName?: string | null
					onboardingCompletedDate?: string | null
					primaryCurrency?: string | null
					updatedAt?: string
					website?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'profiles_primaryCurrency_fkey'
						columns: ['primaryCurrency']
						isOneToOne: false
						referencedRelation: 'currencies'
						referencedColumns: ['id']
					},
				]
			}
			transactions: {
				Row: {
					amount: number
					counterpart: string | null
					country: number
					createdAt: string
					currency: string
					description: string | null
					id: string
					item: string
					transactionDate: string
					updatedAt: string
					userId: string
				}
				Insert: {
					amount: number
					counterpart?: string | null
					country: number
					createdAt?: string
					currency: string
					description?: string | null
					id?: string
					item?: string
					transactionDate: string
					updatedAt?: string
					userId: string
				}
				Update: {
					amount?: number
					counterpart?: string | null
					country?: number
					createdAt?: string
					currency?: string
					description?: string | null
					id?: string
					item?: string
					transactionDate?: string
					updatedAt?: string
					userId?: string
				}
				Relationships: [
					{
						foreignKeyName: 'public_transactions_counterpart_fkey'
						columns: ['counterpart']
						isOneToOne: false
						referencedRelation: 'counterparts'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'transactions_country_fkey'
						columns: ['country']
						isOneToOne: false
						referencedRelation: 'countries'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'transactions_currency_fkey'
						columns: ['currency']
						isOneToOne: false
						referencedRelation: 'currencies'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'transactions_userId_fkey'
						columns: ['userId']
						isOneToOne: false
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
			foodPlaceCategories:
				| 'Grocery store'
				| 'Convenience store'
				| 'Restaurant'
				| 'Café'
				| 'Food stand or truck'
				| 'Vending machine'
			foodTypeCategories:
				| 'Groceries'
				| 'Breakfast'
				| 'Lunch'
				| 'Dinner'
				| 'Coffee'
				| 'Ice cream'
				| 'Snacks and beverages'
				| 'Drinks out'
				| 'Alcohol'
			incomeCategories:
				| 'Salary'
				| 'Sale'
				| 'Gift'
				| 'Tax return'
				| 'Realized investment'
				| 'Other income'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
			Database['public']['Views'])
	? (Database['public']['Tables'] &
			Database['public']['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R
	  }
		? R
		: never
	: never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I
	  }
		? I
		: never
	: never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U
	  }
		? U
		: never
	: never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database['public']['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	? Database['public']['Enums'][PublicEnumNameOrOptions]
	: never
