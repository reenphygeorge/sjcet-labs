/* eslint-disable react/destructuring-assignment */
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
  useToast,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { ChangeEvent, useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import Link from 'next/router';
import { BookLabContext } from '@/context/BookLabContext';
import TopHeading from '@/components/TopHeading';
import { Day, LabBookingDetails, ReservationInfo, Semester } from '@/types/BookLab';
import CustomCard from '@/components/CustomCard';
import CustomButton from '@/components/CustomButton';
import ReactSelect from '@/components/ReactSelect';
import { UserContext } from '@/context/UserContext';
import { bookLab } from '@/hooks/api/labs';
import { GeneralContext } from '@/context/GeneralContext';

const PeriodSelect: NextPage = () => {
  const bookLabContext = useContext(BookLabContext);
  const userContext = useContext(UserContext);
  const { departments } = useContext(GeneralContext).data;

  const [dayNumber, setDayNumber] = useState<number>(0);
  const days: Day[] = [
    { id: nanoid(), value: 'M', day: 'Monday' },
    { id: nanoid(), value: 'T', day: 'Tuesday' },
    { id: nanoid(), value: 'W', day: 'Wednesday' },
    { id: nanoid(), value: 'T', day: 'Thursday' },
    { id: nanoid(), value: 'F', day: 'Friday' },
    { id: nanoid(), value: 'S', day: 'Saturday' },
  ];

  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);

  const [summaryPage, setSummaryPage] = useState<number>(1);

  const changeDay = (key: number) => {
    setSelectedPeriods([]);
    setDayNumber(key);
  };

  const removePeriod = (periodNo: number) => {
    const newPeriod = selectedPeriods.filter((period) => period !== periodNo);
    setSelectedPeriods(newPeriod);
  };

  const togglePeriods = (periodNo: number) => {
    if (selectedPeriods.includes(periodNo)) {
      removePeriod(periodNo);
    } else {
      setSelectedPeriods([...selectedPeriods, periodNo]);
    }
  };

  const periodNos = [1, 2, 3, 4, 5, 6];

  const toast = useToast();

  const [bookingDetails, setBookingDetails] = useState<LabBookingDetails>({
    professorId: userContext?.userData !== undefined ? userContext?.userData.registerNumber : '',
    dayId: '',
    negotiable: false,
    purpose: '',
    semester: 1,
    batch: '',
    periods: selectedPeriods,
    teachingDepartmentsId: '56b3fe8a-83e6-4184-9f1b-d0c976fc4f2e',
    labId: bookLabContext?.labData.labId !== undefined ? bookLabContext?.labData.labId : '',
  });

  const semesters: Semester[] = [
    { id: nanoid(), value: 1 },
    { id: nanoid(), value: 2 },
    { id: nanoid(), value: 3 },
    { id: nanoid(), value: 4 },
    { id: nanoid(), value: 5 },
    { id: nanoid(), value: 6 },
    { id: nanoid(), value: 7 },
    { id: nanoid(), value: 8 },
  ];

  const {
    isOpen: isOpenSummaryModal,
    onOpen: onOpenSummaryModal,
    onClose: onCloseSummaryModal,
  } = useDisclosure();

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.id === 'negotiable' && event.target.value === 'true')
      setBookingDetails({ ...bookingDetails, negotiable: true });
    else if (event.target.id === 'negotiable' && event.target.value === 'false')
      setBookingDetails({ ...bookingDetails, negotiable: false });
    else if (event.target.id === 'semester')
      setBookingDetails({ ...bookingDetails, semester: Number(event.target.value) });
    else setBookingDetails({ ...bookingDetails, [event.target.id]: event.target.value });
  };

  const viewSummary = async () => {
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
      setSummaryPage(1);
      setBookingDetails({
        ...bookingDetails,
        periods: selectedPeriods,
        dayId: days[dayNumber].day,
      });
      onOpenSummaryModal();
    }
  };

  const bookNow = async () => {
    bookLab(bookingDetails).then(() => {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="green.300">
            Booking Success
          </Box>
        ),
      });
      Link.push('/');
    });
  };

  const reservationModal = () => {};

  return (
    <Box pb="20">
      <TopHeading heading="Book Lab" subText="Select the periods" arrow />
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
                changeDay(key);
              }}
            >
              <Text fontWeight="bold">{value}</Text>
            </Flex>
          ))}
        </>
      </Grid>
      {periodNos.map((periodNo) => {
        const reserved: boolean =
          bookLabContext?.reservationInfo !== undefined
            ? bookLabContext?.reservationInfo.some(
                (info: ReservationInfo) =>
                  info.dayId === days[dayNumber].day && info.periodNumber === periodNo
              )
            : true;
        const periodHeading = reserved ? `${periodNo}. Reserved` : `${periodNo}. Available`;
        const defaultBgColor: string = reserved ? 'gray.100' : 'gray.50';
        const defaultTextColor: string = reserved ? 'gray.400' : 'black';

        return (
          <CustomCard
            onClick={() => (!reserved ? togglePeriods(periodNo) : reservationModal())}
            cardProps={{
              bg: selectedPeriods.includes(periodNo) && !reserved ? 'green.25' : defaultBgColor,
            }}
            key={periodNo}
            properties={[
              {
                id: nanoid(),
                value: periodHeading,
                textProps: {
                  color: defaultTextColor,
                  fontSize: 'lg',
                  fontWeight: 'bold',
                },
              },
            ]}
            iconComponent={false}
            iconHover={false}
          />
        );
      })}
      <CustomButton
        onClick={async () => {
          await viewSummary();
        }}
        innerText="Next"
        type="regular"
        disabled={false}
      />

      {/* Summary Modal */}

      <Modal
        isCentered
        size="xs"
        onClose={onCloseSummaryModal}
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
                  <FormLabel htmlFor="teachingDepartmentsId" pl="1">
                    Department
                  </FormLabel>
                  <Select
                    id="teachingDepartmentsId"
                    bg="gray.50"
                    mb="7"
                    rounded="12px"
                    onChange={handleFormChange}
                    value={bookingDetails.teachingDepartmentsId}
                  >
                    {departments.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {`${name}`}
                      </option>
                    ))}
                  </Select>
                  <FormLabel htmlFor="batch" pl="1">
                    Batch
                  </FormLabel>
                  <Input
                    bg="gray.50"
                    id="batch"
                    mb="7"
                    rounded="12px"
                    onChange={handleFormChange}
                  />
                  <FormLabel htmlFor="labName" pl="1">
                    Lab Name
                  </FormLabel>
                  <Input
                    bg="gray.50"
                    id="labName"
                    value={bookLabContext?.labData.labName}
                    mb="7"
                    rounded="12px"
                    disabled
                  />
                </>
              ) : (
                <>
                  <FormLabel htmlFor="periodNo" pl="1">
                    Periods
                  </FormLabel>
                  <ReactSelect
                    options={selectedPeriods.map((period) => ({
                      label: `Period ${period}`,
                      value: period,
                    }))}
                    values={selectedPeriods.map((period) => ({
                      label: `Period ${period}`,
                      value: period,
                    }))}
                    disabled
                  />

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
    </Box>
  );
};

export default PeriodSelect;
