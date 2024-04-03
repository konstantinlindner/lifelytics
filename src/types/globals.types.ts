import { Database } from '@/types/supabase.types'

// tables
export type AirlineAlliance =
	Database['public']['Tables']['airlineAlliances']['Row']
export type Airline = Database['public']['Tables']['airlines']['Row']
export type Airport = Database['public']['Tables']['airports']['Row']
export type City = Database['public']['Tables']['cities']['Row']
export type Counterpart = Database['public']['Tables']['counterparts']['Row']
export type Country = Database['public']['Tables']['countries']['Row']
export type Currency = Database['public']['Tables']['currencies']['Row']
export type FlightClass = Database['public']['Tables']['flightClasses']['Row']
export type Flight = Database['public']['Tables']['flights']['Row']
export type FlightSegment =
	Database['public']['Tables']['flightSegments']['Row']
export type FoodPlaceCategory =
	Database['public']['Tables']['foodPlaceCategories']['Row']
export type FoodTransaction =
	Database['public']['Tables']['foodTransactions']['Row']
export type FoodTypeCategory =
	Database['public']['Tables']['foodTypeCategories']['Row']
export type loyaltyProgram =
	Database['public']['Tables']['loyaltyPrograms']['Row']

export type paymentMethodCategory =
	Database['public']['Tables']['paymentMethodCategories']['Row']
export type PaymentMethod =
	Database['public']['Tables']['paymentMethods']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type TransactionCategory =
	Database['public']['Tables']['transactionCategories']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']

// enums
export type Continent = Database['public']['Enums']['continents']
