/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { Card, CardBody, Spacer, Text } from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import { BsBuildingAdd, BsFillJournalBookmarkFill, BsBuildingExclamation } from 'react-icons/bs';
import { LuClipboardEdit } from 'react-icons/lu';
import { GoReport } from 'react-icons/go';
import { LiaToolsSolid } from 'react-icons/lia';
import { IoFileTrayStackedOutline } from 'react-icons/io5';
import { CustomCardProps } from '@/types/CustomCard';

const CustomCard: FC<CustomCardProps> = ({
  cardProps,
  onClick,
  properties,
  iconComponent,
  iconName,
  iconHover,
}) => (
  <Card bg="gray.50" rounded="12px" shadow="none" mb="20px" onClick={onClick} {...cardProps}>
    <CardBody>
      {properties.map(({ id, value, textProps }) =>
        iconComponent === false ? (
          <Text key={id} {...textProps}>
            {value}
          </Text>
        ) : (
          <Fragment key={id}>
            {iconName === 'Book Venue' ? (
              <BsBuildingAdd size="25px" color={iconHover ? 'white' : 'black.50'} />
            ) : iconName === 'My Bookings' ? (
              <BsFillJournalBookmarkFill size="25px" color={iconHover ? 'white' : 'black.50'} />
            ) : iconName === 'Attendance' ? (
              <LuClipboardEdit size="25px" color={iconHover ? 'white' : 'black.50'} />
            ) : iconName === 'Reports' ? (
              <GoReport size="24px" color={iconHover ? 'white' : 'black.50'} />
            ) : iconName === 'Requests' ? (
              <BsBuildingExclamation size="26px" color={iconHover ? 'white' : 'black.50'} />
            ) : iconName === 'Report & Repair' ? (
              <LiaToolsSolid size="28px" color={iconHover ? 'white' : 'black.50'} />
            ) : iconName === 'Logs' ? (
              <IoFileTrayStackedOutline size="26px" color={iconHover ? 'white' : 'black.50'} />
            ) : (
              ''
            )}
            <Text {...textProps}>{value}</Text>
          </Fragment>
        )
      )}
      <Spacer />
    </CardBody>
  </Card>
);

export default CustomCard;
