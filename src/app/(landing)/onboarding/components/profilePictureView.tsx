'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase.types';
import { useRouter } from 'next/navigation';

import ProfilePictureUpload from '@/components/profilePicturePicker';

import { Button } from '@/components/ui/button';

interface ProfilePictureViewProps {
  fullName: string;
  avatarUrl: string;
  currentViewIndex: number;
  setCurrentViewIndex: (view: number) => void;
}

export default function ProfilePictureView({
  fullName,
  avatarUrl,
  currentViewIndex,
  setCurrentViewIndex,
}: ProfilePictureViewProps) {
  const router = useRouter();
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const setOnboardingCompletedDate = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const id = session?.user.id;

      if (!id) {
        return;
      }

      const currentDateString = new Date().toLocaleString();

      const { error } = await supabase
        .from('profiles')
        .update({ onboardingCompletedDate: currentDateString })
        .eq('id', id);

      router.refresh();
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full space-y-10 flex flex-col items-center">
      <div className="flex space-x-1 border border-black rounded-lg px-24 py-32">
        <ProfilePictureUpload fullName={fullName} avatarUrl={avatarUrl} />
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          className="w-44"
          onClick={() => setCurrentViewIndex(currentViewIndex - 1)}
        >
          Back
        </Button>
        <Button
          variant={avatarUrl ? 'default' : 'secondary'}
          className="w-44"
          onClick={() => setOnboardingCompletedDate()}
        >
          {avatarUrl ? 'Finish' : 'Skip'}
        </Button>
      </div>
    </section>
  );
}
