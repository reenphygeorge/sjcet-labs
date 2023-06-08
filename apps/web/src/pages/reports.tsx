/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import {
  Box,
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
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import ElementCard from '@/components/ElementCard';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import ReactSelect from '@/components/ReactSelect';
import { Data, LabList, NewReportData } from '@/types/Reports.d';
import { NumberOptions } from '@/types/ReactSelect';
import reportList from '../../util/reportData';
import authGuard from '../../util/AuthGuard';

const Reports: NextPage = () => {
  const toast = useToast();
  const labList: LabList[] = [
    {
      id: 'L0',
      labName: 'Software Computing Lab',
    },
    {
      id: 'L1',
      labName: 'Programming Lab',
    },
    {
      id: 'L2',
      labName: 'Network Lab',
    },
    {
      id: 'L3',
      labName: 'Research Lab',
    },
    {
      id: 'L3',
      labName: 'Testing Lab',
    },
  ];

  const [selectedReportDetails, setReportStudentDetails] = useState<Data>({
    id: '',
    date: '',
    staffName: '',
    timing: '',
    venue: '',
    issue: '',
    status: '',
    systemNo: [],
  });

  const [newReportData, setNewReportData] = useState<NewReportData>({
    systemNo: [],
    venue: 'Software Computing Lab',
    issue: '',
  });

  const handleSelectChange = (selectedOptions: NumberOptions[]) => {
    // const selectedSystems: number[] = selectedOptions.map(({ value }) => value);
    setNewReportData({ ...newReportData, systemNo: selectedOptions });
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewReportData({ ...newReportData, [event.target.id]: event.target.value });
  };

  const systemNos: NumberOptions[] = [
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
    setReportStudentDetails(reportList[key]);
    onOpenReportModal();
  };

  const reportNow = () => {
    toast({
      position: 'bottom',
      render: () => (
        <Box color="white" p={3} rounded="12px" bg="green.50">
          Reported
        </Box>
      ),
    });
    onCloseNewReportModal();
    // console.log(newReportData);
  };

  return (
    <>
      <TopHeading heading="Report System" subText="Reported system errors" arrow />
      {reportList.map(({ id, venue, date, status }, key) => (
        <ElementCard
          onClick={() => {
            openReportModal(key);
          }}
          key={id}
          circleProps={{
            borderRadius: '12px',
            w: '90px',
            h: '30px',
            bg: status === 'Pending' ? 'red.50' : 'green.50',
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
          <ModalHeader>Report Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mb={4}>
              <Text fontSize="md" fontWeight="semibold">
                System No:
              </Text>
              {selectedReportDetails.systemNo.map((number) => (
                <Tag fontSize="md" id={number.toString()} variant="solid" fontWeight="semibold">
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
              <Tag bg={selectedReportDetails.status === 'Pending' ? 'red.200' : 'green.200'}>
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
          <ModalHeader>New Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel pl="1">System No</FormLabel>
              <ReactSelect
                options={systemNos}
                values={newReportData.systemNo}
                disabled={false}
                onChange={handleSelectChange}
              />
              <FormLabel pl="1">Venue</FormLabel>
              <Select bg="gray.50" mb="7" rounded="12px" id="venue" onChange={handleFormChange}>
                {labList.map(({ id, labName }) => (
                  <option id={id} value={labName}>
                    {labName}
                  </option>
                ))}
              </Select>
              <FormLabel pl="1">Describe the issue</FormLabel>
              <Input bg="gray.50" id="issue" mb="7" rounded="12px" onChange={handleFormChange} />
              <CustomButton
                onClick={() => {
                  reportNow();
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

export default authGuard(Reports);
