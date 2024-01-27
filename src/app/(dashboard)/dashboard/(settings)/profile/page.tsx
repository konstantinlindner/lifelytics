'use client';

import { useState } from 'react';

import { useUser } from '@/contexts/UserContext';

import { toast } from 'sonner';

import ProfilePictureUpload from '@/components/profilePicturePicker';
import DatePicker from '@/components/datePicker';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const {
    user,
    setEmail,
    setFirstName,
    setLastName,
    setBirthDate,
    setWebsite,
  } = useUser();

  const [email, setLocalEmail] = useState<string>(user?.email ?? '');
  const [firstName, setLocalFirstName] = useState<string>(
    user?.firstName ?? '',
  );
  const [lastName, setLocalLastName] = useState<string>(user?.lastName ?? '');
  const [birthDate, setLocalBirthDate] = useState<Date | null>(
    user?.birthDate ?? null,
  );
  const [website, setLocalWebsite] = useState<string>(user?.website ?? '');

  function handleSave() {
    try {
      setBirthDate(birthDate);
      setEmail(email);
      setFirstName(firstName);
      setLastName(lastName);
      setWebsite(website);
    } catch (error) {
      console.log(error);
    }
    toast('Successfully saved changes');
  }

  return (
    <main>
      <div className="flex flex-col space-y-4 content-start">
        <ProfilePictureUpload />
        <div className="grid gap-4 max-w-xs">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="first-name">First name</Label>
            <Input
              onChange={(e) => setLocalFirstName(e.target.value)}
              id="first-name"
              defaultValue={firstName}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              onChange={(e) => setLocalLastName(e.target.value)}
              id="last-name"
              defaultValue={lastName}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setLocalEmail(e.target.value)}
              id="email"
              defaultValue={email}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="birthDate">Date of birth</Label>
            <DatePicker
              initialDate={birthDate ? birthDate : undefined}
              fromYear={1900}
              toYear={2024}
              handleDateChange={setLocalBirthDate}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="website">Website</Label>
            <Input
              onChange={(e) => setLocalWebsite(e.target.value)}
              id="website"
              defaultValue={website}
              className="col-span-3"
            />
          </div>
        </div>
        <Button className="max-w-xs" onClick={handleSave}>
          Save
        </Button>
      </div>
    </main>
  );
}
