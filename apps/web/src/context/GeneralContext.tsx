/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import React, { FC, PropsWithChildren, createContext } from 'react';
import { GeneralContextProps } from '@/types/GeneralData';
import fetchGeneralData from '../../util/GeneralData';

// Create the context
const GeneralContext = createContext<GeneralContextProps>({
  departments: [
    {
      id: '',
      name: '',
    },
  ],
  labs: [
    {
      id: '',
      labName: '',
      capacity: 0,
    },
  ],
});

// Create a data provider component
const GeneralProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const generalDataFetched: GeneralContextProps = fetchGeneralData();
  return <GeneralContext.Provider value={generalDataFetched}>{children}</GeneralContext.Provider>;
};

export { GeneralContext, GeneralProvider };
