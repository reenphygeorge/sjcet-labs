import { Button, Flex } from '@chakra-ui/react';
import { CustomButtonProps } from '@/interfaces/customButton.interface';

const CustomButton = ({ onClick, innerText, type }: CustomButtonProps) => (
  <Flex justify="center">
    <Button
      width={type === 'modal' ? '70vw' : '85vw'}
      height="50px"
      rounded="12px"
      bg="black.50"
      color="white"
      _hover={{ bg: 'gray.50', color: 'black.25' }}
      onClick={onClick}
    >
      {innerText}
    </Button>
  </Flex>
);

export default CustomButton;
