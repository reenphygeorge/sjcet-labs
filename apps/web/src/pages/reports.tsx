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
import { ChangeEvent, useContext, useState } from 'react';
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import ElementCard from '@/components/ElementCard';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import { NewReportData } from '@/types/Reports.d';
import authGuard from '../../util/AuthGuard';
import { UserContext } from '@/context/UserContext';
import { ReportData } from '@/types/UserData';
import { GeneralContext } from '@/context/GeneralContext';
import { NumberOptions } from '@/types/ReactSelect';

const Reports: NextPage = () => {
  const toast = useToast();
  const { labs } = useContext(GeneralContext);
  const userContext = useContext(UserContext);

  const [selectedReportDetails, setReportStudentDetails] = useState<ReportData>({
    id: '',
    date: '',
    timing: '',
    venue: '',
    issue: '',
    status: '',
    systemNo: [],
  });

  const [newReportData, setNewReportData] = useState<NewReportData>({
    registerNumber:
      userContext?.userData.registerNumber !== undefined
        ? userContext?.userData.registerNumber
        : null,
    systemNo: [],
    venue: 'Software Computing Lab',
    issue: '',
  });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.id === 'systemNo') {
      const systemNo: NumberOptions[] = event.target.value.split(' ').map((value) => ({
        value: parseInt(value, 10),
        label: `${value}`,
      }));

      setNewReportData({
        ...newReportData,
        systemNo: [...systemNo],
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
    toast({
      position: 'bottom',
      render: () => (
        <Box color="white" p={3} rounded="12px" bg="green.50">
          Reported
        </Box>
      ),
    });
    // console.log(newReportData);
    onCloseNewReportModal();
  };

  return (
    <>
      <TopHeading heading="Report System" subText="Reported system errors" arrow />
      {userContext?.userData.report.length !== 0 ? (
        userContext?.userData.report.map(({ id, venue, date, status }, key) => (
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
        ))
      ) : (
        <Text fontSize="md" mb={4} fontWeight="semibold">
          Nothing to Show
        </Text>
      )}
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
              <FormLabel pl="1">Venue</FormLabel>
              <Select bg="gray.50" mb="7" rounded="12px" id="venue" onChange={handleFormChange}>
                {labs.map(({ id, labName }) => (
                  <option id={id} value={labName}>
                    {labName}
                  </option>
                ))}
              </Select>
              <FormLabel pl="1">System No</FormLabel>
              <Input bg="gray.50" id="systemNo" mb="7" rounded="12px" onChange={handleFormChange} />
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
