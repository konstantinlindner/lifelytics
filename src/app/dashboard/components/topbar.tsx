import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SignOutMenuItem from './signOutMenuItem';
import ModeToggle from '@/components/modeToggle';
import PageHeader from './pageHeader';
import CommandModal from './commandModal';

export default async function Topbar() {
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

  const { data: profiles } = await supabase.from('profiles').select(`
    avatarUrl,
    first_name,
    last_name
    `);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const avatarUrl = profiles?.[0].avatarUrl;
  const fullName = `${profiles?.[0].first_name} ${profiles?.[0].last_name}`;
  const initials = `${profiles?.[0].first_name?.charAt(
    0,
  )}${profiles?.[0].last_name?.charAt(0)}`;

  return (
    <header className="flex justify-between gap-2 items-center py-6 px-10 h-24">
      <PageHeader />
      <div className="flex gap-4 items-center">
        <CommandModal />
        <ModeToggle isRound />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatarUrl} alt={fullName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{fullName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/dashboard/profile"
                  passHref
                  className="flex w-full"
                >
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/dashboard/account" className="flex w-full">
                  Account
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
