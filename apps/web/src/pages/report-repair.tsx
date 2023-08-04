/* eslint-disable import/extensions */
import { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import {
  Box,
  Flex,
  HStack,
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
import Lottie from 'lottie-react';
import Link from 'next/router';
import TopHeading from '@/components/TopHeading';
import CustomCard from '@/components/CustomCard';
import CustomButton from '@/components/CustomButton';
import authGuard from '../../util/AuthGuard';
import { LabSideReport } from '@/types/UserData';
import { UserContext } from '@/context/UserContext';
import { reviewReports } from '@/hooks/api/report';
import nothinghere from '../../public/nothinghere.json';

const ReportRepair: NextPage = () => {
  const userContext = useContext(UserContext);
  const toast = useToast();

  const [selectedReport, setSelectedReport] = useState<LabSideReport>({
    id: '',
    staffName: '',
    date: '',
    status: '',
    timing: '',
    issue: '',
    systemNo: [],
  });

  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();

  const openModal = (key: number) => {
    const reportData = userContext?.userData.labData?.report;
    if (reportData !== undefined) {
      setSelectedReport(reportData[key]);
    }
    onOpenReportModal();
  };

  const resolve = () => {
    reviewReports(selectedReport.id).then(() => {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="green.300">
            Report Reviewed!
          </Box>
        ),
      });
      Link.push('/');
    });
  };
  return (
    <>
      <TopHeading heading="Report & Repairs" subText="Reported Error" arrow />
      {(userContext?.userData?.labData?.report || []).filter(
        (report) => report.status === 'PENDING'
      ).length !== 0 ? (
        userContext?.userData.labData?.report.map(
          ({ id, staffName, date, status, systemNo }, key) =>
            status === 'PENDING' ? (
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
                    value: `Prof. ${staffName} (${systemNo.length})`,
                    textProps: {
                      color: 'black.25',
                      fontSize: 'lg',
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
              {selectedReport.systemNo.map((number) => (
                <Tag fontSize="md" id={number.toString()} variant="solid" fontWeight="semibold">
                  {`# ${number}`}
                </Tag>
              ))}
            </HStack>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Reported On: ${selectedReport.date}`}
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Timing: ${selectedReport.timing}`}
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Issue: ${selectedReport.issue}`}
            </Text>
            <HStack justify="center">
              <CustomButton onClick={resolve} innerText="Resolve" type="modal" disabled={false} />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default authGuard(ReportRepair);
