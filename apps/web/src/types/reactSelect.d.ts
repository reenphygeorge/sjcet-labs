import { PeriodTiming } from './periodTiming';

export interface ReactSelectProps {
  options: Options[] | any[] | undefined;
  values: PeriodTiming[] | null;
}

interface Options {
  value: string;
  label: string;
}
