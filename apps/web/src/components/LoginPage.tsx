/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { ChangeEvent, useState } from 'react';
import { Box, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import TopHeading from './TopHeading';
import CustomButton from './CustomButton';
import supabase from '../config/supabase.config';
import { LoginData } from '@/types/LoginData';

const LoginPage = () => {
  const toast = useToast();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      if (error) {
        toast({
          position: 'bottom',
          render: () => (
            <Box color="white" p={3} rounded="12px" bg="red.50">
              Invalid Credentials
            </Box>
          ),
        });
      }
    } catch (error) {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="red.50">
            Unexpected Error
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
        <CustomButton innerText="login" onClick={() => signIn()} type="regular" disabled={false} />
      </FormControl>
    </Box>
  );
};

export default LoginPage;
