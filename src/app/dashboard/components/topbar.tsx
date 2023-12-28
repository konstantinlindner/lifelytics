'use client';

import { useUser } from '@/contexts/UserContext';

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

import SignOutButton from './signOutButton';
import ModeToggle from '@/components/modeToggle';
import PageHeader from './pageHeader';
import CommandModal from './commandModal';

export default function Topbar() {
  const user = useUser().user;

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;
  const avatarUrl = user?.avatarUrl ?? '';
  const email = user?.email;
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

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
                  {email}
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
            <SignOutButton isMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
