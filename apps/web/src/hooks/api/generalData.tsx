/* eslint-disable import/extensions */
import { apiHandler } from '@/config/handler';

const getGeneralData = async () => {
  const { data } = await apiHandler.get(`/generalData`);
  return data;
};

export default getGeneralData;
