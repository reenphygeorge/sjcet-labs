import { Box } from '@chakra-ui/react';
import { CircleProps } from '@/interfaces/circle.interface';

const Circle = ({ circleProps, innerText }: CircleProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box w="40px" h="40px" borderRadius="100%" border="none" bg="white" {...circleProps}>
    {innerText}
  </Box>
);

export default Circle;
