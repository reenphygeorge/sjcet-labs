/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { Card, CardBody, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Circle from './circle';
import { ElementCardProps } from '@/types/elementCard';

const ElementCard: FC<ElementCardProps> = ({
  cardProps,
  onClick,
  properties,
  circleProps,
  circleInnerText,
}) => (
  <Card bg="gray.50" rounded="12px" shadow="none" mb="20px" onClick={onClick} {...cardProps}>
    <CardBody>
      <Flex justify="space-around" align="center">
        <Flex flexDirection="column">
          {properties.map(({ value, textProps, activeStatus, activeColor }) => (
            <HStack>
              <Text key={value} {...textProps}>
                {value}
              </Text>
              {activeStatus === true ? (
                <Circle
                  // innerText={}
                  circleProps={{
                    w: '10px',
                    h: '10px',
                    borderRadius: '100%',
                    border: 'none',
                    bg: activeColor,
                  }}
                />
              ) : (
                ''
              )}
            </HStack>
          ))}
        </Flex>
        <Spacer />
        <Circle
          innerText={circleInnerText}
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
    </CardBody>
  </Card>
);

export default ElementCard;
