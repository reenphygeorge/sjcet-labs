/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
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
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { nanoid } from 'nanoid';
import TopHeading from '@/components/TopHeading';
import CustomButton from '@/components/CustomButton';
import ReactSelect from '@/components/ReactSelect';
import { Data, NewTodoData, Priority, ResolveInfo, Type } from '@/types/Todo.d';
import { NumberOptions } from '@/types/ReactSelect';
import todoList from '../../util/todoList';
import CustomCard from '@/components/CustomCard';

const Todo: FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Data>({
    id: '',
    date: '',
    timing: '',
    issue: '',
    venue: '',
    staffName: '',
    systemNo: [],
    type: Type.Task,
    priority: Priority.Moderate,
  });

  const [newTodoData, setNewTodoData] = useState<NewTodoData>({
    systemNo: [],
    issue: '',
    priority: Priority.Moderate,
  });

  const [resolveInfo, setResolveInfo] = useState<ResolveInfo>({
    comment: '',
  });

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setResolveInfo({ ...resolveInfo, [event.target.id]: event.target.value });
  };

  const handleSelectChange = (selectedOptions: NumberOptions[]) => {
    setNewTodoData({ ...newTodoData, systemNo: selectedOptions });
  };

  const handleRadioInput = (value: string) => {
    const priority =
      value === 'Moderate' ? Priority.Moderate : value === 'Low' ? Priority.Low : Priority.High;
    setNewTodoData({
      ...newTodoData,
      priority,
    });
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewTodoData({ ...newTodoData, [event.target.id]: event.target.value });
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

  const {
    isOpen: isOpenNewReportModal,
    onOpen: onOpenNewReportModal,
    onClose: onCloseNewReportModal,
  } = useDisclosure();

  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();

  const openTodoModal = (key: number) => {
    setSelectedTodo(todoList[key]);
    onOpenReportModal();
  };

  const resolve = () => {
    // console.log(resolveInfo);
  };

  const saveNewTodo = () => {
    // console.log(newTodoData);
  };

  return (
    <>
      <TopHeading heading="Todo List" subText="Add/View tasks" />
      {todoList.map(({ id, date, type }, key) => (
        <CustomCard
          onClick={() => {
            openTodoModal(key);
          }}
          circleComponent={false}
          key={id}
          properties={[
            {
              id: nanoid(),
              value: type,
              textProps: {
                color: 'black.25',
                fontSize: 'md',
                fontWeight: 'bold',
              },
            },
            {
              id: nanoid(),
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
      <CustomButton
        onClick={() => {
          onOpenNewReportModal();
        }}
        innerText="Add Task"
        type="regular"
        disabled={false}
      />

      <Modal
        isCentered
        size="xs"
        onClose={onCloseReportModal}
        isOpen={isOpenReportModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>Task Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mb={4}>
              <Text fontSize="md" fontWeight="semibold">
                System No:
              </Text>
              {selectedTodo.systemNo.map((number) => (
                <Tag fontSize="md" id={number.toString()} variant="solid" fontWeight="semibold">
                  {`# ${number}`}
                </Tag>
              ))}
            </HStack>
            {selectedTodo.staffName !== undefined && selectedTodo.venue !== undefined ? (
              <>
                <Text fontSize="md" mb={4} fontWeight="semibold">
                  {`Venue: ${selectedTodo.venue}`}
                </Text>
                <Text fontSize="md" mb={4} fontWeight="semibold">
                  {`Staff: ${selectedTodo.staffName}`}
                </Text>
              </>
            ) : (
              ''
            )}
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Reported On: ${selectedTodo.date}`}
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Timing: ${selectedTodo.timing}`}
            </Text>
            <Text fontSize="md" mb={4} fontWeight="semibold">
              {`Issue: ${selectedTodo.issue}`}
            </Text>
            <FormControl>
              <FormLabel htmlFor="comment">Comment on issue</FormLabel>
              <Input
                bg="gray.50"
                id="comment"
                value={resolveInfo.comment}
                onChange={handleCommentChange}
                mb="7"
                rounded="12px"
              />
              <CustomButton
                onClick={() => {
                  resolve();
                }}
                innerText="Resolve"
                type="modal"
                disabled={false}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        size="xs"
        onClose={onCloseNewReportModal}
        isOpen={isOpenNewReportModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
        <ModalContent>
          <ModalHeader>New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel pl="1">System No</FormLabel>
              <ReactSelect
                options={systemNos}
                values={newTodoData.systemNo}
                disabled={false}
                onChange={handleSelectChange}
              />
              <FormLabel pl="1">Describe the issue</FormLabel>
              <Input bg="gray.50" id="issue" mb="7" rounded="12px" onChange={handleFormChange} />
              <FormLabel>Attendance</FormLabel>
              <RadioGroup defaultValue="Moderate" id="priority" mb="7" onChange={handleRadioInput}>
                <HStack spacing="24px">
                  <Radio value="High">High</Radio>
                  <Radio value="Moderate">Moderate</Radio>
                  <Radio value="Low">Low</Radio>
                </HStack>
              </RadioGroup>
              <CustomButton
                onClick={() => {
                  saveNewTodo();
                }}
                innerText="Save"
                type="regular"
                disabled={false}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Todo;
