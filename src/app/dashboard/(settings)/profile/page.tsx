// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { Pencil } from 'lucide-react';

export default async function Dashboard() {
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profiles } = await supabase.from('profiles').select(`
  avatar_url,
  first_name,
  last_name
  `);

  const avatarUrl = profiles?.[0].avatar_url;
  const firstName = profiles?.[0].first_name;
  const lastName = profiles?.[0].last_name;
  const fullName = `${profiles?.[0].first_name} ${profiles?.[0].last_name}`;
  const initials = `${profiles?.[0].first_name?.charAt(
    0,
  )}${profiles?.[0].last_name?.charAt(0)}`;
  const email = session?.user.email;

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-40 w-40 rounded-full">
            <div className="w-40 h-40 rounded-full relative flex justify-center items-center">
              <Avatar className="h-40 w-40">
                <AvatarImage src={avatarUrl} alt={fullName} />
                <AvatarFallback className="text-5xl text-white bg-muted-foreground">
                  <Pencil strokeWidth="3" size={36} />
                </AvatarFallback>
              </Avatar>
              <div className="w-40 h-40 rounded-full absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 text-white">
                <Pencil strokeWidth="3" size={36} />
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change profile image</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full lg:max-w-sm items-center gap-1.5">
              <Label htmlFor="image-upload">Upload image</Label>
              <Input id="image-upload" type="file" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <Label htmlFor="image-url">Image URL</Label>
            <Input id="image-url" defaultValue="" className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="first-name" className="text-right">
            First name
          </Label>
          <Input
            id="first-name"
            defaultValue={firstName}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="last-name" className="text-right">
            Last name
          </Label>
          <Input
            id="last-name"
            defaultValue={lastName}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" defaultValue={email} className="col-span-3" />
        </div>
      </div>
    </main>
  );
}
