/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { useState } from 'react';
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import Link from 'next/router';
import { Box, useToast } from '@chakra-ui/react';
import TopHeading from '@/components/TopHeading';
import ElementCard from '@/components/ElementCard';
// Required data
import { RouteOptions } from '@/types/SelectVenue';
import authGuard from '../../util/AuthGuard';

const VenueSelect: NextPage = () => {
  const venues: Array<RouteOptions> = [
    { id: nanoid(), value: 'Conference Hall', route: '' },
    { id: nanoid(), value: 'Laboratory', route: 'book-lab' },
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
      <TopHeading heading="Book Venue" subText="Choose the venue" arrow />
      {venues.map(({ id, value, route }, key) => (
        <ElementCard
          key={id}
          onClick={() => changeOption(key, route)}
          cardProps={{
            bg: selectVenue !== key ? 'gray.50' : 'black.50',
          }}
          properties={[
            {
              id: nanoid(),
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

export default authGuard(VenueSelect);
