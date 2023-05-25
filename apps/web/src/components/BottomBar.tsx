/* eslint-disable import/no-extraneous-dependencies */
import { Box, Card, Flex } from '@chakra-ui/react';
import Link from 'next/router';
import { FC } from 'react';
import { Bell, Home, User } from 'react-feather';

const BottomBar: FC = () => {
  const changeScreen = (option: string) => {
    if (option === 'Home') Link.push('/');
  };

  return (
    <Flex justify="center">
      <Card w="80vw" rounded="12px" bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(5px)">
        <Flex justify="space-around" h="50px" align="center">
          <Box>
            <Bell />
          </Box>
          <Box>
            <Home onClick={() => changeScreen('Home')} />
          </Box>
          <Box>
            <User />
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
};

export default BottomBar;
