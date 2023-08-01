/* eslint-disable import/extensions */
import { nanoid } from 'nanoid';
import { NextPage } from 'next';
import Link from 'next/router';
import { Box, Grid } from '@chakra-ui/react';
import { useState } from 'react';
import CustomCard from '@/components/CustomCard';
import labDetailsforBooking from '../../util/LabDetailsForBooking';
import TopHeading from '@/components/TopHeading';

const LabSelect: NextPage = () => {
  const [selectedLab, setSelectedLab] = useState<string>('');
  //   const submitLab = async (labId: string) => {
  //     setSelectedLab(labId);
  //     console.log(selectedLab);
  //     await Link.push('periods-select');
  //   };
  return (
    <Box pb="20">
      <TopHeading heading="Book Lab" subText="Select the lab" arrow />
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={14}>
        {labDetailsforBooking?.data.map(({ id, labName }) => (
          <CustomCard
            key={id}
            onClick={async () => {
              setSelectedLab(id);
              await Link.push('periods-select');
            }}
            cardProps={{
              height: '150px',
              bg: selectedLab === id ? 'black.50' : 'gray.50',
            }}
            properties={[
              {
                id: nanoid(),
                value: labName,
                textProps: {
                  color: selectedLab === id ? 'white' : 'black.50',
                  fontSize: 'md',
                  fontWeight: 'medium',
                  position: 'relative',
                  top: '30px',
                },
              },
            ]}
            iconHover={selectedLab === id}
            iconComponent
            iconName="Laboratory"
          />
        ))}
      </Grid>
    </Box>
  );
};
export default LabSelect;
