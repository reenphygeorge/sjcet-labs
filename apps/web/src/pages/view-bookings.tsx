/* eslint-disable import/extensions */
import { useContext, useState } from 'react';
import {
  Box,
  Flex,
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
import Lottie from 'lottie-react';
import ElementCard from '@/components/ElementCard';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import authGuard from '../../util/AuthGuard';
import { UserContext } from '@/context/UserContext';
import { ReservationData } from '@/types/UserData';
import { deleteReservation } from '@/hooks/api/reservation';
import nothinghere from '../../public/nothinghere.json';

const ViewBookings: NextPage = () => {
  const toast = useToast();

  const [selectedBooking, setSelectedBooking] = useState<ReservationData>({
    id: '',
    semester: null,
    batch: '',
    department: {
      id: '',
      name: '',
    },
    dateOfRequest: '',
    periods: [],
    purpose: '',
    labName: '',
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
    deleteReservation(selectedBooking.id).then(() => {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="green.300">
            Booking Cancelled
          </Box>
        ),
      });
      Link.push('/');
    });
  };
  return (
    <Box pb={20}>
      <TopHeading heading="My Bookings" subText="View my bookings" arrow />
      {userContext?.userData.reservation.length !== 0 ? (
        userContext?.userData.reservation.map(({ id, labName, dateOfRequest, status }, key) => (
          <ElementCard
            onClick={() => {
              openModal(key);
            }}
            key={id}
            circleProps={{
              borderRadius: '12px',
              w: '90px',
              h: '30px',
              bg:
                // eslint-disable-next-line no-nested-ternary
                status === 'REQUESTED'
                  ? 'yellow.300'
                  : status === 'REJECTED'
                  ? 'red.50'
                  : 'green.50',
            }}
            circleInnerText={`${status?.charAt(0).toUpperCase()}${status?.slice(1).toLowerCase()}`}
            properties={[
              {
                id: nanoid(),
                value: labName,
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
        <Flex justifyContent="center">
          <Box w={64} mb={36}>
            <Lottie animationData={nothinghere} />
          </Box>
        </Flex>
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
            >{`Department & Batch:  ${selectedBooking.department.name}-${selectedBooking.batch}`}</Text>
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
            >{`Lab Name:  ${selectedBooking.labName}`}</Text>
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
    </Box>
  );
};

export default authGuard(ViewBookings);
