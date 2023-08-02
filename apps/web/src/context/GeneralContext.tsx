/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import React, { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { GeneralContextProps } from '@/types/GeneralData';
import getGeneralData from '@/hooks/api/generalData';

// Create the context
const GeneralContext = createContext<GeneralContextProps>({
  data: {
    departments: [
      {
        id: '',
        name: '',
      },
    ],
    courses: [
      {
        courseCode: '',
        courseName: '',
        isPractical: false,
      },
    ],
    labs: [
      {
        id: '',
        labName: '',
        capacity: 0,
      },
    ],
  },
});

// Create a data provider component
const GeneralProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [generalDataFetched, setGeneralDataFetched] = useState<GeneralContextProps | null>(null);

  useEffect(() => {
    getGeneralData().then((generalData) => {
      setGeneralDataFetched(generalData);
    });
  }, []);

  if (generalDataFetched !== null) {
    return <GeneralContext.Provider value={generalDataFetched}>{children}</GeneralContext.Provider>;
  }
  return <div>Loading...</div>;
};

export { GeneralContext, GeneralProvider };
