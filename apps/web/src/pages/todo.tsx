/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, HStack } from '@chakra-ui/react';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';

const Todo: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <TopHeading heading="Logs" subText="Users Log" />
      <FormControl>
        <HStack>
          <DatePicker
            showTwoColumnMonthYearPicker
            selected={selectedDate}
            dateFormat="dd-MM-yyyy"
            onChange={handleDateChange}
            // style={datePickerStyles}
          />
          <CustomButton
            onClick={() => {
              //   resolve();
            }}
            innerText="Filter"
            type="mini"
            disabled={false}
          />
        </HStack>
      </FormControl>
    </>
  );
};

export default Todo;
