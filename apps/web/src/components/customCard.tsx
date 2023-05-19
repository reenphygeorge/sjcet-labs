/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { Card, CardBody, Spacer, Text } from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import { CustomCardProps } from '@/types/customCard';
import Circle from './circle';

const CustomCard: FC<CustomCardProps> = ({
  cardProps,
  onClick,
  properties,
  circleComponent,
  circleProps,
}) => (
  <Card bg="gray.50" rounded="12px" shadow="none" mb="20px" onClick={onClick} {...cardProps}>
    <CardBody>
      {properties.map(({ id, value, textProps }) =>
        circleComponent === false ? (
          <Text key={id} {...textProps}>
            {value}
          </Text>
        ) : (
          <Fragment key={id}>
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
          </Fragment>
        )
      )}
      <Spacer />
    </CardBody>
  </Card>
);

export default CustomCard;
