import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignOutButton from "@/app/dashboard/(components)/sign-out-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <SignOutButton />
      <h1>Dashboard</h1>
      <p>Hello {session.user.email}</p>
      <Link href={"/dashboard/transactions"}>
        <Button size="sm" variant="default">
          Transactions
        </Button>
      </Link>
    </main>
  );
}
