/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Link from 'next/router';
import { Box, useToast } from '@chakra-ui/react';
import TopHeading from '@/components/topHeading';
import { ArrayRouteSelect } from '@/types/arraySelect';
import ElementCard from '@/components/elementCard';

const VenueSelect = () => {
  const venues: Array<ArrayRouteSelect> = [
    { id: nanoid(), value: 'Conference Hall', route: '' },
    { id: nanoid(), value: 'Laboratory', route: '/bookLab' },
  ];
  const [selectVenue, setSelectVenue] = useState<number>(-1);
  const toast = useToast();

  const changeOption = async (key: number, route: string) => {
    setSelectVenue(key);
    if (route === '') {
      toast({
        position: 'top',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="purple.25">
            Coming Soon !
          </Box>
        ),
      });
    }
    await Link.push(route);
  };
  return (
    <>
      <TopHeading heading="Book Venue" subText="Choose the venue" />
      {venues.map(({ id, value, route }, key) => (
        <ElementCard
          key={id}
          onClick={() => changeOption(key, route)}
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
          circleProps={{}}
        />
      ))}
    </>
  );
};

export default VenueSelect;
