/* eslint-disable import/extensions */
import { CardProps, TextProps } from '@chakra-ui/react';
import { MouseEvent } from 'react';

type CardTextInterface = {
  id: string;
  value: string;
  textProps: TextProps;
};

export type CustomCardProps = {
  properties: Array<CardTextInterface>;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  cardProps?: CardProps;
  iconComponent?: boolean;
  iconName?: string;
  iconHover?: boolean;
};
