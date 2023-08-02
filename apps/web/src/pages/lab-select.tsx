/* eslint-disable import/extensions */
import { nanoid } from 'nanoid';
import { NextPage } from 'next';
import Link from 'next/router';
import { Box, Grid } from '@chakra-ui/react';
import { useContext } from 'react';
import CustomCard from '@/components/CustomCard';
import TopHeading from '@/components/TopHeading';
import { BookLabContext } from '@/context/BookLabContext';
import { getLabRervations } from '@/hooks/api/labs';

const LabSelect: NextPage = () => {
  const bookLabContext = useContext(BookLabContext);

  const submitLab = async (labId: string, labName: string) => {
    bookLabContext?.setLabData({ ...bookLabContext?.labData, labId, labName });
    const { data } = await getLabRervations(labId);
    bookLabContext?.setReservationInfo(data.labReservationInfo);
    await Link.push('periods-select');
  };
  return (
    <Box pb="20">
      <TopHeading heading="Book Lab" subText="Select the lab" arrow />
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={14}>
        {bookLabContext?.availableLabs !== undefined
          ? bookLabContext?.availableLabs.map(({ id, labName }) => (
              <CustomCard
                key={id}
                onClick={async () => {
                  submitLab(id, labName);
                }}
                cardProps={{
                  height: '150px',
                  bg: bookLabContext?.labData.labId === id ? 'black.50' : 'gray.50',
                }}
                properties={[
                  {
                    id: nanoid(),
                    value: labName,
                    textProps: {
                      color: bookLabContext?.labData.labId === id ? 'white' : 'black.50',
                      fontSize: 'md',
                      fontWeight: 'medium',
                      position: 'relative',
                      top: '30px',
                    },
                  },
                ]}
                iconHover={bookLabContext?.labData.labId === id}
                iconComponent
                iconName="Laboratory"
              />
            ))
          : ''}
      </Grid>
    </Box>
  );
};
export default LabSelect;
