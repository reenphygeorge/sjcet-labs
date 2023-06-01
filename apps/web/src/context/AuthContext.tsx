// authContext.tsx
import { Session } from '@supabase/supabase-js';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import supabase from '@/config/supabase.config';

type AuthContextValue = {
  appSession: Session | null;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [appSession, setAppSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAppSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAppSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const authContextValue: AuthContextValue = useMemo(
    () => ({
      appSession,
      signIn: async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return error;
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
    }),
    [appSession]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
