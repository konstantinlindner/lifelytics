import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import AnimatedHeader from './components/animatedHeader';
import ProfilePictureUpload from './components/profilePictureUpload';
import CurrencyPicker from './components/currencyPicker';

import { Button } from '@/components/ui/button';

export default async function SignUp() {
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

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // const { data: profiles } = await supabase.from('profiles').select(`
  //   first_name
  //   `);

  // const firstName = profiles?.[0]?.first_name ?? '';

  return (
    <div className="container flex h-screen w-screen flex-col space-y-10 items-center max-w-[64rem] pb-8 pt-24">
      <AnimatedHeader />

      <div className="p-20">
        <ProfilePictureUpload />

        <CurrencyPicker />
      </div>

      <Button className="w-60" type="submit">
        Next
      </Button>
    </div>
  );
}
