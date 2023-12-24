'use client';

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import supabase from '@/lib/supabase';

type Profile = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  hasCompletedOnboarding: boolean;
  avatarUrl: string | null;
  dateOfBirth: Date | null;
  website: string | null;
};

const Context = createContext<Profile | null>(undefined!);

export const useUser = () => useContext(Context);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const { data: profiles } = await supabase.from('profiles').select(`
            firstName,
            lastName,
            avatarUrl,
            onboardingCompletedDate,
            dateOfBirth,
            website
        `);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (controller.signal.aborted) return;

      const profile = profiles?.[0];
      const sessionContent = session?.user;

      if (!profile || !sessionContent?.email) {
        setProfile(null);
      } else {
        setProfile({
          email: sessionContent.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          avatarUrl: profile.avatarUrl,
          hasCompletedOnboarding: !!profile.onboardingCompletedDate,
          dateOfBirth: profile.dateOfBirth
            ? new Date(profile.dateOfBirth)
            : null,
          website: profile.website,
        });
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  if (profile === undefined) return <p>Loading...</p>;

  return <Context.Provider value={profile}>{children}</Context.Provider>;
};
