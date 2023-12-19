export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          continent: Database['public']['Enums']['continents'] | null;
          id: number;
          iso2: string;
          iso3: string | null;
          local_name: string | null;
          name: string | null;
        };
        Insert: {
          continent?: Database['public']['Enums']['continents'] | null;
          id?: number;
          iso2: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Update: {
          continent?: Database['public']['Enums']['continents'] | null;
          id?: number;
          iso2?: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      currencies: {
        Row: {
          countries: number | null;
          created_at: string | null;
          id: string;
          name: string | null;
          short_name: string | null;
          updated_at: string | null;
        };
        Insert: {
          countries?: number | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
          short_name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          countries?: number | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
          short_name?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'currencies_countries_fkey';
            columns: ['countries'];
            referencedRelation: 'countries';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatarUrl: string | null;
          created_at: string | null;
          date_of_birth: string | null;
          first_name: string | null;
          full_name: string | null;
          id: string;
          last_name: string | null;
          transactions: string | null;
          updated_at: string | null;
          website: string | null;
          onboardingCompletedDate: string | null;
        };
        Insert: {
          avatarUrl?: string | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          first_name?: string | null;
          full_name?: string | null;
          id?: string;
          last_name?: string | null;
          transactions?: string | null;
          updated_at?: string | null;
          website?: string | null;
          onboardingCompletedDate?: string | null;
        };
        Update: {
          avatarUrl?: string | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          first_name?: string | null;
          full_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          transactions?: string | null;
          updated_at?: string | null;
          website?: string | null;
          onboardingCompletedDate?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_transactions_fkey';
            columns: ['transactions'];
            referencedRelation: 'transactions';
            referencedColumns: ['id'];
          },
        ];
      };
      transactions: {
        Row: {
          amount: number | null;
          country: number | null;
          created_at: string | null;
          currency: string | null;
          date: string | null;
          id: string;
          name: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          amount?: number | null;
          country?: number | null;
          created_at?: string | null;
          currency?: string | null;
          date?: string | null;
          id?: string;
          name?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number | null;
          country?: number | null;
          created_at?: string | null;
          currency?: string | null;
          date?: string | null;
          id?: string;
          name?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'transactions_country_fkey';
            columns: ['country'];
            referencedRelation: 'countries';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transactions_currency_fkey';
            columns: ['currency'];
            referencedRelation: 'currencies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transactions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      continents:
        | 'Africa'
        | 'Antarctica'
        | 'Asia'
        | 'Europe'
        | 'Oceania'
        | 'North America'
        | 'South America';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
