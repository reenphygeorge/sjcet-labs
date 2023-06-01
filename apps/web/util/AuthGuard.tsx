/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import { useRouter } from 'next/router';
import { ComponentType, FC, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const authGuard = (WrappedComponent: ComponentType) => {
  const ComponentWithAuth: FC = (props) => {
    const router = useRouter();
    const { appSession } = useAuth();

    useEffect(() => {
      if (appSession === null) {
        router.push('/');
      }
    });

    return appSession !== null ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default authGuard;
