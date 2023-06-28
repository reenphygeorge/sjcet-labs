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
import Link from 'next/router';
import { ChangeEvent, useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { NextPage } from 'next';
import CustomCard from '@/components/CustomCard';
import CustomButton from '@/components/CustomButton';
import TopHeading from '@/components/TopHeading';
import ElementCard from '@/components/ElementCard';
import ReactSelect from '@/components/ReactSelect';
import { LabBookingDetails, Options, ReservationInfo, SelectedPeriod } from '@/types/BookLab.d';
import authGuard from '../../util/AuthGuard';
import { UserContext } from '@/context/UserContext';
import { GeneralContext } from '@/context/GeneralContext';
import labDetailsforBooking from '../../util/LabDetailsForBooking';

const BookLab: NextPage = () => {
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
    { id: nanoid(), value: 1 },
    { id: nanoid(), value: 2 },
    { id: nanoid(), value: 3 },
    { id: nanoid(), value: 4 },
    { id: nanoid(), value: 5 },
    { id: nanoid(), value: 6 },
    { id: nanoid(), value: 7 },
    { id: nanoid(), value: 8 },
  ];
  const { departments } = useContext(GeneralContext);

  const [bookingStep, setBookingStep] = useState<number>(1);
  const [selectedPeriods, setSelectedPeriods] = useState<SelectedPeriod[]>([]);
  const [labName, setLabName] = useState<string>('');
  const [selectedReservationData, setSelectedReservationData] = useState<ReservationInfo>({
    id: '',
    staffName: '',
    date: '',
    venue: '',
    departmentWithBatch: '',
    negotiable: false,
    phone: '',
    purpose: '',
    semester: 0,
  });
  const userContext = useContext(UserContext);

  const [summaryPage, setSummaryPage] = useState<number>(1);

  const [bookingDetails, setBookingDetails] = useState<LabBookingDetails>({
    userId: userContext?.userData.id !== undefined ? userContext?.userData.id : null,
    semester: 1,
    departmentId: '',
    venue: '',
    periods: [
      {
        id: '',
        periodNo: 0,
        day: '',
      },
    ],
    negotiable: false,
    purpose: '',
  });

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

  const togglePeriods = (id: string, periodNo: number, day: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedPeriods.some((period) => period.id.includes(id)) === false
      ? setSelectedPeriods((prevElements) => [...prevElements, { id, periodNo, day }])
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
      // console.log({ selectedPeriods });

      setBookingStep(2);
      setBookingDetails({ ...bookingDetails, periods: selectedPeriods });
    }
  };

  const saveLabName = (name: string) => {
    setLabName(name);
    setBookingDetails({ ...bookingDetails, venue: name });
    onOpenSummaryModal();
  };

  const bookNow = () => {
    toast({
      position: 'bottom',
      render: () => (
        <Box color="white" p={3} rounded="12px" bg="green.50">
          Booking Success
        </Box>
      ),
    });
    Link.push('/');
    // console.log(bookingDetails);
  };

  const reservedLab = (reservationInfo: ReservationInfo | null) => {
    if (reservationInfo !== null) {
      setSelectedReservationData(reservationInfo);
    }
    onOpenReservationModal();
  };

  return (
    <Box pb="40">
      <TopHeading
        heading="Book Lab"
        subText={bookingStep === 1 ? 'Select the periods' : 'Select the venue'}
        arrow
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
          {userContext?.userData.timeTable[dayNumber].periods.map(
            ({ id, periodName, semester, department, periodNo }, key) => {
              const periodHeading: string =
                periodName !== null ? `${key + 1}. ${periodName}` : `${key + 1}. Free`;
              const semesterHeading: string =
                semester !== null ? `S${semester} ${department?.name}-${department?.batch} ` : ``;
              return (
                <CustomCard
                  onClick={() =>
                    togglePeriods(id, periodNo, userContext?.userData.timeTable[dayNumber].day)
                  }
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
          {labDetailsforBooking.data.map(
            ({ id, name, roomNo, status, reservationDetails }, key) => {
              const labNameHeading: string = `${key + 1}. ${name}`;
              return status !== 'Reserved' ? (
                <CustomCard
                  key={id}
                  onClick={status !== 'ClassTime' ? () => saveLabName(name) : () => null}
                  properties={[
                    {
                      id: nanoid(),
                      value: labNameHeading,
                      textProps: {
                        color: status !== 'ClassTime' ? 'black.25' : 'gray.25',
                        fontSize: 'lg',
                        fontWeight: 'bold',
                      },
                    },
                    {
                      id: nanoid(),
                      value: roomNo,
                      textProps: {
                        color: status === 'ClassTime' ? 'gray.25' : 'black.25',
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
                    reservedLab(reservationDetails);
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
            }
          )}
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
                    value={bookingDetails.semester !== null ? bookingDetails.semester : ''}
                    bg="gray.50"
                    mb="7"
                    rounded="12px"
                  >
                    {semesters.map(({ id, value }) => (
                      <option key={id}>{value}</option>
                    ))}
                  </Select>
                  <FormLabel htmlFor="departmentId" pl="1">
                    Department & Batch
                  </FormLabel>
                  <Select
                    id="departmentId"
                    bg="gray.50"
                    mb="7"
                    rounded="12px"
                    onChange={handleFormChange}
                    value={bookingDetails.departmentId}
                  >
                    {departments.map(({ id, name, batch }) => (
                      <option key={id} value={id}>
                        {`${name} ${batch}`}
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
                  <FormLabel htmlFor="periodNo" pl="1">
                    Periods
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
            >{`Staff:  ${selectedReservationData?.staffName}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Department & Batch:  ${selectedReservationData?.departmentWithBatch}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Semester:  S${selectedReservationData?.semester}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Date:  ${selectedReservationData?.date}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Venue:  ${selectedReservationData?.venue}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Purpose:  ${selectedReservationData?.purpose}`}</Text>
            <CustomButton
              onClick={() =>
                selectedReservationData?.negotiable === true
                  ? contactStaff(selectedReservationData?.phone)
                  : null
              }
              innerText="Negotiate"
              type="modal"
              disabled={!selectedReservationData?.negotiable}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default authGuard(BookLab);
