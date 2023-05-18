import { MouseEvent } from 'react';

export interface CustomButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  innerText: String;
  type: String;
}
