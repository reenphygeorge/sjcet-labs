/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
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

const ReactSelect = ({ options, values, disabled }: ReactSelectProps) => {
  if (values !== undefined && values !== null) {
    const updatedValues = values.map(({ timing, day }) => ({
      value: {
        timing,
        day,
      },
      label: `${day} ${timing}`,
    }));
    return (
      <Select
        options={options}
        value={updatedValues}
        styles={customStyles}
        isMulti
        isDisabled={disabled}
        // onChange={() => (onChange !== null ? () : null)}
      />
    );
  }
  return null;
};

export default ReactSelect;
