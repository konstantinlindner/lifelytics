'use client';

import { useUser } from '@/contexts/UserContext';

import ProfilePictureUpload from '@/components/profilePicturePicker';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile() {
  const user = useUser().user;

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const email = user?.email ?? '';

  return (
    <main>
      <div className="flex flex-col content-start">
        <ProfilePictureUpload />
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              defaultValue={firstName}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              defaultValue={lastName}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={email} className="col-span-3" />
          </div>
        </div>
      </div>
    </main>
  );
}
