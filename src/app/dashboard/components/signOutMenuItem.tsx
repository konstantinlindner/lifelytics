"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/supabase.types";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

function SignOutMenuItem() {
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

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
      Sign out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export default SignOutMenuItem;
