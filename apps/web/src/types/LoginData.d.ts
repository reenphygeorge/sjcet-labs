import { AuthError } from '@supabase/supabase-js';

interface LoginData {
  email: string;
  password: string;
}

interface ResetPasswordResult {
  data: Object | null;
  error: AuthError | null;
}

interface LoadingState {
  state: State;
}

enum State {
  IsLoading,
  NotLoading,
}
export { LoginData, ResetPasswordResult, State, LoadingState };
