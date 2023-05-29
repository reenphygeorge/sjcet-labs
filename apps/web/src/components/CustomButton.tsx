/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { CustomButtonProps } from '@/types/CustomButton';

const CustomButton: FC<CustomButtonProps> = ({ onClick, innerText, type, disabled }) => (
  <Flex justify="center">
    <Button
      mb={5}
      width={type === 'modal' ? '70vw' : type === 'mini' ? '33vw' : '85vw'}
      height="50px"
      rounded="12px"
      bg="black.50"
      color="white"
      _hover={{ bg: 'gray.50', color: 'black.25' }}
      onClick={onClick}
      isDisabled={disabled}
    >
      {innerText}
    </Button>
  </Flex>
);

export default CustomButton;
