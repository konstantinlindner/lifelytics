import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { transactionColumns } from "@/app/dashboard/transactions/components/transactionColumns";
import { TransactionTable } from "@/app/dashboard/transactions/components/transactionTable";

export default async function Transactions() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: transactions } = await supabase.from("transactions").select(`
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
      <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
      <p className="text-muted-foreground">
        Here&apos;s a list of all transactions.
      </p>

      <div className="mx-auto py-10">
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
