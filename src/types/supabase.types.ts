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
      accommodationCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          type: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          type: number
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          type?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_accommodationCategories_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "accommodationTypes"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodationTransactions: {
        Row: {
          category: number
          createdAt: string
          homeTransaction: string
          id: string
          type: number
          updatedAt: string
        }
        Insert: {
          category: number
          createdAt?: string
          homeTransaction: string
          id?: string
          type: number
          updatedAt?: string
        }
        Update: {
          category?: number
          createdAt?: string
          homeTransaction?: string
          id?: string
          type?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_accommodationTransactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "accommodationCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_accommodationTransactions_homeTransaction_fkey"
            columns: ["homeTransaction"]
            isOneToOne: false
            referencedRelation: "homeTransactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_accommodationTransactions_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "accommodationTypes"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodationTypes: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      airlineAlliances: {
        Row: {
          createdAt: string
          id: number
          imageUrl: string
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          imageUrl: string
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          imageUrl?: string
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      airlines: {
        Row: {
          alliance: number | null
          callsign: string
          country: number
          createdAt: string
          IATA: string
          ICAO: string
          id: number
          imageUrl: string
          loyaltyProgram: number | null
          name: string
          updatedAt: string
        }
        Insert: {
          alliance?: number | null
          callsign: string
          country: number
          createdAt?: string
          IATA: string
          ICAO: string
          id?: number
          imageUrl: string
          loyaltyProgram?: number | null
          name: string
          updatedAt?: string
        }
        Update: {
          alliance?: number | null
          callsign?: string
          country?: number
          createdAt?: string
          IATA?: string
          ICAO?: string
          id?: number
          imageUrl?: string
          loyaltyProgram?: number | null
          name?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_airlines_airlineAlliance_fkey"
            columns: ["alliance"]
            isOneToOne: false
            referencedRelation: "airlineAlliances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_airlines_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_airlines_loyaltyProgram_fkey"
            columns: ["loyaltyProgram"]
            isOneToOne: false
            referencedRelation: "loyaltyPrograms"
            referencedColumns: ["id"]
          },
        ]
      }
      airports: {
        Row: {
          city: number
          createdAt: string
          IATA: string
          ICAO: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          city: number
          createdAt?: string
          IATA: string
          ICAO: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          city?: number
          createdAt?: string
          IATA?: string
          ICAO?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_airports_city_fkey"
            columns: ["city"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      carCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      carTransactions: {
        Row: {
          category: number
          createdAt: string
          id: string
          transportationTransaction: string
          updatedAt: string
        }
        Insert: {
          category: number
          createdAt?: string
          id?: string
          transportationTransaction: string
          updatedAt?: string
        }
        Update: {
          category?: number
          createdAt?: string
          id?: string
          transportationTransaction?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_carTransactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "carCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_carTransactions_transportationTransaction_fkey"
            columns: ["transportationTransaction"]
            isOneToOne: false
            referencedRelation: "transportationTransactions"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          country: number
          createdAt: string
          id: number
          localName: string
          name: string
          updatedAt: string
        }
        Insert: {
          country: number
          createdAt?: string
          id?: number
          localName: string
          name: string
          updatedAt?: string
        }
        Update: {
          country?: number
          createdAt?: string
          id?: number
          localName?: string
          name?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_cities2_countryId_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
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
          user: string
        }
        Insert: {
          createdAt?: string
          id?: string
          isExpense?: boolean
          isIncome?: boolean
          name?: string | null
          updatedAt?: string | null
          user: string
        }
        Update: {
          createdAt?: string
          id?: string
          isExpense?: boolean
          isIncome?: boolean
          name?: string | null
          updatedAt?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_counterparts_userId_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null
          currency: string | null
          id: number
          iso2: string
          iso3: string
          localName: string | null
          name: string
        }
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null
          currency?: string | null
          id?: number
          iso2?: string
          iso3?: string
          localName?: string | null
          name?: string
        }
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null
          currency?: string | null
          id?: number
          iso2?: string
          iso3?: string
          localName?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "countries_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          code: string
          createdAt: string
          id: string
          name: string
          updatedAt: string
        }
        Insert: {
          code?: string
          createdAt?: string
          id?: string
          name?: string
          updatedAt?: string
        }
        Update: {
          code?: string
          createdAt?: string
          id?: string
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      flightClasses: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      flightLuggageCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      flightSeatCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      flightSegments: {
        Row: {
          airline: number
          arrivalAirport: number
          class: number
          createdAt: string
          departureAirport: number
          flightTransaction: string
          id: string
          order: number
          seatCategory: number
          updatedAt: string
        }
        Insert: {
          airline: number
          arrivalAirport: number
          class: number
          createdAt?: string
          departureAirport: number
          flightTransaction: string
          id?: string
          order: number
          seatCategory: number
          updatedAt?: string
        }
        Update: {
          airline?: number
          arrivalAirport?: number
          class?: number
          createdAt?: string
          departureAirport?: number
          flightTransaction?: string
          id?: string
          order?: number
          seatCategory?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_flightSegments_airline_fkey"
            columns: ["airline"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_flightSegments_class_fkey"
            columns: ["class"]
            isOneToOne: false
            referencedRelation: "flightClasses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_flightSegments_flight_fkey"
            columns: ["flightTransaction"]
            isOneToOne: false
            referencedRelation: "flightTransactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_flightSegments_flightSeatCategory_fkey"
            columns: ["seatCategory"]
            isOneToOne: false
            referencedRelation: "flightSeatCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_flightSegments_fromAirport_fkey"
            columns: ["departureAirport"]
            isOneToOne: false
            referencedRelation: "airports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_flightSegments_toAirport_fkey"
            columns: ["arrivalAirport"]
            isOneToOne: false
            referencedRelation: "airports"
            referencedColumns: ["id"]
          },
        ]
      }
      flightTransactions: {
        Row: {
          createdAt: string
          id: string
          luggageCategory: number
          transportationTransaction: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: string
          luggageCategory: number
          transportationTransaction: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          luggageCategory?: number
          transportationTransaction?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_flights_luggageCategory_fkey"
            columns: ["luggageCategory"]
            isOneToOne: false
            referencedRelation: "flightLuggageCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_flightTransactions_transportationTransaction_fkey"
            columns: ["transportationTransaction"]
            isOneToOne: false
            referencedRelation: "transportationTransactions"
            referencedColumns: ["id"]
          },
        ]
      }
      foodAndDrinkPlaceCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      foodAndDrinkTransactions: {
        Row: {
          createdAt: string
          foodPlaceCategory: number
          foodTypeCategory: number
          id: string
          isDelivery: boolean | null
          isEatIn: boolean | null
          isLeftovers: boolean | null
          isTakeAway: boolean | null
          isWorked: boolean | null
          transaction: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          foodPlaceCategory: number
          foodTypeCategory: number
          id?: string
          isDelivery?: boolean | null
          isEatIn?: boolean | null
          isLeftovers?: boolean | null
          isTakeAway?: boolean | null
          isWorked?: boolean | null
          transaction: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          foodPlaceCategory?: number
          foodTypeCategory?: number
          id?: string
          isDelivery?: boolean | null
          isEatIn?: boolean | null
          isLeftovers?: boolean | null
          isTakeAway?: boolean | null
          isWorked?: boolean | null
          transaction?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_food_transaction_fkey"
            columns: ["transaction"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_foodTransactions_foodPlaceCategory_fkey"
            columns: ["foodPlaceCategory"]
            isOneToOne: false
            referencedRelation: "foodAndDrinkPlaceCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_foodTransactions_foodTypeCategory_fkey"
            columns: ["foodTypeCategory"]
            isOneToOne: false
            referencedRelation: "foodAndDrinkTypeCategories"
            referencedColumns: ["id"]
          },
        ]
      }
      foodAndDrinkTypeCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      healthAndWellnessCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      healthAndWellnessTransactions: {
        Row: {
          category: number
          createdAt: string
          id: string
          transaction: string
          updatedAt: string
        }
        Insert: {
          category: number
          createdAt?: string
          id?: string
          transaction: string
          updatedAt?: string
        }
        Update: {
          category?: number
          createdAt?: string
          id?: string
          transaction?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_healthAndWellnessTransactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "healthAndWellnessCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_healthAndWellnessTransactions_transaction_fkey"
            columns: ["transaction"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      homeCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      homeTransactions: {
        Row: {
          category: number
          createdAt: string
          id: string
          transaction: string
          updatedAt: string
        }
        Insert: {
          category: number
          createdAt?: string
          id?: string
          transaction: string
          updatedAt?: string
        }
        Update: {
          category?: number
          createdAt?: string
          id?: string
          transaction?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_homeTransactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "homeCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_homeTransactions_transaction_fkey"
            columns: ["transaction"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      loyaltyPrograms: {
        Row: {
          createdAt: string
          id: number
          name: string
          pointCurrency: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          pointCurrency: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          pointCurrency?: string
          updatedAt?: string
        }
        Relationships: []
      }
      paymentMethodCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      paymentMethods: {
        Row: {
          category: number
          createdAt: string
          id: string
          loyaltyProgram: number | null
          name: string
          updatedAt: string
          user: string
        }
        Insert: {
          category: number
          createdAt?: string
          id?: string
          loyaltyProgram?: number | null
          name?: string
          updatedAt?: string
          user: string
        }
        Update: {
          category?: number
          createdAt?: string
          id?: string
          loyaltyProgram?: number | null
          name?: string
          updatedAt?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "paymentMethods_userId_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_paymentMethods_loyaltyProgram_fkey"
            columns: ["loyaltyProgram"]
            isOneToOne: false
            referencedRelation: "loyaltyPrograms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_paymentMethods_PaymentMethodCategory_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "paymentMethodCategories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatarUrl: string | null
          birthDate: string | null
          city: number | null
          createdAt: string
          firstName: string | null
          id: string
          isAdmin: boolean
          lastName: string | null
          onboardingCompletedDate: string | null
          primaryCurrency: string | null
          updatedAt: string
          website: string | null
        }
        Insert: {
          avatarUrl?: string | null
          birthDate?: string | null
          city?: number | null
          createdAt?: string
          firstName?: string | null
          id: string
          isAdmin?: boolean
          lastName?: string | null
          onboardingCompletedDate?: string | null
          primaryCurrency?: string | null
          updatedAt?: string
          website?: string | null
        }
        Update: {
          avatarUrl?: string | null
          birthDate?: string | null
          city?: number | null
          createdAt?: string
          firstName?: string | null
          id?: string
          isAdmin?: boolean
          lastName?: string | null
          onboardingCompletedDate?: string | null
          primaryCurrency?: string | null
          updatedAt?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_primaryCurrency_fkey"
            columns: ["primaryCurrency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_profiles_cityId_fkey"
            columns: ["city"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      shoppingCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      shoppingTransactions: {
        Row: {
          category: number
          createdAt: string
          id: string
          transaction: string
          updatedAt: string
        }
        Insert: {
          category: number
          createdAt?: string
          id?: string
          transaction: string
          updatedAt?: string
        }
        Update: {
          category?: number
          createdAt?: string
          id?: string
          transaction?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_shoppingTransactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "shoppingCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_shoppingTransactions_transaction_fkey"
            columns: ["transaction"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactionCategories: {
        Row: {
          createdAt: string
          id: number
          isIncome: boolean
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          isIncome?: boolean
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          isIncome?: boolean
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: number | null
          city: number
          counterpart: string | null
          createdAt: string
          currency: string
          description: string | null
          id: string
          item: string
          paymentMethod: string
          tipAmount: number | null
          transactionDate: string
          updatedAt: string
          user: string
        }
        Insert: {
          amount: number
          category?: number | null
          city: number
          counterpart?: string | null
          createdAt?: string
          currency: string
          description?: string | null
          id?: string
          item?: string
          paymentMethod: string
          tipAmount?: number | null
          transactionDate: string
          updatedAt?: string
          user: string
        }
        Update: {
          amount?: number
          category?: number | null
          city?: number
          counterpart?: string | null
          createdAt?: string
          currency?: string
          description?: string | null
          id?: string
          item?: string
          paymentMethod?: string
          tipAmount?: number | null
          transactionDate?: string
          updatedAt?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_transactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "transactionCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transactions_cityId_fkey"
            columns: ["city"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transactions_counterpart_fkey"
            columns: ["counterpart"]
            isOneToOne: false
            referencedRelation: "counterparts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transactions_paymentMethod_fkey"
            columns: ["paymentMethod"]
            isOneToOne: false
            referencedRelation: "paymentMethods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_userId_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transportationCategories: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      transportationTransactions: {
        Row: {
          category: number
          createdAt: string
          id: string
          transaction: string
          updatedAt: string
        }
        Insert: {
          category: number
          createdAt?: string
          id?: string
          transaction: string
          updatedAt?: string
        }
        Update: {
          category?: number
          createdAt?: string
          id?: string
          transaction?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_transportationTransactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "transportationCategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transportationTransactions_transaction_fkey"
            columns: ["transaction"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
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
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
