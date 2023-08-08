"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase.types";

import { Button } from "@/components/ui/button";

function SignOutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({});
      if (error) throw error;
      // currently not possible to redirect
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}

export default SignOutButton;
