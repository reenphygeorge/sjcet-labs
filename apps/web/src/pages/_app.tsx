/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import theme from '@/config/theme.fonts';
import BottomBar from '@/components/BottomBar';
import { AuthProvider } from '@/context/AuthContext';

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <Container h="100vh" pt="25px" px="25px">
        <Component {...pageProps} />
        <Flex justify="center">
          <Box position="fixed" p="20px" bottom="12">
            <BottomBar />
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  </AuthProvider>
);

export default App;
