/* eslint-disable import/extensions */
import { Flex, Grid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import TimeTableContext, { TimeTableProvider } from '@/context/timetableContext';

const days: Array<String> = ['M', 'T', 'W', 'T', 'F', 'S'];

const DaySelector = () => {
  const { day, setDay } = useContext(TimeTableContext);
  return (
    <TimeTableProvider>
      <Grid templateColumns="repeat(6, 1fr)" gap={6} mb="20px">
        <>
          {days.map((daySelect, key) => (
            <Flex
              w="120%"
              h="10"
              bg={key !== day ? 'gray.50' : 'black.50'}
              color={key !== day ? 'black' : 'white'}
              rounded="12px"
              justify="center"
              align="center"
              cursor="pointer"
              onClick={() => {
                setDay(key);
              }}
            >
              <Text fontWeight="bold">{daySelect}</Text>
            </Flex>
          ))}
        </>
      </Grid>
    </TimeTableProvider>
  );
};

export default DaySelector;
