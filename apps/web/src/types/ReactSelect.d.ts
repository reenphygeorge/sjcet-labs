import { PeriodTiming } from './BookLab';

interface ReactSelectProps {
  options: StringValuedOptions[] | NumberOptions[] | any[] | undefined;
  values: PeriodTiming[] | Options[] | any[];
  disabled: boolean;
  onChange?: (event: ValueType<Options>) => void;
  placeHolder?: string;
}

interface StringValuedOptions {
  value: string;
  label: string;
}

interface NumberOptions {
  value: number;
  label: string;
}

export { ReactSelectProps, NumberOptions, StringValuedOptions };
