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
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { nanoid } from 'nanoid';
import CustomCard from '@/components/CustomCard';
import CustomButton from '@/components/CustomButton';
import teacherTimetable from '../../util/teacherTimetable';
import labDetails from '../../util/labDetails';
import TopHeading from '@/components/TopHeading';
import ElementCard from '@/components/ElementCard';
import ReactSelect from '@/components/ReactSelect';
import {
  LabBookingDetails,
  Options,
  PeriodTiming,
  ReservationInfo,
  Status,
} from '@/types/BookLab.d';

const BookLab: FC = () => {
  const [dayNumber, setDayNumber] = useState<number>(0);
  const days: Options[] = [
    { id: nanoid(), value: 'M' },
    { id: nanoid(), value: 'T' },
    { id: nanoid(), value: 'W' },
    { id: nanoid(), value: 'T' },
    { id: nanoid(), value: 'F' },
    { id: nanoid(), value: 'S' },
  ];

  const semesters: Options[] = [
    { id: nanoid(), value: 'S1' },
    { id: nanoid(), value: 'S2' },
    { id: nanoid(), value: 'S3' },
    { id: nanoid(), value: 'S4' },
    { id: nanoid(), value: 'S5' },
    { id: nanoid(), value: 'S6' },
    { id: nanoid(), value: 'S7' },
    { id: nanoid(), value: 'S8' },
  ];

  const departmentWithBatch: Options[] = [
    { id: nanoid(), value: 'CSE-A' },
    { id: nanoid(), value: 'CSE-B' },
    { id: nanoid(), value: 'ME-A' },
    { id: nanoid(), value: 'ME-B' },
    { id: nanoid(), value: 'AD' },
    { id: nanoid(), value: 'EEE' },
    { id: nanoid(), value: 'ECE-A' },
    { id: nanoid(), value: 'ECE-B' },
  ];

  const [bookingStep, setBookingStep] = useState<number>(1);
  const [selectedPeriods, setSelectedPeriods] = useState<PeriodTiming[]>([]);
  const [labName, setLabName] = useState<string>('');
  const [summaryPage, setSummaryPage] = useState<number>(1);

  const [bookingDetails, setBookingDetails] = useState<LabBookingDetails>({
    semester: '',
    departmentWithBatch: '',
    venue: '',
    timings: [
      {
        id: '',
        day: '',
        timing: '',
      },
    ],
    negotiable: false,
    purpose: '',
  });

  const reservationInfo: ReservationInfo = {
    staffName: 'Prof. Mereen Thomas',
    semester: 'S6',
    departmentWithBatch: 'CSE-B',
    date: 'April 22, 2023',
    timing: '9:00 - 11:00',
    venue: 'Programming Lab',
    purpose: '',
    negotiable: true,
    phone: '+9190123456789',
  };

  const contactStaff = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.id === 'negotiable' && event.target.value === 'true')
      setBookingDetails({ ...bookingDetails, negotiable: true });
    else if (event.target.id === 'negotiable' && event.target.value === 'false')
      setBookingDetails({ ...bookingDetails, negotiable: false });
    else setBookingDetails({ ...bookingDetails, [event.target.id]: event.target.value });
  };

  const {
    isOpen: isOpenSummaryModal,
    onOpen: onOpenSummaryModal,
    onClose: onCloseSummaryModal,
  } = useDisclosure();

  const {
    isOpen: isOpenReservationModal,
    onOpen: onOpenReservationModal,
    onClose: onCloseReservationModal,
  } = useDisclosure();

  const closeSummaryModal = () => {
    onCloseSummaryModal();
    setSummaryPage(1);
  };

  const removePeriod = (id: string) => {
    const newPeriods = selectedPeriods.filter((period) => period.id !== id);
    setSelectedPeriods(newPeriods);
  };

  const togglePeriods = (id: string, timing: string, day: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedPeriods.some((period) => period.id.includes(id)) === false
      ? setSelectedPeriods((prevElements) => [...prevElements, { id, timing, day }])
      : removePeriod(id);
  };

  const toast = useToast();

  const changePage = () => {
    if (selectedPeriods.length === 0) {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="red.50">
            No Periods Selected
          </Box>
        ),
      });
    } else {
      setBookingStep(2);
      setBookingDetails({ ...bookingDetails, timings: selectedPeriods });
    }
  };

  const saveLabName = (name: string) => {
    setLabName(name);
    setBookingDetails({ ...bookingDetails, venue: name });
    onOpenSummaryModal();
  };

  const bookNow = () => {
    // console.log(bookingDetails);
  };

  return (
    <Box pb="40">
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
                  bg={key !== dayNumber ? 'gray.50' : 'black.50'}
                  color={key !== dayNumber ? 'black' : 'white'}
                  rounded="12px"
                  justify="center"
                  align="center"
                  cursor="pointer"
                  onClick={() => {
                    setDayNumber(key);
                  }}
                >
                  <Text fontWeight="bold">{value}</Text>
                </Flex>
              ))}
            </>
          </Grid>
          {teacherTimetable.days[dayNumber].periods.map(
            ({ id, periodName, semester, branch, timing }, key) => {
              const periodHeading: string = `${key + 1}. ${periodName}`;
              const semesterHeading: string = semester !== '' ? `${semester} ${branch} ` : ``;
              return (
                <CustomCard
                  onClick={() => togglePeriods(id, timing, teacherTimetable.days[dayNumber].day)}
                  cardProps={{
                    bg:
                      selectedPeriods.some((period) => period.id.includes(id)) === false
                        ? 'gray.50'
                        : 'green.25',
                  }}
                  key={id}
                  properties={[
                    {
                      id: nanoid(),
                      value: periodHeading,
                      textProps: {
                        color: 'black.25',
                        fontSize: 'lg',
                        fontWeight: 'bold',
                      },
                    },
                    {
                      id: nanoid(),
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
            }
          )}
          <CustomButton
            onClick={() => {
              changePage();
            }}
            innerText="Next"
            type="regular"
            disabled={false}
          />
        </>
      ) : (
        <>
          {labDetails.data.map(({ id, name, roomNo, status }, key) => {
            const labNameHeading: string = `${key + 1}. ${name}`;
            return status !== Status.Reserved ? (
              <CustomCard
                key={id}
                onClick={status !== Status.ClassTime ? () => saveLabName(name) : () => null}
                properties={[
                  {
                    id: nanoid(),
                    value: labNameHeading,
                    textProps: {
                      color: status !== Status.ClassTime ? 'black.25' : 'gray.25',
                      fontSize: 'lg',
                      fontWeight: 'bold',
                    },
                  },
                  {
                    id: nanoid(),
                    value: roomNo,
                    textProps: {
                      color: status === Status.ClassTime ? 'gray.25' : 'black.25',
                      fontSize: '15',
                      fontWeight: 'medium',
                      ml: '5',
                    },
                  },
                ]}
                circleComponent={false}
              />
            ) : (
              <ElementCard
                key={id}
                onClick={() => {
                  onOpenReservationModal();
                }}
                circleProps={{
                  borderRadius: '12px',
                  w: '90px',
                  h: '30px',
                  bg: 'red.50',
                }}
                circleInnerText="Reserved"
                properties={[
                  {
                    id: nanoid(),
                    value: labNameHeading,
                    textProps: {
                      color: 'black.25',
                      fontSize: 'lg',
                      fontWeight: 'bold',
                    },
                  },
                  {
                    id: nanoid(),
                    value: roomNo,
                    textProps: {
                      color: 'black.25',
                      fontSize: '15',
                      fontWeight: 'medium',
                      ml: '5',
                    },
                  },
                ]}
              />
            );
          })}
          <CustomButton
            onClick={() => {
              setBookingStep(1);
            }}
            innerText="Back"
            type="regular"
            disabled={false}
          />
        </>
      )}

      <Modal
        isCentered
        size="xs"
        onClose={closeSummaryModal}
        isOpen={isOpenSummaryModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              {summaryPage === 1 ? (
                <>
                  <FormLabel htmlFor="semester" pl="1">
                    Semester
                  </FormLabel>
                  <Select
                    id="semester"
                    onChange={handleFormChange}
                    value={bookingDetails.semester}
                    bg="gray.50"
                    mb="7"
                    rounded="12px"
                  >
                    {semesters.map(({ id, value }) => (
                      <option key={id}>{value}</option>
                    ))}
                  </Select>
                  <FormLabel htmlFor="semester" pl="1">
                    Department & Batch
                  </FormLabel>
                  <Select
                    id="departmentWithBatch"
                    bg="gray.50"
                    mb="7"
                    rounded="12px"
                    onChange={handleFormChange}
                    value={bookingDetails.departmentWithBatch}
                  >
                    {departmentWithBatch.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                  <FormLabel htmlFor="labName" pl="1">
                    Venue
                  </FormLabel>
                  <Input bg="gray.50" id="labName" value={labName} mb="7" rounded="12px" disabled />
                </>
              ) : (
                <>
                  <FormLabel htmlFor="timing" pl="1">
                    Timing
                  </FormLabel>
                  <ReactSelect options={selectedPeriods} values={selectedPeriods} disabled />

                  <FormLabel htmlFor="purpose" pl="1">
                    Purpose
                  </FormLabel>
                  <Input
                    bg="gray.50"
                    id="purpose"
                    mb="7"
                    onChange={handleFormChange}
                    value={bookingDetails.purpose}
                    placeholder="(Optional)"
                    rounded="12px"
                  />
                  <FormLabel htmlFor="semester" pl="1">
                    Level of need
                  </FormLabel>
                  <Select
                    id="negotiable"
                    bg="gray.50"
                    mb="7"
                    rounded="12px"
                    onChange={handleFormChange}
                    value={bookingDetails.negotiable.toString()}
                  >
                    <option value="false">Non-Negotiable</option>
                    <option value="true">Negotiable</option>
                  </Select>
                </>
              )}
              <CustomButton
                onClick={() => (summaryPage === 1 ? setSummaryPage(2) : bookNow())}
                innerText={summaryPage === 1 ? 'Next' : 'Book Now'}
                type="modal"
                disabled={false}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        size="xs"
        onClose={onCloseReservationModal}
        isOpen={isOpenReservationModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>Reservation Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Staff:  ${reservationInfo.staffName}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Department & Batch:  ${reservationInfo.departmentWithBatch}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Semester:  ${reservationInfo.semester}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Date:  ${reservationInfo.date}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Timing:  ${reservationInfo.timing}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Venue:  ${reservationInfo.venue}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Purpose:  ${reservationInfo.purpose}`}</Text>
            <CustomButton
              onClick={() =>
                reservationInfo.negotiable === true ? contactStaff(reservationInfo.phone) : null
              }
              innerText="Negotiate"
              type="modal"
              disabled={!reservationInfo.negotiable}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookLab;
