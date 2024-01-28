'use client';

import { useUser } from '@/contexts/UserContext';

import { toast } from 'sonner';

import dayjs from 'dayjs';

import SignOutButton from '../../components/signOutButton';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Account() {
  const { user } = useUser();

  function handleAccountDeletion() {
    toast('Not yet implemented');
  }

  return (
    <main>
      <div className="flex flex-col">
        <div className="w-full flex flex-col space-y-4 max-w-xs">
          <p>Member since {dayjs(user?.createdAt).format('MMMM YYYY')}</p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAccountDeletion}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
