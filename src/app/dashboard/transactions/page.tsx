import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </main>
  );
}
