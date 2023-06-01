/* eslint-disable import/extensions */
import { ChangeEvent, useState } from 'react';
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
import { NextPage } from 'next';
import { nanoid } from 'nanoid';
import TopHeading from '@/components/TopHeading';
import ElementCard from '@/components/ElementCard';
import CustomButton from '@/components/CustomButton';
import CustomCard from '@/components/CustomCard';
import {
  LabDetails,
  StudentAttendanceData,
  FreeSystems,
  AttendanceStatus,
} from '@/types/Attendance.d';
import authGuard from '../../util/AuthGuard';

const Attendance: NextPage = () => {
  const [attendanceStep, setAttendanceStep] = useState<number>(1);

  const studentList: StudentAttendanceData[] = [
    {
      id: 'S0',
      rollNo: '1',
      name: 'Abin K Jaimon',
      systemNo: 1,
      attendanceStatus: AttendanceStatus.Present,
    },
    {
      id: 'S1',
      rollNo: '2',
      name: 'Aimil Bij',
      systemNo: 2,
      attendanceStatus: AttendanceStatus.Absent,
    },
  ];

  const [selectedStudentDetails, setSelectedStudentDetails] = useState<StudentAttendanceData>({
    id: '',
    rollNo: '',
    name: '',
    systemNo: 0,
    attendanceStatus: AttendanceStatus.Absent,
  });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.id === 'systemNo') {
      setSelectedStudentDetails({
        ...selectedStudentDetails,
        systemNo: parseInt(event.target.value, 2),
      });
    }
    setSelectedStudentDetails({ ...selectedStudentDetails, [event.target.id]: event.target.value });
  };

  const handleRadioInput = (value: string) => {
    const newAttendanceStatus =
      value === 'Absent' ? AttendanceStatus.Absent : AttendanceStatus.Present;
    setSelectedStudentDetails({
      ...selectedStudentDetails,
      attendanceStatus: newAttendanceStatus,
    });
  };

  const labDetails: LabDetails = {
    data: [
      {
        id: 'L0',
        name: 'Software Computing Lab',
        roomNo: 'MTB 101',
      },
      {
        id: 'L1',
        name: 'Network Lab',
        roomNo: 'MTB 101',
      },
      {
        id: 'L2',
        name: 'Research Lab',
        roomNo: 'MTB 101',
      },
      {
        id: 'L3',
        name: 'Testing Lab',
        roomNo: 'MTB 101',
      },
    ],
  };

  const freeSystems: FreeSystems[] = [
    {
      id: 'FS0',
      systemNo: 55,
    },
    {
      id: 'FS1',
      systemNo: 56,
    },
    {
      id: 'FS2',
      systemNo: 57,
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

  const saveAttendance = () => {
    // console.log(selectedStudentDetails);
  };
  return (
    <>
      <TopHeading arrow heading="Attendance" subText="Tap to mark/unmark" />

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
                    id: nanoid(),
                    value: labNameHeading,
                    textProps: {
                      color: 'black.25',
                      fontSize: 'lg',
                      fontWeight: 'bold',
                    },
                  },
                  {
                    id: nanoid(),
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
                id: nanoid(),
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
                id="name"
                value={selectedStudentDetails.name}
                mb="7"
                rounded="12px"
                disabled
              />
              <FormLabel htmlFor="name" pl="1">
                System No
              </FormLabel>
              <Select
                id="systemNo"
                bg="gray.50"
                mb="7"
                rounded="12px"
                onChange={handleFormChange}
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
              <FormLabel>Attendance</FormLabel>
              <RadioGroup defaultValue="Present" mb="7" onChange={handleRadioInput}>
                <HStack spacing="24px">
                  <Radio value="Present">Present</Radio>
                  <Radio value="Absent">Absent</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <CustomButton
              innerText="Save"
              onClick={() => saveAttendance()}
              type="modal"
              disabled={false}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default authGuard(Attendance);
