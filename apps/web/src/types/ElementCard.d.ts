/* eslint-disable import/extensions */
import { BoxProps, CardProps, TextProps } from '@chakra-ui/react';
import { MouseEvent } from 'react';

type CardText = {
  id: string;
  value: string;
  textProps: TextProps;
  activeStatus?: boolean;
  activeColor?: string;
};

export type ElementCardProps = {
  properties: Array<CardText>;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  cardProps?: CardProps;
  circleProps?: BoxProps;
  circleInnerText?: string;
};
