/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react';
import Select, { StylesConfig } from 'react-select';
import { ReactSelectProps } from '@/types/ReactSelect';

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#F0F2F5',
    borderRadius: '12px',
    marginBottom: '30px',
  }),
};

const ReactSelect: FC<ReactSelectProps> = ({
  options,
  values,
  disabled,
  onChange,
  placeHolder,
}) => {
  let updatedValues = values;
  if (values !== undefined && values !== null) {
    if (values.some((value) => value.periodNo !== undefined)) {
      updatedValues = values.map(({ periodNo, day }) => ({
        value: {
          periodNo,
          day,
        },
        label: `Period: ${periodNo}, ${day}`,
      }));
    }
    return (
      <Select
        options={options}
        value={updatedValues}
        styles={customStyles}
        isMulti
        isDisabled={disabled}
        onChange={onChange}
        placeholder={placeHolder !== undefined ? placeHolder : ''}
      />
    );
  }
  return null;
};

export default ReactSelect;
