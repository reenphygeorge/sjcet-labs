import { MouseEvent } from 'react';

export type CustomButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  innerText: String;
  type: String;
  disabled: boolean;
  isLoading?: boolean;
};
