/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import Head from 'next/head';
import { Box, Grid, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { FC, useState } from 'react';
import Link from 'next/router';
import TimetableCard from '@/components/TimetableCard';
import CustomCard from '@/components/CustomCard';
// Required data
import { RouteOptions } from '@/types/Home.d';
import { Gender, ProfileData, Role } from '@/types/Profile.d';
import teacherTimetable from '../../util/teacherTimetable';

const Home: FC = () => {
  // Required data
  const profileData: ProfileData = {
    collegeID: '',
    name: 'Kishore Sebastian',
    department: 'Computer Sci & Engg',
    email: '',
    phone: '',
    gender: Gender.Male,
    role: Role.Administrator,
    dualMode: false,
  };

  const options: RouteOptions[] =
    profileData.role === Role.Teacher
      ? [
          { id: nanoid(), value: 'Book Venue', route: 'venue-select' },
          { id: nanoid(), value: 'My Bookings', route: 'view-bookings' },
          { id: nanoid(), value: 'Attendance', route: 'attendance' },
          { id: nanoid(), value: 'Reports', route: 'reports' },
        ]
      : [
          { id: nanoid(), value: 'Requests', route: 'requests' },
          { id: nanoid(), value: 'Report & Repair', route: 'report-repair' },
          { id: nanoid(), value: 'Todo List', route: 'todo' },
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
      <Box pb="40">
        <Box my="20px">
          <Text fontSize="lg" lineHeight="0.5" fontWeight="black" color="black.50">
            Welcome
            <br />
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="black.50">
            {`Prof. ${profileData.name.split(' ')[0]}`}
          </Text>
        </Box>
        <Box my="20px">
          <TimetableCard timetable={teacherTimetable} />
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {options.map(({ id, value, route }, key) => (
            <CustomCard
              key={id}
              onClick={() => {
                changeOption(key, route);
              }}
              cardProps={{
                height: '130px',
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
                    top: '7',
                  },
                },
              ]}
              circleComponent
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
