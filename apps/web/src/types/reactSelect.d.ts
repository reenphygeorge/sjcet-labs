import { ValueType } from 'react-select';
import { PeriodTiming } from './periodTiming';

export interface ReactSelectProps {
  options: Options[] | any[] | undefined;
  values: PeriodTiming[] | any[];
  disabled: boolean;
  onChange?: (event: ValueType<Options>) => void;
}

export interface Options {
  value: string;
  label: string;
}
