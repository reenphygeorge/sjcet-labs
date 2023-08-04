/* eslint-disable import/extensions */
import { apiHandler } from '@/config/handler';
import { NewReportData } from '@/types/Reports';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const createReports = async (reportData: NewReportData) => {
  const { data } = await apiHandler.post(`/report/create`, reportData, config);
  return data;
};

const reviewReports = async (reportId: string) => {
  const { data } = await apiHandler.patch(`/report/review`, { reviewId: reportId });
  return data;
};

export { createReports, reviewReports };
