/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { Text } from '@chakra-ui/react';
import Select, { StylesConfig } from 'react-select';
import { ReactSelectProps } from '@/types/reactSelect';

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#F0F2F5',
    borderRadius: '12px',
    marginBottom: '30px', // Set the desired background color
  }),
};

const ReactSelect = ({ options, values }: ReactSelectProps) => {
  if (values !== undefined && values !== null) {
    const updatedValues = values.map(({ timing, day }) => ({
      value: {
        timing,
        day,
      },
      label: `${day} ${timing}`,
    }));
    return (
      <Select options={options} value={updatedValues} styles={customStyles} isMulti isDisabled />
    );
  }
  return <Text>Blah</Text>;
};

export default ReactSelect;
