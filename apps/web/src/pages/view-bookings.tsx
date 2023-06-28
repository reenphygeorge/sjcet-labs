/* eslint-disable import/extensions */
import { useContext, useState } from 'react';
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
import authGuard from '../../util/AuthGuard';
import { UserContext } from '@/context/UserContext';
import { ReservationData } from '@/types/UserData';

const ViewBookings: NextPage = () => {
  const toast = useToast();

  const [selectedBooking, setSelectedBooking] = useState<ReservationData>({
    id: '',
    semester: null,
    department: {
      id: '',
      name: '',
      batch: '',
    },
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

  const userContext = useContext(UserContext);

  const openModal = (key: number) => {
    if (userContext?.userData.reservation[key] !== undefined) {
      setSelectedBooking(userContext?.userData.reservation[key]);
    }
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
      {userContext?.userData.reservation.length !== 0 ? (
        userContext?.userData.reservation.map(({ id, venue, dateOfRequest, status }, key) => (
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
        ))
      ) : (
        <Text fontSize="md" mb={4} fontWeight="semibold">
          Nothing to Show
        </Text>
      )}

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
            >{`Department & Batch:  ${selectedBooking.department.name}-${selectedBooking.department.batch}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Semester:  S${selectedBooking.semester}`}</Text>
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
