import { AuthError } from '@supabase/supabase-js';

type LoginData = {
  email: string;
  password: string;
};

type ResetPasswordResult = {
  data: Object | null;
  error: AuthError | null;
};

type LoadingState = {
  state: 'IsLoading' | 'NotLoading';
};

export { LoginData, ResetPasswordResult, LoadingState };
