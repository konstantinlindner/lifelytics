import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { transactionColumns } from './components/transactionColumns';
import { TransactionTable } from './components/transactionTable';

export default async function Transactions() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
  const { data: transactions } = await supabase.from('transactions').select(`
  date,
  name,
  amount,
  currency ( code ),
  country ( name )
`);

  const transactionsFormatted = transactions?.map((transaction) => ({
    date: transaction.date,
    name: transaction.name,
    amount: transaction.amount,
    //@ts-ignore
    currency: transaction.currency.code,
    //@ts-ignore
    country: transaction.country.name,
  }));

  return (
    <main>
      <div className="mx-auto">
        {transactionsFormatted ? (
          <TransactionTable
            columns={transactionColumns}
            data={transactionsFormatted}
          />
        ) : (
          <p>
            Error, could not load transactions. Please try reloading the page.
          </p>
        )}
      </div>
    </main>
  );
}
