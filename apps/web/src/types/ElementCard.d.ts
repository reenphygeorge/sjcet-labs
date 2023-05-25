/* eslint-disable import/extensions */
import { BoxProps, CardProps, TextProps } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface CardText {
  id: string;
  value: string;
  textProps: TextProps;
  activeStatus?: boolean;
  activeColor?: string;
}

export interface ElementCardProps {
  properties: Array<CardText>;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  cardProps?: CardProps;
  circleProps?: BoxProps;
  circleInnerText?: string;
}
