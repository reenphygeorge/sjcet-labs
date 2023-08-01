/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { useState } from 'react';
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import Link from 'next/router';
import { Box, Grid, useToast } from '@chakra-ui/react';
import TopHeading from '@/components/TopHeading';
import { RouteOptions } from '@/types/SelectVenue';
import authGuard from '../../util/AuthGuard';
import CustomCard from '@/components/CustomCard';

const VenueSelect: NextPage = () => {
  const venues: Array<RouteOptions> = [
    { id: nanoid(), value: 'Conference Hall', route: '' },
    { id: nanoid(), value: 'Laboratory', route: 'lab-capacity' },
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
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={14}>
        {venues.map(({ id, value, route }, key) => (
          <CustomCard
            key={id}
            onClick={() => {
              changeOption(key, route);
            }}
            cardProps={{
              height: '150px',
              bg: selectVenue === key ? 'black.50' : 'gray.50',
            }}
            properties={[
              {
                id: nanoid(),
                value,
                textProps: {
                  color: selectVenue === key ? 'white' : 'black.50',
                  fontSize: 'md',
                  fontWeight: 'medium',
                  position: 'relative',
                  top: '30px',
                },
              },
            ]}
            iconHover={selectVenue === key}
            iconComponent
            iconName={value}
          />
        ))}
      </Grid>
      {/* // <CustomCard
        //   key={id}
        //   onClick={() => changeOption(key, route)}
        //   cardProps={{
        //     bg: selectVenue !== key ? 'gray.50' : 'black.50',
        //   }}
        //   properties={[
        //     {
        //       id: nanoid(),
        //       value,
        //       textProps: {
        //         color: selectVenue !== key ? 'black.25' : 'white',
        //         fontSize: 'lg',
        //         fontWeight: 'bold',
        //       },
        //     },
        //   ]}
        //   iconComponent={false}
        //   iconHover={false}
        // /> */}
      {/* ))} */}
    </>
  );
};

export default authGuard(VenueSelect);
