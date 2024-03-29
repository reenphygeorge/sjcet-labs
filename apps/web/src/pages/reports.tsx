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
import { ChangeEvent, useContext, useState } from 'react';
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import Link from 'next/router';
import ElementCard from '@/components/ElementCard';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import { NewReportData } from '@/types/Reports.d';
import authGuard from '../../util/AuthGuard';
import { UserContext } from '@/context/UserContext';
import { ReportData } from '@/types/UserData';
import { GeneralContext } from '@/context/GeneralContext';
import { createReports } from '@/hooks/api/report';

const Reports: NextPage = () => {
  const toast = useToast();
  const { labs } = useContext(GeneralContext).data;
  const userContext = useContext(UserContext);

  const [selectedReportDetails, setReportStudentDetails] = useState<ReportData>({
    id: '',
    date: '',
    timing: '',
    labName: '',
    issue: '',
    status: '',
    systemNo: [],
  });
  const [newReportData, setNewReportData] = useState<NewReportData>({
    professorId:
      userContext?.userData.registerNumber !== undefined
        ? userContext?.userData.registerNumber
        : null,
    systems: [],
    labId: labs[0].id,
    issueDescription: '',
  });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.id === 'systems') {
      const systems: number[] = event.target.value.split(' ').map((value) => parseInt(value, 10));

      setNewReportData({
        ...newReportData,
        systems: [...systems],
      });
    } else {
      setNewReportData({ ...newReportData, [event.target.id]: event.target.value });
    }
  };

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
    if (userContext?.userData.report[key] !== undefined) {
      setReportStudentDetails(userContext?.userData.report[key]);
    }
    onOpenReportModal();
  };

  const reportNow = () => {
    createReports(newReportData).then(() => {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="green.300">
            Reported
          </Box>
        ),
      });
    });
    onCloseNewReportModal();
    Link.push('/');
  };

  return (
    <Box pb={20}>
      <TopHeading heading="Report System" subText="Reported system errors" arrow />
      {userContext?.userData.report.map(({ id, labName, date, status }, key) => (
        <ElementCard
          onClick={() => {
            openReportModal(key);
          }}
          key={id}
          circleProps={{
            borderRadius: '12px',
            w: '90px',
            h: '30px',
            bg: status === 'PENDING' ? 'red.50' : 'green.50',
          }}
          circleInnerText={status}
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
                <Tag
                  key={number}
                  fontSize="md"
                  id={number.toString()}
                  variant="solid"
                  fontWeight="semibold"
                >
                  {`# ${number}`}
                </Tag>
              ))}
            </HStack>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Lab Name: ${selectedReportDetails.labName}`}
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
              <FormLabel pl="1">Lab Name</FormLabel>
              <Select bg="gray.50" mb="7" rounded="12px" id="labId" onChange={handleFormChange}>
                {labs.map(({ id, labName }) => (
                  <option id={id} key={id} value={id}>
                    {labName}
                  </option>
                ))}
              </Select>
              <FormLabel pl="1">System No</FormLabel>
              <Input bg="gray.50" id="systems" mb="7" rounded="12px" onChange={handleFormChange} />
              <FormLabel pl="1">Describe the issue</FormLabel>
              <Input
                bg="gray.50"
                id="issueDescription"
                mb="7"
                rounded="12px"
                onChange={handleFormChange}
              />
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
    </Box>
  );
};

export default authGuard(Reports);
