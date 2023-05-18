import dotenv from 'dotenv';
import ENV from './interfaces/env';

dotenv.config();

const env: ENV = {
  apiPort: process.env.API_PORT as string,
  appName: process.env.SUPERTOKENS_APP_NAME as string,
  apiDomain: process.env.SUPERTOKENS_API_DOMAIN as string,
  websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN as string,
  apiBasePath: process.env.SUPERTOKENS_API_BASE_PATH as string,
  websiteBasePath: process.env.SUPERTOKENS_WEBSITE_BASE_PATH as string,
  supertokensConnectionURL: process.env.SUPERTOKENS_CONNECTION_URL as string,
  apiKey: process.env.SUPERTOKENS_API_KEY as string,
};

export default env;
