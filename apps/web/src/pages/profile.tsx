/* eslint-disable import/extensions */
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { Repeat } from 'react-feather';
import { NextPage } from 'next';
import CustomButton from '@/components/CustomButton';
import { Department, Gender, ProfileData, Role } from '@/types/Profile.d';
import { useAuth } from '@/context/AuthContext';
import authGuard from '../../util/AuthGuard';

const Profile: NextPage = () => {
  const { signOut } = useAuth();
  const departments: Department[] = [
    { id: 'D0', name: 'Computer Sci & Engg' },
    { id: 'D1', name: 'Artificial Inteligence & Data Sci' },
    { id: 'D2', name: 'Electrical & Electronics Engg' },
  ];

  const [editMode, setEditMode] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    collegeID: '05CS007',
    name: 'Kishore Sebastian',
    department: 'Computer Sci & Engg',
    email: 'kishoresebastian@sjcetpalai.ac.in',
    phone: '+919012345678',
    gender: Gender.Male,
    role: Role.Teacher,
    labInCharge: true,
  });

  const saveProfile = () => {
    setEditMode(!editMode);
    // console.log(profileData);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [event.target.id]: event.target.value });
  };

  const toast = useToast();
  const switchAccount = () => {
    const role: Role = profileData.role === Role.Administrator ? Role.Teacher : Role.Administrator;
    setProfileData({
      ...profileData,
      role,
    });
    toast({
      position: 'top',
      render: () => (
        <Box color="white" p={3} rounded="12px" bg="purple.25">
          Switched to {role}!
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
    <VStack pb="40" mx="5">
      <Text fontSize="2xl" fontWeight="semibold" color="black.50">
        My Profile
      </Text>
      <Image
        borderRadius="full"
        boxSize="150px"
        src={
          profileData.gender === Gender.Male
            ? 'https://res.cloudinary.com/rxg/image/upload/v1685267888/lab-management/male-dp_luab55.png'
            : 'https://res.cloudinary.com/rxg/image/upload/v1685267888/lab-management/female-dp_cxjjle.png'
        }
        alt="profile-pic"
      />
      {profileData.labInCharge === true ? (
        <IconButton
          onClick={() => switchAccount()}
          aria-label="Switch-Account"
          position="absolute"
          right="16"
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
          value={profileData.collegeID}
          onChange={handleFormChange}
          mb="7"
          rounded="12px"
        />
        <FormLabel htmlFor="name" pl="1">
          Name
        </FormLabel>
        <Input
          bg="gray.50"
          id="name"
          value={profileData.name}
          onChange={handleFormChange}
          mb="7"
          rounded="12px"
        />
        <FormLabel htmlFor="name" pl="1">
          Department
        </FormLabel>
        <Select
          id="department"
          bg="gray.50"
          mb="7"
          rounded="12px"
          value={profileData.department}
          onChange={handleFormChange}
        >
          {departments.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </Select>
        <FormLabel htmlFor="name" pl="1">
          Email
        </FormLabel>
        <Input
          bg="gray.50"
          id="email"
          value={profileData.email}
          onChange={handleFormChange}
          mb="7"
          rounded="12px"
        />
        <FormLabel htmlFor="name" pl="1">
          Phone
        </FormLabel>
        <Input
          bg="gray.50"
          id="phone"
          value={profileData.phone}
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
