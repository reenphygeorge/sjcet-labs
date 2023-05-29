/* eslint-disable import/extensions */
import { FC, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import ElementCard from '@/components/ElementCard';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import { RequestData, Status } from '@/types/LabRequests.d';

const ViewBookings: FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<RequestData>({
    id: '',
    staffName: '',
    semester: '',
    departmentWithBatch: '',
    dateOfRequest: '',
    timings: [],
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
      timings: [
        { id: nanoid(), time: '9:00 - 11:00', date: 'April 22, 2023' },
        { id: nanoid(), time: '11:00 - 12:45', date: 'April 22, 2023' },
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
      timings: [{ id: nanoid(), time: '01:35 - 03:30', date: 'April 28, 2023' }],
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
              Timing:
              <br />
              <br />
              {selectedBooking.timings.map(({ id, time, date }) => (
                <Tag key={id} mb={2}>{`${date} ${time}`}</Tag>
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
