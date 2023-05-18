/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { nanoid } from 'nanoid';
import CustomCard from '@/components/customCard';
import CustomButton from '@/components/customButton';
import teacherTimetable from '../../util/teacherTimetable';
import labDetails from '../../util/labDetails';
import summaryForm from '../../util/summaryForm';
import TopHeading from '@/components/topHeading';
import { ArraySelect } from '@/interfaces/arraySelect';

const BookLab = () => {
  const [day, setDay] = useState<number>(0);
  const days: Array<ArraySelect> = [
    { id: nanoid(), value: 'M' },
    { id: nanoid(), value: 'T' },
    { id: nanoid(), value: 'W' },
    { id: nanoid(), value: 'T' },
    { id: nanoid(), value: 'F' },
    { id: nanoid(), value: 'S' },
  ];
  const [bookingStep, setBookingStep] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box pb={bookingStep === 1 ? '40' : '0'}>
      <TopHeading
        heading="Book Lab"
        subText={bookingStep === 1 ? 'Select the periods' : 'Select the venue'}
      />
      {bookingStep === 1 ? (
        <>
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
          {teacherTimetable.days[day].periods.map(({ id, periodName, semester, branch }, key) => {
            const periodHeading: string = `${key + 1}. ${periodName}`;
            const semesterHeading: string = semester !== '' ? `${semester} ${branch} ` : `-----`;
            return (
              <CustomCard
                key={id}
                properties={[
                  {
                    value: periodHeading,
                    textProps: {
                      color: 'black.25',
                      fontSize: 'lg',
                      fontWeight: 'bold',
                    },
                  },
                  {
                    value: semesterHeading,
                    textProps: {
                      color: 'black.25',
                      fontSize: '15',
                      fontWeight: 'medium',
                      ml: '4',
                    },
                  },
                ]}
                circleComponent={false}
              />
            );
          })}
          <CustomButton
            onClick={() => {
              setBookingStep(2);
            }}
            innerText="Next"
            type="regular"
          />
        </>
      ) : (
        <>
          {labDetails.data.map(({ id, name, roomNo }, key) => {
            const labName: string = `${key + 1}. ${name}`;
            return (
              <CustomCard
                key={id}
                onClick={() => {
                  onOpen();
                }}
                properties={[
                  {
                    value: labName,
                    textProps: {
                      color: 'black.25',
                      fontSize: 'lg',
                      fontWeight: 'bold',
                    },
                  },
                  {
                    value: roomNo,
                    textProps: {
                      color: 'black.25',
                      fontSize: '15',
                      fontWeight: 'medium',
                      ml: '4',
                    },
                  },
                ]}
                circleComponent={false}
              />
            );
          })}
        </>
      )}
      <Modal isCentered size="xs" onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              {summaryForm.map(({ id, label, htmlFor, value, options, disabled, inputType }) => (
                <Fragment key={id}>
                  <FormLabel htmlFor={htmlFor} pl="1">
                    {label}
                  </FormLabel>
                  {inputType === 'type' ? (
                    <Input
                      bg="gray.50"
                      id={htmlFor}
                      value={value}
                      mb="7"
                      rounded="12px"
                      disabled={disabled}
                    />
                  ) : (
                    <Select bg="gray.50" mb="7" rounded="12px">
                      {options !== undefined
                        ? options.map(({ optionID, optionValue, selected }) => (
                            <option key={optionID} selected={selected} value={optionValue}>
                              {optionValue}
                            </option>
                          ))
                        : ''}
                    </Select>
                  )}
                </Fragment>
              ))}
              <CustomButton
                onClick={() => {
                  setBookingStep(2);
                }}
                innerText="Book Now"
                type="modal"
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookLab;
