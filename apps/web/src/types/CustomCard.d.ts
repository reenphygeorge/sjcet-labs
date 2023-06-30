/* eslint-disable import/extensions */
import { CardProps, TextProps } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface CardTextInterface {
  id: string;
  value: string;
  textProps: TextProps;
}

export interface CustomCardProps {
  properties: Array<CardTextInterface>;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  cardProps?: CardProps;
  iconComponent?: boolean;
  iconName?: string;
  iconHover?: boolean;
}
