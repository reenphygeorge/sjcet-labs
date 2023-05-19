/* eslint-disable import/extensions */
import { FC, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import ElementCard from '@/components/elementCard';
import TopHeading from '@/components/topHeading';
import CustomButton from '@/components/customButton';
import { BookingDetailsFetched } from '@/types/bookingDetails';

const ViewBookings: FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<BookingDetailsFetched>({
    id: '',
    semester: '',
    departmentWithBatch: '',
    date: '',
    timings: [],
    venue: '',
    purpose: '',
    status: '',
  });
  const {
    isOpen: isOpenBookingModal,
    onOpen: onOpenBookingModal,
    onClose: onCloseBookingModal,
  } = useDisclosure();

  const requestList: BookingDetailsFetched[] = [
    {
      id: '0',
      semester: 'S6',
      departmentWithBatch: 'CSE-B',
      date: 'April 22, 2023',
      timings: ['9:00 - 11:00', '11:00 - 12:45'],
      venue: 'Software Computing Lab',
      purpose: '',
      status: 'Requested',
    },
    {
      id: '1',
      semester: 'S4',
      departmentWithBatch: 'CSE-A',
      date: 'April 22, 2023',
      timings: ['01:35 - 03:30'],
      venue: 'Programming Lab',
      purpose: '',
      status: 'Approved',
    },
  ];

  const openModal = (key: number) => {
    setSelectedBooking(requestList[key]);
    onOpenBookingModal();
  };
  return (
    <>
      <TopHeading heading="My Bookings" subText="View my bookings" />
      {requestList.map(({ id, venue, date, status }, key) => (
        <ElementCard
          onClick={() => {
            openModal(key);
          }}
          key={id}
          circleProps={{
            borderRadius: '12px',
            w: '90px',
            h: '30px',
            bg: status === 'Requested' ? 'red.50' : 'green.50',
          }}
          circleInnerText={status}
          properties={[
            {
              value: venue,
              textProps: {
                color: 'black.25',
                fontSize: 'md',
                fontWeight: 'bold',
              },
            },
            {
              value: date,
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
            >{`Date:  ${selectedBooking.date}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Timing:  ${selectedBooking.timings}`}</Text>
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
                () => null
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

export default ViewBookings;
