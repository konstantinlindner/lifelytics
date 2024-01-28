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
  createdAt: string | null;
  updatedAt: string | null;
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
        createdAt,
        updatedAt
    `);

    if (!currencies) {
      setCurrencies(null);
    } else {
      const formattedCurrencies = currencies.map((currency) => ({
        id: currency.id,
        name: currency.name,
        code: currency.code,
        countries: currency.countries,
        createdAt: currency.createdAt,
        updatedAt: currency.updatedAt,
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
