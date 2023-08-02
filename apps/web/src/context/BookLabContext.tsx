/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import React, { FC, PropsWithChildren, createContext, useMemo, useState } from 'react';
import { AvailableLabs, BookLabContextProps, LabData, ReservationInfo } from '@/types/BookLab';

// Create the context
const BookLabContext = createContext<BookLabContextProps | null>(null);

// Create a data provider component
const BookLabProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [labCapacity, setLabCapacity] = useState<number>(0);
  const [labData, setLabData] = useState<LabData>({
    labId: '',
    labName: '',
  });

  const [availableLabs, setAvailableLabs] = useState<AvailableLabs[]>();
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo[]>();

  const bookLabContext = useMemo(
    () => ({
      labCapacity,
      setLabCapacity,
      labData,
      setLabData,
      availableLabs,
      setAvailableLabs,
      reservationInfo,
      setReservationInfo,
    }),
    [
      labData,
      setLabData,
      labCapacity,
      setLabCapacity,
      availableLabs,
      setAvailableLabs,
      reservationInfo,
      setReservationInfo,
    ]
  );
  return <BookLabContext.Provider value={bookLabContext}>{children}</BookLabContext.Provider>;
};

export { BookLabContext, BookLabProvider };
