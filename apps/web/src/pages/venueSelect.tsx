/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { useState } from 'react';
import { nanoid } from 'nanoid';
import TopHeading from '@/components/topHeading';
import CustomCard from '@/components/customCard';
import { ArraySelect } from '@/interfaces/arraySelect';

const VenueSelect = () => {
  const venues: Array<ArraySelect> = [
    { id: nanoid(), value: 'Conference Hall' },
    { id: nanoid(), value: 'Laboratory' },
  ];
  const [selectVenue, setSelectVenue] = useState<number>(-1);

  return (
    <>
      <TopHeading heading="Book Venue" subText="Choose the venue" />
      {venues.map(({ id, value }, key) => (
        <CustomCard
          key={id}
          onClick={() => setSelectVenue(key)}
          cardProps={{
            bg: selectVenue !== key ? 'gray.50' : 'black.50',
          }}
          properties={[
            {
              value,
              textProps: {
                color: selectVenue !== key ? 'black.25' : 'white',
                fontSize: 'lg',
                fontWeight: 'bold',
              },
            },
          ]}
          circleComponent
          circleProps={{}}
          flexMode
        />
      ))}
    </>
  );
};

export default VenueSelect;
