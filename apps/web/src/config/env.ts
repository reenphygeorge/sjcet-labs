/* eslint-disable import/extensions */
import { ENV } from '@/types/ENV';

const env: ENV = {
  supabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  supabaseAPIKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string,
  apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN as string,
};

export default env;
