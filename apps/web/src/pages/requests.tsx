/* eslint-disable import/extensions */
import { useContext, useState } from 'react';
import {
  HStack,
  IconButton,
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
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import { Check, X } from 'react-feather';
import TopHeading from '@/components/TopHeading';
import CustomCard from '@/components/CustomCard';
import authGuard from '../../util/AuthGuard';
import { LabSideReservation } from '@/types/UserData';
import { UserContext } from '@/context/UserContext';

const Requests: NextPage = () => {
  const userContext = useContext(UserContext);

  const [selectedRequest, setSelectedRequest] = useState<LabSideReservation>({
    id: '',
    staffName: '',
    semester: null,
    department: {
      id: '',
      name: '',
      batch: '',
    },
    dateOfRequest: '',
    status: '',
    periods: [],
    purpose: '',
    venue: '',
  });
  const {
    isOpen: isOpenRequestModal,
    onOpen: onOpenRequestModal,
    onClose: onCloseRequestModal,
  } = useDisclosure();

  const openModal = (key: number) => {
    const reservationData = userContext?.userData.labData?.reservation;
    if (reservationData !== undefined) {
      setSelectedRequest(reservationData[key]);
    }
    onOpenRequestModal();
  };

  const accept = () => {};
  const reject = () => {};

  return (
    <>
      <TopHeading heading="Lab Requests" subText="Accept/Decline" arrow />
      {userContext?.userData.labData?.reservation.map(
        ({ id, staffName, dateOfRequest, status }, key) =>
          status === 'Requested' ? (
            <CustomCard
              onClick={() => {
                openModal(key);
              }}
              circleComponent={false}
              key={id}
              properties={[
                {
                  id: nanoid(),
                  value: `Prof. ${staffName}`,
                  textProps: {
                    color: 'black.25',
                    fontSize: 'lg',
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
          ) : (
            ''
          )
      )}

      <Modal
        isCentered
        size="xs"
        onClose={onCloseRequestModal}
        isOpen={isOpenRequestModal}
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
            >{`Staff:  Prof. ${selectedRequest.staffName}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Department & Batch:  ${selectedRequest.department}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Semester:  S${selectedRequest.semester}`}</Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              Timing:
              <br />
              <br />
              {selectedRequest.periods.map(({ id, date, periodNo }) => (
                <Tag key={id} mb={2}>
                  {`${date}, Period: ${periodNo} `}
                </Tag>
              ))}
            </Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Purpose:  ${selectedRequest.purpose}`}</Text>
            <HStack justify="center" py={5} spacing={10}>
              <IconButton aria-label="Accept" onClick={() => accept} icon={<Check />} size="sm" />
              <IconButton aria-label="Reject" onClick={() => reject} icon={<X />} size="sm" />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default authGuard(Requests);
