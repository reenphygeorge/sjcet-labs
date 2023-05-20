/* eslint-disable import/extensions */
import { BoxProps, CardProps, TextProps } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface CardTextInterface {
  value: string;
  textProps: TextProps;
}

export interface ElementCardProps {
  properties: Array<CardTextInterface>;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  cardProps?: CardProps;
  circleProps?: BoxProps;
  circleInnerText?: string;
}
