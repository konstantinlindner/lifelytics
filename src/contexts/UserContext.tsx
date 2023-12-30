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
  fullName: string | null;
  initials: string | null;
  hasCompletedOnboarding: boolean;
  avatarUrl: string | null;
  birthDate: Date | null;
  website: string | null;
};

const Context = createContext({
  user: null as User | null,
  fetchData: () => {},
  addNamesToUserProfile: (firstName: string, lastName: string) => {},
  setOnboardingComplete: () => {},
  setEmail: (email: string) => {},
  setFirstName: (firstName: string) => {},
  setLastName: (lastName: string) => {},
  setBirthDate: (date: Date) => {},
  setAvatarUrl: (urlString: string) => {},
  setWebsite: (website: string) => {},
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
      birthDate,
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
        fullName: `${profile.firstName} ${profile.lastName}`,
        initials: `${profile.firstName?.[0]}${profile.lastName?.[0]}`,
        avatarUrl: profile.avatarUrl,
        hasCompletedOnboarding: !!profile.onboardingCompletedDate,
        birthDate: profile.birthDate ? new Date(profile.birthDate) : null,
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

  const setAvatarUrl = useCallback(
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

  const setOnboardingComplete = useCallback(async () => {
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

  const setEmail = useCallback(
    async (email: string) => {
      try {
        const { error } = await supabase.auth.updateUser({ email: email });

        fetchData();
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData],
  );

  const setFirstName = useCallback(
    async (firstName: string) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const id = session?.user.id;

        if (!id) {
          return;
        }

        const { error } = await supabase
          .from('profiles')
          .update({ firstName: firstName })
          .eq('id', id);

        fetchData();
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData],
  );

  const setLastName = useCallback(
    async (lastName: string) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const id = session?.user.id;

        if (!id) {
          return;
        }

        const { error } = await supabase
          .from('profiles')
          .update({ lastName: lastName })
          .eq('id', id);

        fetchData();
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData],
  );

  const setBirthDate = useCallback(
    async (date: Date) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const id = session?.user.id;

        if (!id) {
          return;
        }

        const dateString = date.toLocaleString();

        const { error } = await supabase
          .from('profiles')
          .update({ birthDate: dateString })
          .eq('id', id);

        fetchData();
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData],
  );

  const setWebsite = useCallback(
    async (website: string) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const id = session?.user.id;

        if (!id) {
          return;
        }

        const { error } = await supabase
          .from('profiles')
          .update({ website: website })
          .eq('id', id);

        fetchData();
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData],
  );

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
        setOnboardingComplete,
        setEmail,
        setFirstName,
        setLastName,
        setBirthDate,
        setAvatarUrl,
        setWebsite,
      }}
    >
      {children}
    </Context.Provider>
  );
};
