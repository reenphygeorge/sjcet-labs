import dotenv from 'dotenv';
import ENV from './types/ENV';

dotenv.config();

const env: ENV = {
  apiPort: process.env.API_PORT as string,
  websiteDomain: process.env.WEBSITE_DOMAIN as string,
};

export default env;
