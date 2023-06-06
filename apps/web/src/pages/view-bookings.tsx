/* eslint-disable import/extensions */
import { useState } from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/router';
import { nanoid } from 'nanoid';
import ElementCard from '@/components/ElementCard';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import { RequestData, Status } from '@/types/LabRequests.d';
import authGuard from '../../util/AuthGuard';

const ViewBookings: NextPage = () => {
  const toast = useToast();

  const [selectedBooking, setSelectedBooking] = useState<RequestData>({
    id: '',
    staffName: '',
    semester: '',
    departmentWithBatch: '',
    dateOfRequest: '',
    periods: [],
    purpose: '',
    venue: '',
    status: '',
  });
  const {
    isOpen: isOpenBookingModal,
    onOpen: onOpenBookingModal,
    onClose: onCloseBookingModal,
  } = useDisclosure();

  const requestList: RequestData[] = [
    {
      id: '0',
      staffName: 'Current Staff',
      semester: 'S6',
      departmentWithBatch: 'CSE-B',
      dateOfRequest: 'April 22, 2023',
      periods: [
        { id: nanoid(), periodNo: '2', date: 'April 22, 2023' },
        { id: nanoid(), periodNo: '3', date: 'April 22, 2023' },
      ],
      venue: 'Software Computing Lab',
      purpose: '',
      status: 'Requested',
    },
    {
      id: '1',
      staffName: 'Current Staff',
      semester: 'S4',
      departmentWithBatch: 'CSE-A',
      dateOfRequest: 'April 22, 2023',
      periods: [{ id: nanoid(), periodNo: '5', date: 'April 28, 2023' }],
      venue: 'Programming Lab',
      purpose: '',
      status: 'Approved',
    },
  ];

  const openModal = (key: number) => {
    setSelectedBooking(requestList[key]);
    onOpenBookingModal();
  };

  const cancelNow = () => {
    toast({
      position: 'bottom',
      render: () => (
        <Box color="white" p={3} rounded="12px" bg="green.50">
          Booking Cancelled
        </Box>
      ),
    });
    Link.push('/');
  };
  return (
    <>
      <TopHeading heading="My Bookings" subText="View my bookings" arrow />
      {requestList.map(({ id, venue, dateOfRequest, status }, key) => (
        <ElementCard
          onClick={() => {
            openModal(key);
          }}
          key={id}
          circleProps={{
            borderRadius: '12px',
            w: '90px',
            h: '30px',
            bg: status === Status.Requested ? 'red.50' : 'green.50',
          }}
          circleInnerText={status}
          properties={[
            {
              id: nanoid(),
              value: venue,
              textProps: {
                color: 'black.25',
                fontSize: 'md',
                fontWeight: 'bold',
              },
            },
            {
              id: nanoid(),
              value: dateOfRequest,
              textProps: {
                color: 'black.25',
                fontSize: '15',
                fontWeight: 'medium',
              },
            },
          ]}
        />
      ))}

      <Modal
        isCentered
        size="xs"
        onClose={onCloseBookingModal}
        isOpen={isOpenBookingModal}
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
            >{`Department & Batch:  ${selectedBooking.departmentWithBatch}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Semester:  ${selectedBooking.semester}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Date:  ${selectedBooking.dateOfRequest}`}</Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              Periods:
              <br />
              <br />
              {selectedBooking.periods.map(({ id, periodNo, date }) => (
                <>
                  <Tag key={id} mb={2}>{`Period No: ${periodNo}, ${date}`}</Tag>
                  <br />
                </>
              ))}
            </Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Venue:  ${selectedBooking.venue}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Purpose:  ${selectedBooking.purpose}`}</Text>
            <CustomButton
              onClick={
                () => cancelNow()
                //   selectedBooking.negotiable === true ? contactStaff(selectedBooking.phone) : null
              }
              innerText="Cancel Now"
              type="modal"
              disabled={false}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default authGuard(ViewBookings);
