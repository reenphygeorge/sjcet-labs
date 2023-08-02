/* eslint-disable import/extensions */
import { apiHandler } from '@/config/handler';
import { Profile } from '@/types/UserData';

const getUser = async (authId: string) => {
  const { data } = await apiHandler.get(`/user/getUser?authId=${authId}`);
  return data;
};

const patchUser = async (userData: Profile) => {
  const { data } = await apiHandler.patch(`/user/patchUser`, userData);
  return data;
};

export { getUser, patchUser };
