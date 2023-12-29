'use client';

import { useUser } from '@/contexts/UserContext';

import { toast } from 'sonner';

import ProfilePictureUpload from '@/components/profilePicturePicker';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const user = useUser().user;

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const email = user?.email ?? '';

  function handleSave() {
    toast('Not yet implemented.');
  }

  return (
    <main>
      <div className="flex flex-col space-y-4 content-start">
        <ProfilePictureUpload />
        <div className="grid gap-4 max-w-xs">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              defaultValue={firstName}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              defaultValue={lastName}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={email} className="col-span-3" />
          </div>
        </div>
        <Button className="max-w-xs" onClick={handleSave}>
          Save
        </Button>
      </div>
    </main>
  );
}
