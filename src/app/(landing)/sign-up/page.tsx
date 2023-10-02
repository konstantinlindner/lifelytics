import Link from 'next/link';
import Logo from '@/components/logo';
import { ChevronLeft } from 'lucide-react';

import SignUpForm from '@/app/(landing)/sign-up/components/signUpForm';
import { Button } from '@/components/ui/button';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignUp() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto h-6 w-6">
            <Logo hideText />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Lifelytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and choose a password to sign up
          </p>
        </div>
        <SignUpForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/sign-in"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
