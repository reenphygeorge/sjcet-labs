/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { Card, CardBody, Flex, Spacer, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { CustomCardProps } from '@/interfaces/customCard';
import Circle from './circle';

const CustomCard: FC<CustomCardProps> = ({
  cardProps,
  onClick,
  properties,
  circleComponent,
  circleProps,
  flexMode,
}) => (
  <Card bg="gray.50" rounded="12px" shadow="none" mb="20px" onClick={onClick} {...cardProps}>
    <CardBody>
      {properties.map(({ value, textProps }) =>
        circleComponent === false ? (
          <Text key={value} {...textProps}>
            {value}
          </Text>
        ) : flexMode === true ? (
          <Flex key={value} justify="space-around" align="center">
            <Text {...textProps}>{value}</Text>
            <Spacer />
            <Circle
              circleProps={{
                w: '40px',
                h: '40px',
                borderRadius: '100%',
                border: 'none',
                bg: 'white',
                ...circleProps,
              }}
            />
          </Flex>
        ) : (
          <>
            <Circle
              circleProps={{
                w: '40px',
                h: '40px',
                borderRadius: '100%',
                border: 'none',
                bg: 'white',
                ...circleProps,
              }}
            />
            <Text {...textProps}>{value}</Text>
          </>
        )
      )}
      <Spacer />
    </CardBody>
  </Card>
);

export default CustomCard;
