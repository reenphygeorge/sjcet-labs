/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Card, Flex } from '@chakra-ui/react';
import Link from 'next/router';
import { FC } from 'react';
import { Bell, Home, User } from 'react-feather';
import { useAuth } from '@/context/AuthContext';

const BottomBar: FC = () => {
  const { appSession } = useAuth();

  const changeScreen = (option: string) => {
    const path = option === 'home' ? '/' : option;
    Link.push(path);
  };
  return (
    <Flex justify="center">
      {appSession !== null ? (
        <Card w="80vw" rounded="12px" bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(5px)">
          <Flex justify="space-around" h="50px" align="center">
            <Box>
              <Bell />
            </Box>
            <Box>
              <Home onClick={() => changeScreen('home')} />
            </Box>
            <Box>
              <User onClick={() => changeScreen('profile')} />
            </Box>
          </Flex>
        </Card>
      ) : (
        ''
      )}
    </Flex>
  );
};

export default BottomBar;
