/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';

import { frontendConfig } from '../config/frontendConfig';

if (typeof window !== 'undefined') {
  SuperTokensReact.init(frontendConfig());
}

const App = ({ Component, pageProps }: AppProps) => (
  <SuperTokensWrapper>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </SuperTokensWrapper>
);

export default App;
