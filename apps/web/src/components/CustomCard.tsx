/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { Card, CardBody, Spacer, Text } from '@chakra-ui/react';
import { FC, Fragment, cloneElement } from 'react';
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
}) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'Book Venue': <BsBuildingAdd size="25px" />,
    'My Bookings': <BsFillJournalBookmarkFill size="25px" />,
    Attendance: <LuClipboardEdit size="25px" />,
    Reports: <GoReport size="24px" />,
    Requests: <BsBuildingExclamation size="26px" />,
    'Report & Repair': <LiaToolsSolid size="28px" />,
    Logs: <IoFileTrayStackedOutline size="26px" />,
  };

  const currentIcon = iconMap[iconName as string] || null;

  return (
    <Card bg="gray.50" rounded="12px" shadow="none" mb="20px" onClick={onClick} {...cardProps}>
      <CardBody>
        {properties.map(({ id, value, textProps }) =>
          iconComponent === false ? (
            <Text key={id} {...textProps}>
              {value}
            </Text>
          ) : (
            <Fragment key={id}>
              {currentIcon &&
                cloneElement(currentIcon, {
                  color: iconHover ? 'white' : 'black.50',
                })}
              <Text {...textProps}>{value}</Text>
            </Fragment>
          )
        )}
        <Spacer />
      </CardBody>
    </Card>
  );
};

export default CustomCard;
