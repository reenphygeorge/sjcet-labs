/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import { FC } from 'react';
import { Button, Flex, Spinner, useMediaQuery } from '@chakra-ui/react';
import { CustomButtonProps } from '@/types/CustomButton';

const CustomButton: FC<CustomButtonProps> = ({ onClick, innerText, type, disabled, isLoading }) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const buttonWidth = isLargerThan768
    ? type === 'modal'
      ? '280px'
      : type === 'mini'
      ? '230px'
      : '85vw'
    : type === 'modal'
    ? '280px'
    : type === 'mini'
    ? '35vw'
    : '85vw';

  return (
    <Flex justify="center">
      <Button
        mb={5}
        width={buttonWidth}
        height={type === 'login' ? '55px' : '50px'}
        rounded="12px"
        bg="black.50"
        color="white"
        _hover={{ bg: 'gray.50', color: 'black.25' }}
        onClick={onClick}
        isDisabled={disabled}
      >
        {innerText}
        {isLoading === true ? <Spinner ml={5} /> : ''}
      </Button>
    </Flex>
  );
};

export default CustomButton;
