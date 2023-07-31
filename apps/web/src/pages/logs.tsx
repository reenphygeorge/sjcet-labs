/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { ChangeEvent, useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { NextPage } from 'next';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import ReactSelect from '@/components/ReactSelect';
import { NumberOptions } from '@/types/ReactSelect';
import { LogPayLoad } from '@/types/Logs';
import { StudentAttendanceData } from '@/types/Attendance.d';
import ElementCard from '@/components/ElementCard';
import authGuard from '../../util/AuthGuard';

const Logs: NextPage = () => {
  const [logPayLoad, setLogPayLoad] = useState<LogPayLoad>({
    dateTime: '',
    systemNo: [],
  });

  const [logStep, setLogStep] = useState<number>(1);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLogPayLoad({ ...logPayLoad, [event.target.id]: event.target.value });
  };

  const handleSelectChange = (selectedOptions: NumberOptions[]) => {
    setLogPayLoad({ ...logPayLoad, systemNo: selectedOptions });
  };

  const fetchLog = () => {
    // console.log(logPayLoad);
    setLogStep(2);
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

  const studentList: StudentAttendanceData[] = [
    {
      id: 'S0',
      rollNo: '1',
      name: 'Abin K Jaimon',
      systemNo: 1,
      attendanceStatus: 'Present',
    },
    {
      id: 'S1',
      rollNo: '2',
      name: 'Aimil Bij',
      systemNo: 2,
      attendanceStatus: 'Absent',
    },
  ];

  return (
    <>
      <TopHeading heading="Logs" subText="Users Log" arrow />
      {logStep === 1 ? (
        <FormControl>
          <FormLabel htmlFor="name" pl="1">
            Date & Time
          </FormLabel>
          <Input
            bg="gray.50"
            id="dateTime"
            type="datetime-local"
            value={logPayLoad.dateTime}
            onChange={handleFormChange}
            mb="7"
            rounded="12px"
          />
          <FormLabel pl="1">System No</FormLabel>
          <ReactSelect
            options={systemNos}
            values={logPayLoad?.systemNo}
            disabled={false}
            onChange={handleSelectChange}
            placeHolder="All systems selected by default"
          />
          <CustomButton
            onClick={() => {
              fetchLog();
            }}
            innerText="Next"
            type="regular"
            disabled={false}
          />
        </FormControl>
      ) : (
        studentList.map(({ id, rollNo, name, systemNo, attendanceStatus }) => (
          <ElementCard
            onClick={() => {
              // openModal(key);
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
    </>
  );
};

export default authGuard(Logs);
