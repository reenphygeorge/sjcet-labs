import { Card, Text, CardBody, Grid, Flex, Box } from '@chakra-ui/react';
import { useState } from 'react';
import teacherTimetable from '../../util/teacherTimetable';

const TimetableCard = () => {
  const [day, setDay] = useState<number>(0);
  const days: Array<String> = ['M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card rounded="12px" shadow="md">
      <CardBody>
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
        <Grid templateColumns="repeat(6, 1fr)" overflowX="scroll" mb="20px">
          <>
            {teacherTimetable.days[day].periods.map(
              ({ periodName, semester, branch, batch, venue, roomNo }, key) => (
                <Box w="300px" ml="5px" mr="20px" bg="gray.50" rounded="12px">
                  <CardBody>
                    <Text fontWeight="bold" color="black.50" fontSize="17" mb="1">
                      {`${key + 1}. ${periodName}`}
                    </Text>
                    <Text fontWeight="semibold" color="black.50" fontSize="15" mb="1" ml="3">
                      {semester !== '' ? `${semester} ${branch} batch ${batch}` : `-----`}
                    </Text>
                    <Text fontWeight="semibold" color="black.50" fontSize="15" ml="3">
                      {venue !== '' ? `Venue: ${venue} (${roomNo})` : `-----`}
                    </Text>
                  </CardBody>
                </Box>
              )
            )}
          </>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default TimetableCard;
