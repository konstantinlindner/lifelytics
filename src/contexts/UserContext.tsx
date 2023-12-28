'use client';

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import supabase from '@/lib/supabase';

import LoadingIndicator from '@/components/loadingIndicator';

type User = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  hasCompletedOnboarding: boolean;
  avatarUrl: string | null;
  dateOfBirth: Date | null;
  website: string | null;
};

const Context = createContext({
  user: null as User | null,
  fetchData: () => {},
  addNamesToUserProfile: (firstName: string, lastName: string) => {},
  updateAvatarUrl: (urlString: string) => {},
  setOnboardingCompletedDate: () => {},
});

export const useUser = () => useContext(Context);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>();

  const fetchData = useCallback(async () => {
    const { data: profiles } = await supabase.from('profiles').select(`
      firstName,
      lastName,
      onboardingCompletedDate,
      avatarUrl,
      dateOfBirth,
      website
    `);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const profile = profiles?.[0];
    const sessionUser = session?.user;

    if (!profile || !sessionUser?.email) {
      setUser(null);
    } else {
      setUser({
        email: sessionUser.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatarUrl: profile.avatarUrl,
        hasCompletedOnboarding: !!profile.onboardingCompletedDate,
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
        website: profile.website,
      });
    }
  }, []);

  const addNamesToUserProfile = async (firstName: string, lastName: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const id = session?.user.id;

    if (!id) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ firstName: firstName, lastName: lastName })
        .eq('id', id);

      fetchData();
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAvatarUrl = useCallback(
    async (urlString: string) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const id = session?.user.id;

      if (!id) {
        return;
      }
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ avatarUrl: urlString })
          .eq('id', id);

        fetchData();
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData],
  );

  const setOnboardingCompletedDate = useCallback(async () => {
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

      fetchData();
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (user === undefined)
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <LoadingIndicator size="lg" />
      </div>
    );

  return (
    <Context.Provider
      value={{
        user,
        fetchData,
        addNamesToUserProfile,
        updateAvatarUrl,
        setOnboardingCompletedDate,
      }}
    >
      {children}
    </Context.Provider>
  );
};
