/* eslint-disable import/extensions */
import { useState } from 'react';
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
import { RequestData, Status } from '@/types/LabRequests.d';
import authGuard from '../../util/AuthGuard';

const Requests: NextPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<RequestData>({
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
    isOpen: isOpenRequestModal,
    onOpen: onOpenRequestModal,
    onClose: onCloseRequestModal,
  } = useDisclosure();

  const requestList: RequestData[] = [
    {
      id: '0',
      staffName: 'Smitha Jacob',
      semester: 'S6',
      departmentWithBatch: 'CSE-B',
      dateOfRequest: 'April 18, 2023',
      timings: [
        { id: nanoid(), time: '9:00 - 11:00', date: 'April 22, 2023' },
        { id: nanoid(), time: '11:00 - 12:45', date: 'April 22, 2023' },
      ],
      venue: '',
      purpose: '',
      status: 'Requested',
    },
    {
      id: '1',
      semester: 'S4',
      departmentWithBatch: 'CSE-A',
      dateOfRequest: 'April 25, 2023',
      staffName: 'Sarju S',
      timings: [{ id: nanoid(), time: '01:35 - 03:30', date: 'April 28, 2023' }],
      venue: '',
      purpose: '',
      status: 'Approved',
    },
  ];

  const openModal = (key: number) => {
    setSelectedRequest(requestList[key]);
    onOpenRequestModal();
  };

  const accept = () => {};
  const reject = () => {};

  return (
    <>
      <TopHeading heading="Lab Requests" subText="Accept/Decline" arrow />
      {requestList.map(({ id, staffName, dateOfRequest, status }, key) =>
        status === Status.Requested ? (
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
            >{`Department & Batch:  ${selectedRequest.departmentWithBatch}`}</Text>
            <Text
              fontSize="md"
              mb={4}
              fontWeight="semibold"
            >{`Semester:  ${selectedRequest.semester}`}</Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              Timing:
              <br />
              <br />
              {selectedRequest.timings.map(({ id, time, date }) => (
                <Tag key={id} mb={2}>{`${date} ${time}`}</Tag>
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
