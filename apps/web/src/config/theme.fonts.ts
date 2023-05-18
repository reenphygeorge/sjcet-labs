import { extendTheme } from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fontsource/exo-2';

const theme = extendTheme({
  colors: {
    black: {
      25: '#353535',
      50: '#272727',
    },
    gray: {
      50: '#F0F2F5',
    },
  },
  fonts: {
    heading: `'Exo 2', sans-serif`,
    body: `'Exo 2', sans-serif`,
  },
});

export default theme;
