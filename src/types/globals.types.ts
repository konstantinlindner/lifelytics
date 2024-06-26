import { Database } from '@/types/supabase.types'

// tables
export type AccommodationCategory =
	Database['public']['Tables']['accommodationCategories']['Row']
export type AccommodationTransaction =
	Database['public']['Tables']['accommodationTransactions']['Row']
export type AirlineAlliance =
	Database['public']['Tables']['airlineAlliances']['Row']
export type Airline = Database['public']['Tables']['airlines']['Row']
export type Airport = Database['public']['Tables']['airports']['Row']
export type CarCategory = Database['public']['Tables']['carCategories']['Row']
export type CarTransaction =
	Database['public']['Tables']['carTransactions']['Row']
export type City = Database['public']['Tables']['cities']['Row']
export type Counterpart = Database['public']['Tables']['counterparts']['Row']
export type Country = Database['public']['Tables']['countries']['Row']
export type Currency = Database['public']['Tables']['currencies']['Row']
export type FlightClass = Database['public']['Tables']['flightClasses']['Row']
export type FlightLuggageCategory =
	Database['public']['Tables']['flightLuggageCategories']['Row']
export type FlightSeatCategory =
	Database['public']['Tables']['flightSeatCategories']['Row']
export type FlightTransaction =
	Database['public']['Tables']['flightTransactions']['Row']
export type FlightTransactionSegment =
	Database['public']['Tables']['flightTransactionSegments']['Row']
export type FoodAndDrinkPlaceCategory =
	Database['public']['Tables']['foodAndDrinkPlaceCategories']['Row']
export type FoodAndDrinkTransaction =
	Database['public']['Tables']['foodAndDrinkTransactions']['Row']
export type FoodAndDrinkTypeCategory =
	Database['public']['Tables']['foodAndDrinkTypeCategories']['Row']
export type HealthAndWellnessCategory =
	Database['public']['Tables']['healthAndWellnessCategories']['Row']
export type HealthAndWellnessTransaction =
	Database['public']['Tables']['healthAndWellnessTransactions']['Row']
export type HomeCategory = Database['public']['Tables']['homeCategories']['Row']
export type HomeTransaction =
	Database['public']['Tables']['homeTransactions']['Row']
export type LoyaltyProgram =
	Database['public']['Tables']['loyaltyPrograms']['Row']
export type PaymentMethodCategory =
	Database['public']['Tables']['paymentMethodCategories']['Row']
export type PaymentMethod =
	Database['public']['Tables']['paymentMethods']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ShoppingCategory =
	Database['public']['Tables']['shoppingCategories']['Row']
export type ShoppingTransaction =
	Database['public']['Tables']['shoppingTransactions']['Row']
export type TransactionCategory =
	Database['public']['Tables']['transactionCategories']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type TransportationCategory =
	Database['public']['Tables']['transportationCategories']['Row']
export type TransportationTransaction =
	Database['public']['Tables']['transportationTransactions']['Row']

// enums
export type EatInTakeAway = Database['public']['Enums']['eatInTakeAway']
export type AccommodationType =
	Database['public']['Enums']['accommodationTypes']
export type Continent = Database['public']['Enums']['continents']
