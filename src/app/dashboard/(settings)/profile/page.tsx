import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: profiles } = await supabase.from("profiles").select(`
  avatar_url,
  first_name,
  last_name
  `);

  const avatarUrl = profiles?.[0].avatar_url;
  const firstName = profiles?.[0].first_name;
  const lastName = profiles?.[0].last_name;
  const fullName = `${profiles?.[0].first_name} ${profiles?.[0].last_name}`;
  const initials = `${profiles?.[0].first_name?.charAt(
    0
  )}${profiles?.[0].last_name?.charAt(0)}`;
  const email = session?.user.email;

  return (
    <main>
      <div className="flex"></div>
      <Button variant="ghost" className="h-40 w-40 rounded-full">
        <Avatar className="h-40 w-40">
          <AvatarImage src={avatarUrl} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Button>
      <Input defaultValue={firstName} className="max-w-xs" />
      <Input defaultValue={lastName} className="max-w-xs" />
    </main>
  );
}
