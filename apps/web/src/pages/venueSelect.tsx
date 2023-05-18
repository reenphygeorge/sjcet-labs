/* eslint-disable import/extensions */
import { useState } from 'react';
import TopHeading from '@/components/topHeading';
import CustomCard from '@/components/customCard';

const VenueSelect = () => {
  const venues: Array<string> = ['Conference Hall', 'Laboratory'];
  const [selectVenue, setSelectVenue] = useState<number>(-1);

  return (
    <>
      <TopHeading heading="Book Venue" subText="Choose the venue" />
      {venues.map((venue, key) => (
        <CustomCard
          onClick={() => setSelectVenue(key)}
          cardProps={{
            bg: selectVenue !== key ? 'gray.50' : 'black.50',
          }}
          properties={[
            {
              value: venue,
              textProps: {
                color: selectVenue !== key ? 'black.25' : 'white',
                fontSize: 'lg',
                fontWeight: 'bold',
              },
            },
          ]}
          circleComponent
        />
      ))}
    </>
  );
};

export default VenueSelect;
