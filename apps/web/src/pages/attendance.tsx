/* eslint-disable import/extensions */
import { FC, useState } from 'react';
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
  Radio,
  RadioGroup,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import TopHeading from '@/components/topHeading';
import ElementCard from '@/components/elementCard';
import CustomButton from '@/components/customButton';
import CustomCard from '@/components/customCard';
import {
  LabDetails,
  StudentAttendanceData,
  FreeSystems,
  AttendanceStatus,
} from '@/types/attendance.d';

const Attendance: FC = () => {
  const [attendanceStep, setAttendanceStep] = useState<number>(1);

  const studentList: StudentAttendanceData[] = [
    {
      id: '0',
      rollNo: '1',
      name: 'Abin K Jaimon',
      systemNo: '01',
      attendanceStatus: AttendanceStatus.Present,
    },
    {
      id: '1',
      rollNo: '2',
      name: 'Aimil Bij',
      systemNo: '02',
      attendanceStatus: AttendanceStatus.Absent,
    },
  ];

  const [selectedStudentDetails, setSelectedStudentDetails] = useState<StudentAttendanceData>({
    id: '',
    rollNo: '',
    name: '',
    systemNo: '',
    attendanceStatus: AttendanceStatus.Absent,
  });

  const labDetails: LabDetails = {
    data: [
      {
        id: '0',
        name: 'Software Computing Lab',
        roomNo: 'MTB 101',
      },
      {
        id: '2',
        name: 'Network Lab',
        roomNo: 'MTB 101',
      },
      {
        id: '3',
        name: 'Research Lab',
        roomNo: 'MTB 101',
      },
      {
        id: '4',
        name: 'Testing Lab',
        roomNo: 'MTB 101',
      },
    ],
  };

  const freeSystems: FreeSystems[] = [
    {
      id: '0',
      systemNo: '55',
    },
    {
      id: '1',
      systemNo: '56',
    },
    {
      id: '1',
      systemNo: '57',
    },
  ];

  const {
    isOpen: isOpenAttendanceModal,
    onOpen: onOpenAttendanceModal,
    onClose: onCloseAttendanceModal,
  } = useDisclosure();

  const openModal = (key: number) => {
    setSelectedStudentDetails(studentList[key]);
    onOpenAttendanceModal();
  };
  return (
    <>
      <TopHeading heading="Attendance" subText="Tap to mark/unmark" />

      {attendanceStep === 1 ? (
        <>
          {labDetails.data.map(({ id, name, roomNo }, key) => {
            const labNameHeading: string = `${key + 1}. ${name}`;
            return (
              <CustomCard
                key={id}
                onClick={() => {
                  setAttendanceStep(2);
                }}
                properties={[
                  {
                    id: `${id}0`,
                    value: labNameHeading,
                    textProps: {
                      color: 'black.25',
                      fontSize: 'lg',
                      fontWeight: 'bold',
                    },
                  },
                  {
                    id: `${id}1`,
                    value: roomNo,
                    textProps: {
                      color: 'black.25',
                      fontSize: '15',
                      fontWeight: 'medium',
                      ml: '5',
                    },
                  },
                ]}
                circleComponent={false}
              />
            );
          })}
        </>
      ) : (
        studentList.map(({ id, rollNo, name, systemNo, attendanceStatus }, key) => (
          <ElementCard
            onClick={() => {
              openModal(key);
            }}
            key={id}
            circleProps={{
              borderRadius: '12px',
              w: '90px',
              h: '30px',
              bg: 'blue.50',
            }}
            circleInnerText={`#${systemNo}`}
            properties={[
              {
                activeStatus: true,
                activeColor: attendanceStatus === 'Present' ? 'green.50' : 'red.50',
                value: `${rollNo}. ${name}`,
                textProps: {
                  color: 'black.25',
                  fontSize: 'lg',
                  fontWeight: 'bold',
                },
              },
            ]}
          />
        ))
      )}

      <Modal
        isCentered
        size="xs"
        onClose={onCloseAttendanceModal}
        isOpen={isOpenAttendanceModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>Detailed View</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name" pl="1">
                Name
              </FormLabel>
              <Input
                bg="gray.50"
                id="labName"
                value={selectedStudentDetails.name}
                mb="7"
                rounded="12px"
                disabled
              />
              <FormLabel htmlFor="name" pl="1">
                System No
              </FormLabel>
              <Select
                id="departmentWithBatch"
                bg="gray.50"
                mb="7"
                rounded="12px"
                // onChange={handleFormChange}
                value={selectedStudentDetails.systemNo}
              >
                <option value={selectedStudentDetails.systemNo}>
                  {selectedStudentDetails.systemNo}
                </option>
                {freeSystems.map(({ id, systemNo }) => (
                  <option key={id} value={systemNo}>
                    {systemNo}
                  </option>
                ))}
              </Select>
              <FormLabel as="legend">Attendance</FormLabel>
              <RadioGroup defaultValue="Present" mb="7">
                <HStack spacing="24px">
                  <Radio value="Present">Present</Radio>
                  <Radio value="Absent">Absent</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <CustomButton onClick={() => null} innerText="Save" type="modal" disabled={false} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Attendance;
