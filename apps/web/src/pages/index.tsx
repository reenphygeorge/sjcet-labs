/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import Head from 'next/head';
import { Box, Grid, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useContext, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/router';
import TimetableCard from '@/components/TimetableCard';
import CustomCard from '@/components/CustomCard';
import LoginPage from '@/components/LoginPage';
import { useAuth } from '@/context/AuthContext';
import { UserContext } from '@/context/UserContext';

type RouteOptions = {
  id: string;
  value: string;
  route: string;
};

const Home: NextPage = () => {
  const { appSession } = useAuth();
  const userContext = useContext(UserContext);
  const options: RouteOptions[] =
    userContext?.userData.labAdmin === false
      ? [
          { id: nanoid(), value: 'Book Venue', route: 'venue-select' },
          { id: nanoid(), value: 'My Bookings', route: 'view-bookings' },
          { id: nanoid(), value: 'Attendance', route: 'attendance' },
          { id: nanoid(), value: 'Reports', route: 'reports' },
        ]
      : [
          { id: nanoid(), value: 'Requests', route: 'requests' },
          { id: nanoid(), value: 'Report & Repair', route: 'report-repair' },
          { id: nanoid(), value: 'Logs', route: 'logs' },
        ];
  const [selectOption, setSelectOption] = useState<number>(-1);

  const changeOption = async (key: number, route: string) => {
    setSelectOption(key);
    await Link.push(route);
  };

  return (
    <>
      <Head>
        <title>SJCET Lab Management System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {appSession === null ? (
        <LoginPage />
      ) : (
        <Box pb="40">
          <Box my="20px">
            <Text fontSize="lg" lineHeight="0.5" fontWeight="black" color="black.50">
              Welcome
              <br />
            </Text>
            <Text fontSize="4xl" fontWeight="bold" color="black.50">
              {`Prof. ${userContext?.userData.name?.split(' ')[0]}`}
            </Text>
          </Box>
          <Box my="20px">
            <TimetableCard />
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {options.map(({ id, value, route }, key) => (
              <CustomCard
                key={id}
                onClick={() => {
                  changeOption(key, route);
                }}
                cardProps={{
                  height: '150px',
                  bg: selectOption !== key ? '#F0F2F5' : 'black.50',
                }}
                properties={[
                  {
                    id: nanoid(),
                    value,
                    textProps: {
                      color: selectOption !== key ? 'black.25' : 'white',
                      fontSize: 'md',
                      fontWeight: 'bold',
                      position: 'relative',
                      top: '10',
                    },
                  },
                ]}
                iconHover={selectOption === key}
                iconComponent
                iconName={value}
              />
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Home;
