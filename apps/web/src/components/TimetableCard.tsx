/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { Card, Text, CardBody, Grid, Flex, Box, HStack } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { FC, useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';

type Options = {
  id: string;
  value: string;
};

const TimetableCard: FC = () => {
  const userContext = useContext(UserContext);
  const [day, setDay] = useState<number>(0);
  const days: Array<Options> = [
    { id: nanoid(), value: 'M' },
    { id: nanoid(), value: 'T' },
    { id: nanoid(), value: 'W' },
    { id: nanoid(), value: 'T' },
    { id: nanoid(), value: 'F' },
    { id: nanoid(), value: 'S' },
  ];

  const isAdmin: Boolean = true;

  return (
    <Card rounded="12px" shadow="md">
      <CardBody>
        <Grid templateColumns="repeat(6, 1fr)" gap={6} mb="20px">
          <>
            {days.map(({ id, value }, key) => (
              <Flex
                key={id}
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
                <Text fontWeight="bold">{value}</Text>
              </Flex>
            ))}
          </>
        </Grid>
        <Grid
          templateColumns="repeat(6, 1fr)"
          overflowX="scroll"
          sx={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              width: '0px',
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
              borderRadius: '0px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'transparent',
            },
          }}
          mb="20px"
        >
          {isAdmin !== true
            ? userContext?.userData.timeTable[day].periods.map(
                ({ id, periodName, semester, branch, venue, roomNo }, key) => (
                  <Box key={id} w="300px" ml="5px" mr="20px" bg="gray.50" rounded="12px">
                    <CardBody>
                      <Text fontWeight="bold" color="black.50" fontSize="17" mb="1">
                        {periodName !== null ? `${key + 1}. ${periodName}` : 'Free'}
                      </Text>
                      <Text fontWeight="semibold" color="black.50" fontSize="15" mb="1" ml="3">
                        {semester !== null ? `${semester} ${branch} ` : ''}
                      </Text>
                      <Text fontWeight="semibold" color="black.50" fontSize="15" ml="3">
                        {venue !== null ? `Venue: ${venue} (${roomNo})` : ''}
                      </Text>
                    </CardBody>
                  </Box>
                )
              )
            : userContext?.userData.timeTable[day].periods.map(
                ({ id, periodName, semester, branch, inCharge }, key) => (
                  <Box key={id} w="300px" ml="5px" mr="20px" bg="gray.50" rounded="12px">
                    <CardBody>
                      <Text fontWeight="bold" color="black.50" fontSize="17" mb="1">
                        {periodName !== null ? `${key + 1}. ${periodName}` : 'Free'}
                      </Text>
                      <Text fontWeight="semibold" color="black.50" fontSize="15" mb="1" ml="3">
                        {semester !== null ? `${semester} ${branch} ` : ''}
                      </Text>
                      <Text fontWeight="semibold" color="black.50" fontSize="15" ml="3" mb="2">
                        In charge:
                      </Text>
                      <HStack>
                        {inCharge?.map(({ inChargeID, name }) => (
                          <Text
                            key={inChargeID}
                            fontWeight="semibold"
                            color="black.50"
                            fontSize="15"
                            ml="3"
                          >
                            {`Prof. ${name.split(' ')[0]}`}
                          </Text>
                        ))}
                      </HStack>
                    </CardBody>
                  </Box>
                )
              )}
        </Grid>
      </CardBody>
    </Card>
  );
};

export default TimetableCard;
