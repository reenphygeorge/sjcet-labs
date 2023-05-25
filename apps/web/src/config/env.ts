/* eslint-disable import/extensions */
import { ENV } from '@/types/ENV';

const env: ENV = {
  appName: process.env.NEXT_PUBLIC_SUPERTOKENS_APP_NAME as string,
  apiDomain: process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN as string,
  websiteDomain: process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_DOMAIN as string,
  apiBasePath: process.env.NEXT_PUBLIC_SUPERTOKENS_API_BASE_PATH as string,
  websiteBasePath: process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_BASE_PATH as string,
};

export default env;
