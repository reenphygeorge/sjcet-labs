/* eslint-disable import/no-extraneous-dependencies */
import { Box, Card, Flex } from '@chakra-ui/react';
import { Bell, Home, User } from 'react-feather';

const BottomBar = () => (
  <Flex justify="center">
    <Card w="80vw" rounded="12px" bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(5px)">
      <Flex justify="space-around" h="50px" align="center">
        <Box>
          <Bell />
        </Box>
        <Box>
          <Home />
        </Box>
        <Box>
          <User />
        </Box>
      </Flex>
    </Card>
  </Flex>
);

export default BottomBar;
