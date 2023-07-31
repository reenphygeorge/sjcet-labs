/* eslint-disable import/no-extraneous-dependencies */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sjcetlabs.app',
  appName: 'SJCET Labs',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
