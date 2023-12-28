'use client';

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import supabase from '@/lib/supabase';

type Currencies = {
  id: string;
  name: string | null;
  code: string | null;
  countries: number | null;
  created_at: string | null;
  updated_at: string | null;
}[];

const Context = createContext({
  currencies: null as Currencies | null,
  fetchCurrencies: () => {},
});

export const useDatabase = () => useContext(Context);

export const DatabaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currencies | null>();

  const fetchCurrencies = useCallback(async () => {
    const { data: currencies } = await supabase.from('currencies').select(`
        id,
        name,
        code,
        countries,
        created_at,
        updated_at
    `);

    if (!currencies) {
      setCurrencies(null);
    } else {
      const formattedCurrencies = currencies.map((currency) => ({
        id: currency.id,
        name: currency.name,
        code: currency.code,
        countries: currency.countries,
        created_at: currency.created_at,
        updated_at: currency.updated_at,
      }));

      setCurrencies(formattedCurrencies);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  if (currencies === undefined) {
    return null;
  }

  return (
    <Context.Provider value={{ currencies, fetchCurrencies }}>
      {children}
    </Context.Provider>
  );
};
