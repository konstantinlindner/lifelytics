import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/sign-out-button";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: currencies } = await supabase.from("currencies").select();

  return (
    <main>
      <SignOutButton />
      <h1>Dashboard</h1>
      <p>Hello {session.user.email}</p>
      <pre>{JSON.stringify(currencies, null, 2)}</pre>
    </main>
  );
}
