/* eslint-disable import/extensions */
import { Box, Text } from '@chakra-ui/react';
import { CircleProps } from '@/types/circle';

const Circle = ({ circleProps, innerText }: CircleProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box w="40px" h="40px" borderRadius="100%" border="none" bg="white" {...circleProps}>
    <Text textAlign="center" pt={1} fontSize="sm" fontWeight="semibold">
      {innerText}
    </Text>
  </Box>
);

export default Circle;
