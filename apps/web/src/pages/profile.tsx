/* eslint-disable import/extensions */
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useContext, useState } from 'react';
import { Repeat } from 'react-feather';
import { NextPage } from 'next';
import CustomButton from '@/components/CustomButton';
import { useAuth } from '@/context/AuthContext';
import authGuard from '../../util/AuthGuard';
import { UserContext } from '@/context/UserContext';
import { patchUser } from '@/hooks/api/user';

const Profile: NextPage = () => {
  const { signOut } = useAuth();
  const userContext = useContext(UserContext);

  const [editMode, setEditMode] = useState<boolean>(false);

  const saveProfile = () => {
    setEditMode(!editMode);

    patchUser({
      id: userContext?.userData.id,
      registerNumber: userContext?.userData.registerNumber,
      name: userContext?.userData.name,
      email: userContext?.userData.email,
      phoneNumber: userContext?.userData.phoneNumber,
    });
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    userContext?.setUserData({ ...userContext?.userData, [event.target.id]: event.target.value });
  };

  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
  // const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');

  const toast = useToast();
  const switchAccount = () => {
    const labAdmin: boolean = !userContext?.userData.labAdmin;
    userContext?.setUserData({
      ...userContext?.userData,
      labAdmin,
    });

    toast({
      position: 'top',
      render: () => (
        <Box
          color="white"
          p={3}
          rounded="12px"
          bg="purple.25"
          onClick={() => {
            userContext?.setUserData({ ...userContext?.userData, labAdmin });
          }}
        >
          Switched to {labAdmin ? 'Administrator' : 'Teacher'}!
        </Box>
      ),
    });
  };

  const logout = () => {
    signOut();
    toast({
      position: 'bottom',
      render: () => (
        <Box color="white" p={3} rounded="12px" bg="purple.25">
          Adios!
        </Box>
      ),
    });
  };

  return (
    <VStack mx="5">
      <Text fontSize="2xl" fontWeight="semibold" color="black.50">
        My Profile
      </Text>
      <Image
        borderRadius="full"
        boxSize="150px"
        src={
          userContext?.userData.gender === 'Male'
            ? 'https://res.cloudinary.com/rxg/image/upload/v1685267888/lab-management/male-dp_luab55.png'
            : 'https://res.cloudinary.com/rxg/image/upload/v1685267888/lab-management/female-dp_cxjjle.png'
        }
        alt="profile-pic"
      />
      {userContext?.userData.labIncharge === true ? (
        <IconButton
          onClick={() => switchAccount()}
          aria-label="Switch-Account"
          position="absolute"
          right={isLargerThan1000 ? '96' : '16'}
          top="40"
          rounded="100%"
          icon={<Repeat width="18px" />}
        />
      ) : (
        ''
      )}
      <FormControl isDisabled={!editMode}>
        <FormLabel htmlFor="name" pl="1">
          College ID
        </FormLabel>
        <Input
          bg="gray.50"
          id="collegeID"
          value={userContext?.userData.registerNumber}
          onChange={handleFormChange}
          mb="7"
          rounded="12px"
          disabled
        />
        <FormLabel htmlFor="name" pl="1">
          Name
        </FormLabel>
        <Input
          bg="gray.50"
          id="name"
          value={userContext?.userData.name}
          onChange={handleFormChange}
          mb="7"
          rounded="12px"
        />
        <FormLabel htmlFor="name" pl="1">
          Email
        </FormLabel>
        <Input
          bg="gray.50"
          id="email"
          value={userContext?.userData.email}
          onChange={handleFormChange}
          mb="7"
          rounded="12px"
        />
        <FormLabel htmlFor="name" pl="1">
          Phone
        </FormLabel>
        <Input
          bg="gray.50"
          id="phoneNumber"
          value={userContext?.userData.phoneNumber}
          onChange={handleFormChange}
          mb="7"
          rounded="12px"
        />
        <HStack justify="center">
          <CustomButton
            innerText={editMode ? 'Save' : 'Edit'}
            onClick={() => (editMode ? saveProfile() : setEditMode(!editMode))}
            type="mini"
            disabled={false}
          />
          <CustomButton innerText="Logout" onClick={logout} type="mini" disabled={false} />
        </HStack>
      </FormControl>
    </VStack>
  );
};

export default authGuard(Profile);
