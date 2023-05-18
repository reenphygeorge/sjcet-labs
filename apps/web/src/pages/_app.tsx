/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import { frontendConfig } from '../config/frontendConfig';
import theme from '@/config/theme.fonts';
import BottomBar from '@/components/bottomBar';

if (typeof window !== 'undefined') {
  SuperTokensReact.init(frontendConfig());
}

const App = ({ Component, pageProps }: AppProps) => (
  <SuperTokensWrapper>
    <ChakraProvider theme={theme}>
      <Container h="100vh" pt="25px" px="25px">
        <Component {...pageProps} />
        <Flex justify="center">
          <Box position="fixed" p="20px" bottom="16">
            <BottomBar />
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  </SuperTokensWrapper>
);

export default App;
