/* eslint-disable import/extensions */
import { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { TimetableContextInterface } from '@/interfaces/timetableContext';

const TimeTableContext = createContext<TimetableContextInterface>({ day: 0, setDay: () => {} });

export const TimeTableProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [day, setDay] = useState<number>(0);

  const memoizedValues = useMemo(
    () => ({
      day,
      setDay,
    }),
    [day]
  );

  return <TimeTableContext.Provider value={memoizedValues}>{children}</TimeTableContext.Provider>;
};

export default TimeTableContext;
