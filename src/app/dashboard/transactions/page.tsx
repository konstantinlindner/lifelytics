import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Transaction, columns } from "@/app/dashboard/transactions/columns";
import { DataTable } from "@/app/dashboard/transactions/dataTable";
import SignOutButton from "@/app/dashboard/(components)/sign-out-button";

export default async function Transactions() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: transactions } = await supabase.from("transactions").select();

  return (
    <main>
      <SignOutButton />
      <h1>Your transactions</h1>

      <div className="container mx-auto py-10">
        {transactions ? (
          <DataTable columns={columns} data={transactions} />
        ) : (
          <p>
            Error, could not load transactions. Please try reloading the page.
          </p>
        )}
      </div>
    </main>
  );
}
