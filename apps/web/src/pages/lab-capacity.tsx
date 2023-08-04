/* eslint-disable import/extensions */
import { NextPage } from 'next';
import Link from 'next/router';
import {
  Box,
  Card,
  CardBody,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useContext } from 'react';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import { getFreeLabs } from '@/hooks/api/reservation';
import { BookLabContext } from '@/context/BookLabContext';

const LabCapacitySelect: NextPage = () => {
  const bookLabContext = useContext(BookLabContext);

  const toast = useToast();
  const getLabList = async () => {
    if (bookLabContext?.labCapacity !== 0 && bookLabContext?.labCapacity !== undefined) {
      const freeLabs = await getFreeLabs(bookLabContext?.labCapacity);
      bookLabContext?.setAvailableLabs(freeLabs.data);
      await Link.push('lab-select');
    } else {
      toast({
        position: 'top',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="red.50">
            Capacity should&apos;nt be zero
          </Box>
        ),
      });
    }
  };
  return (
    <Box pb="20">
      <TopHeading heading="Book Lab" subText="Select the no of students" arrow />
      <Card mt="56" mb={10}>
        <CardBody>
          <Text fontSize="lg" fontWeight="medium">
            No of Students: {bookLabContext?.labCapacity}
          </Text>
          <Slider
            min={0}
            max={70}
            step={1}
            aria-label="student-slider"
            defaultValue={bookLabContext?.labCapacity}
            onChange={(value) => {
              bookLabContext?.setLabCapacity(value);
            }}
          >
            <SliderTrack>
              <SliderFilledTrack bg="black.50" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </CardBody>
        <CustomButton
          onClick={() => {
            getLabList();
          }}
          innerText="Next"
          type="modal"
          disabled={false}
        />
      </Card>
    </Box>
  );
};

export default LabCapacitySelect;
