import Axios from 'axios';
import env from './env';

export const apiHandler = Axios.create({
  baseURL: env.apiDomain,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
