/* eslint-disable import/extensions */
import { useContext, useState } from 'react';
import {
  Box,
  Flex,
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
  useToast,
} from '@chakra-ui/react';
import Link from 'next/router';
import Lottie from 'lottie-react';
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import { Check, X } from 'react-feather';
import TopHeading from '@/components/TopHeading';
import CustomCard from '@/components/CustomCard';
import authGuard from '../../util/AuthGuard';
import { LabSideReservation } from '@/types/UserData';
import { UserContext } from '@/context/UserContext';
import { reviewReservation } from '@/hooks/api/reservation';
import nothinghere from '../../public/nothinghere.json';

const Requests: NextPage = () => {
  const userContext = useContext(UserContext);
  const toast = useToast();

  const [selectedRequest, setSelectedRequest] = useState<LabSideReservation>({
    id: '',
    staffName: '',
    labName: '',
    semester: null,
    batch: '',
    department: {
      id: '',
      name: '',
    },
    dateOfRequest: '',
    status: '',
    periods: [],
    purpose: '',
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

  const accept = () => {
    reviewReservation(selectedRequest.id, 'APPROVED').then(() => {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="green.300">
            Requested Approved!
          </Box>
        ),
      });
      Link.push('/');
    });
  };
  const reject = () => {
    reviewReservation(selectedRequest.id, 'REJECTED').then(() => {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="red.50">
            Requested Rejected!
          </Box>
        ),
      });
      Link.push('/');
    });
  };

  return (
    <>
      <TopHeading heading="Lab Requests" subText="Accept/Decline" arrow />
      {userContext?.userData.labData?.reservation.length !== 0 ? (
        userContext?.userData.labData?.reservation.map(
          ({ id, staffName, dateOfRequest, status }, key) =>
            status === 'REQUESTED' ? (
              <CustomCard
                onClick={() => {
                  openModal(key);
                }}
                iconComponent={false}
                iconHover={false}
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
        )
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
            >{`Department & Batch:  ${selectedRequest.department.name}-${selectedRequest.batch}`}</Text>
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
              <IconButton aria-label="Accept" onClick={accept} icon={<Check />} size="sm" />
              <IconButton aria-label="Reject" onClick={reject} icon={<X />} size="sm" />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default authGuard(Requests);
