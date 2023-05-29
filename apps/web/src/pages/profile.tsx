/* eslint-disable import/extensions */
import { FormControl, FormLabel, Image, Input, Select, Text, VStack } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Department, Gender, ProfileData, Role } from '@/types/Profile.d';

const Profile: FC = () => {
  const departments: Department[] = [
    { id: 'D0', name: 'Computer Sci & Engg' },
    { id: 'D1', name: 'Artificial Inteligence & Data Sci' },
    { id: 'D2', name: 'Electrical & Electronics Engg' },
  ];
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    collegeID: '05CS007',
    name: 'Kishore Sebastian',
    department: 'Artificial Inteligence & Data Sci',
    email: 'kishoresebastian@sjcetpalai.ac.in',
    phone: '+919012345678',
    gender: Gender.Male,
    role: Role.Teacher,
    dualMode: false,
  });
  const saveProfile = () => {
    setEditMode(!editMode);
    // console.log(profileData);
  };
  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [event.target.id]: event.target.value });
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
        <CustomButton
          innerText={editMode ? 'Save' : 'Edit'}
          onClick={() => (editMode ? saveProfile() : setEditMode(!editMode))}
          type="regular"
          disabled={false}
        />
      </FormControl>
    </VStack>
  );
};

export default Profile;