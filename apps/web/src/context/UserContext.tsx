/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import React, { FC, PropsWithChildren, createContext, useMemo, useState } from 'react';
import fetchUserData from '../../util/UserData';
import { UserContextData, UserContextProps } from '@/types/UserData';

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a data provider component
const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const userDataFetched: UserContextData = fetchUserData();
  const [userData, setUserData] = useState<UserContextData>(userDataFetched);
  const userContextData = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);
  // const authID = '';
  return <UserContext.Provider value={userContextData}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
