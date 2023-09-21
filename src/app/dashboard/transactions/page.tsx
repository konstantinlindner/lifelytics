import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import SignOutButton from "@/app/dashboard/(components)/sign-out-button";

type Transaction = {
  amount: number | null;
  country: number | null;
  created_at: string | null;
  currency: string | null;
  id: string;
  name: string | null;
  updated_at: string | null;
  user: string | null;
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

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
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </main>
  );
}
