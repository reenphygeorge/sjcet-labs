import { SelectedPeriod } from './BookLab';

type ReactSelectProps = {
  options: StringValuedOptions[] | NumberOptions[] | any[] | undefined;
  values: SelectedPeriod[] | NumberOptions[] | Options[] | any[];
  disabled: boolean;
  onChange?: (event: ValueType<Options>) => void;
  placeHolder?: string;
};

type StringValuedOptions = {
  value: string;
  label: string;
};

type NumberOptions = {
  value: number;
  label: string;
};

export { ReactSelectProps, NumberOptions, StringValuedOptions };
