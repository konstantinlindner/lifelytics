import { Database } from '@/types/supabase.types'

// tables
export type City = Database['public']['Tables']['cities']['Row']
export type Counterpart = Database['public']['Tables']['counterparts']['Row']
export type Country = Database['public']['Tables']['countries']['Row']
export type Currency = Database['public']['Tables']['currencies']['Row']
export type Food = Database['public']['Tables']['food']['Row']
export type PaymentMethod =
	Database['public']['Tables']['paymentMethods']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type TransactionCategory =
	Database['public']['Tables']['transactionCategories']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']

// enums
export type Continent = Database['public']['Enums']['continents']

export type FoodPlaceCategory =
	Database['public']['Enums']['foodPlaceCategories']
export type FoodTypeCategory = Database['public']['Enums']['foodTypeCategories']
