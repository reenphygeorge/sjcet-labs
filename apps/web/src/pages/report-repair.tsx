/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import { ChangeEvent, useContext, useState } from 'react';
import { nanoid } from 'nanoid';
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
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import TopHeading from '@/components/TopHeading';
import CustomCard from '@/components/CustomCard';
import CustomButton from '@/components/CustomButton';
import authGuard from '../../util/AuthGuard';
import { LabSideReport } from '@/types/UserData';
import { UserContext } from '@/context/UserContext';

type ResolveInfo = {
  comment: string;
};

const ReportRepair: NextPage = () => {
  const userContext = useContext(UserContext);

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

  const [resolveInfo, setResolveInfo] = useState<ResolveInfo>({
    comment: '',
  });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setResolveInfo({ ...resolveInfo, [event.target.id]: event.target.value });
  };

  const resolve = () => {
    // console.log({
    //   reportId: selectedReport.id,
    //   comment: resolveInfo.comment,
    // });
    onCloseReportModal();
  };
  return (
    <>
      <TopHeading heading="Report & Repairs" subText="Reported Error" arrow />
      {userContext?.userData.labData?.report.map(({ id, staffName, date, status, systemNo }, key) =>
        status === 'Pending' ? (
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
            <FormControl>
              <FormLabel htmlFor="comment">Comment on issue</FormLabel>
              <Input
                bg="gray.50"
                id="comment"
                value={resolveInfo.comment}
                onChange={handleFormChange}
                mb="7"
                rounded="12px"
              />
              <HStack justify="center">
                <CustomButton onClick={resolve} innerText="Resolve" type="modal" disabled={false} />
              </HStack>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default authGuard(ReportRepair);
