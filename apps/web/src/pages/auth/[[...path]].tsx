/* eslint-disable no-promise-executor-return */
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import SuperTokens, { redirectToAuth } from 'supertokens-auth-react';

const SuperTokensComponentNoSSR = dynamic<
  React.ComponentProps<typeof SuperTokens.getRoutingComponent>
>(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });

const Auth = () => {
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  return <SuperTokensComponentNoSSR />;
};

export default Auth;
