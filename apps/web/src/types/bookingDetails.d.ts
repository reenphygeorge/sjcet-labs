import { PeriodTiming } from './periodTiming';

export interface BookingDetailsCollected {
  semester: string;
  departmentWithBatch: string;
  timings: PeriodTiming[] | string[];
  venue: string;
  negotiable: boolean;
  purpose: string;
}

export interface BookingDetailsFetched {
  id: string;
  semester: string;
  departmentWithBatch: string;
  date: string;
  timings: string[];
  venue: string;
  purpose: string;
  status: string;
}
