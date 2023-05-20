/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import ElementCard from '@/components/elementCard';
import TopHeading from '@/components/topHeading';

const reports = () => {
  const requestList = [
    {
      id: '0',
      date: 'March 22, 2023',
      venue: 'Software Computing Lab',
      issue: '',
      status: 'Pending',
      systemNo: [51, 22],
    },
    {
      id: '1',
      date: 'March 22, 2023',
      venue: 'Programming Lab',
      issue: '',
      status: 'In Progress',
      systemNo: [12],
    },
    {
      id: '2',
      date: 'March 22, 2023',
      venue: 'Network Lab',
      issue: '',
      status: 'Resolved',
      systemNo: [10, 24, 51],
    },
  ];
  return (
    <>
      <TopHeading heading="Report System" subText="Reported system errors" />
      {requestList.map(({ id, venue, date, status }) => (
        <ElementCard
          onClick={() => {
            // openModal(key);
            // null;
          }}
          key={id}
          circleProps={{
            borderRadius: '12px',
            w: '90px',
            h: '30px',
            bg:
              status === 'Pending' ? 'red.50' : status === 'In Progress' ? 'green.50' : 'yellow.50',
          }}
          circleInnerText={status}
          properties={[
            {
              value: venue,
              textProps: {
                color: 'black.25',
                fontSize: 'md',
                fontWeight: 'bold',
              },
            },
            {
              value: date,
              textProps: {
                color: 'black.25',
                fontSize: '15',
                fontWeight: 'medium',
              },
            },
          ]}
        />
      ))}

      {/* <Modal
        isCentered
        size="xs"
        onClose={onCloseBookingModal}
        isOpen={isOpenBookingModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>Reservation Info</ModalHeader>
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
                {freeLabs.map(({ id, systemNo }) => (
                  <option key={id} value={systemNo}>
                    {systemNo}
                  </option>
                ))}
              </Select>
              <FormLabel as="legend">Attendance</FormLabel>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default reports;
