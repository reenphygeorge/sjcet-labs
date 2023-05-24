/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import ElementCard from '@/components/elementCard';
import TopHeading from '@/components/topHeading';
import { Data, Status } from '@/types/reports.d';
import CustomButton from '@/components/customButton';
import ReactSelect from '@/components/reactSelect';

const Reports: FC = () => {
  const requestList: Data[] = [
    {
      id: '0',
      date: 'March 22, 2023',
      timing: '09:45 AM',
      venue: 'Software Computing Lab',
      issue: '',
      status: Status.Pending,
      systemNo: [51, 22],
    },
    {
      id: '1',
      date: 'March 22, 2023',
      timing: '09:45 AM',
      venue: 'Programming Lab',
      issue: '',
      status: Status.InProgress,
      systemNo: [12],
    },
    {
      id: '2',
      date: 'March 22, 2023',
      timing: '09:45 AM',
      venue: 'Network Lab',
      issue: '',
      status: Status.Resolved,
      systemNo: [10, 24, 51],
    },
  ];

  const labList: string[] = [
    'Software Computing Lab',
    'Programming Lab',
    'Network Lab',
    'Research Lab',
    'Testing Lab',
  ];

  const [selectedReportDetails, setReportStudentDetails] = useState<Data>({
    id: '',
    date: '',
    timing: '',
    venue: '',
    issue: '',
    status: '',
    systemNo: [],
  });

  const systemNos = [
    {
      value: 1,
      label: '01',
    },
    {
      value: 2,
      label: '02',
    },
    {
      value: 3,
      label: '03',
    },
    {
      value: 4,
      label: '04',
    },
    {
      value: 5,
      label: '05',
    },
    {
      value: 6,
      label: '06',
    },
    {
      value: 7,
      label: '07',
    },
    {
      value: 8,
      label: '08',
    },
  ];

  const selectedSystemNos: string[] = [];

  const {
    isOpen: isOpenNewReportModal,
    onOpen: onOpenNewReportModal,
    onClose: onCloseNewReportModal,
  } = useDisclosure();

  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();

  const openReportModal = (key: number) => {
    setReportStudentDetails(requestList[key]);
    onOpenReportModal();
  };
  return (
    <>
      <TopHeading heading="Report System" subText="Reported system errors" />
      {requestList.map(({ id, venue, date, status }, key) => (
        <ElementCard
          onClick={() => {
            openReportModal(key);
          }}
          key={id}
          circleProps={{
            borderRadius: '12px',
            w: '90px',
            h: '30px',
            bg:
              status === 'Pending' ? 'red.50' : status === 'In Progress' ? 'yellow.50' : 'green.50',
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
      <CustomButton
        onClick={() => {
          onOpenNewReportModal();
        }}
        innerText="Report New"
        type="regular"
        disabled={false}
      />

      <Modal
        isCentered
        size="xs"
        onClose={onCloseReportModal}
        isOpen={isOpenReportModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>Reservation Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mb={4}>
              <Text fontSize="md" fontWeight="semibold">
                System No:
              </Text>
              {selectedReportDetails.systemNo.map((number) => (
                <Tag fontSize="md" variant="solid" fontWeight="semibold">
                  {`# ${number}`}
                </Tag>
              ))}
            </HStack>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Venue: ${selectedReportDetails.venue}`}
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Date: ${selectedReportDetails.date}`}
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Timing: ${selectedReportDetails.timing}`}
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              Status:&nbsp;&nbsp;
              <Tag
                bg={
                  selectedReportDetails.status === 'Pending'
                    ? 'red.200'
                    : selectedReportDetails.status === 'In Progress'
                    ? 'yellow.200'
                    : 'green.200'
                }
              >
                {selectedReportDetails.status}
              </Tag>
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Issue: ${selectedReportDetails.issue}`}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        size="xs"
        onClose={onCloseNewReportModal}
        isOpen={isOpenNewReportModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>Reservation Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel pl="1">System No</FormLabel>
              <ReactSelect options={systemNos} values={selectedSystemNos} disabled={false} />
              <FormLabel pl="1">Venue</FormLabel>
              <Select bg="gray.50" mb="7" rounded="12px">
                {labList.map((labName) => (
                  <option value={labName}>{labName}</option>
                ))}
              </Select>
              <FormLabel pl="1">Describe the issue</FormLabel>
              <Input bg="gray.50" id="labName" mb="7" rounded="12px" />
              <CustomButton
                onClick={() => {
                  // onOpenNewReportModal();
                }}
                innerText="Report Now"
                type="regular"
                disabled={false}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Reports;
