/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { ChangeEvent, useState } from 'react';
import { Box, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import TopHeading from './TopHeading';
import CustomButton from './CustomButton';
import { LoginData } from '@/types/LoginData';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { signIn } = useAuth();
  const toast = useToast();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const login = async () => {
    const error = await signIn(loginData.email, loginData.password);
    if (error) {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="red.50">
            Invalid Credentials
          </Box>
        ),
      });
    } else {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="green.50">
            Welcome!!
          </Box>
        ),
      });
    }
  };

  const handleLoginData = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };
  return (
    <Box pt={32}>
      <TopHeading heading="Welcome" subText="login to book" arrow={false} />

      <FormControl>
        <FormLabel htmlFor="email" pl="1">
          Email
        </FormLabel>
        <Input
          bg="gray.50"
          id="email"
          value={loginData.email}
          onChange={handleLoginData}
          mb="7"
          rounded="12px"
        />
        <FormLabel htmlFor="password" pl="1">
          Password
        </FormLabel>
        <Input
          bg="gray.50"
          id="password"
          type="password"
          value={loginData.password}
          onChange={handleLoginData}
          mb="7"
          rounded="12px"
        />
        <CustomButton innerText="login" onClick={() => login()} type="regular" disabled={false} />
      </FormControl>
    </Box>
  );
};

export default LoginPage;
