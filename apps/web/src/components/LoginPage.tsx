/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { ChangeEvent, useState } from 'react';
import { Box, FormControl, FormLabel, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { AuthError } from '@supabase/supabase-js';
import CustomButton from './CustomButton';
import { LoginData, ResetPasswordResult } from '@/types/LoginData';
import { useAuth } from '@/context/AuthContext';
import supabase from '@/config/supabase.config';

const LoginPage = () => {
  const { signIn } = useAuth();
  const toast = useToast();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const [resetPasswordResult, setResetPasswordResult] = useState<ResetPasswordResult>();

  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    const error = await signIn(loginData.email, loginData.password);
    setLoading(false);
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
          <Box color="white" p={3} rounded="12px" bg="green.300">
            Welcome!!
          </Box>
        ),
      });
    }
  };

  const passwordReset = async () => {
    setLoading(true);
    const resetResult = await supabase.auth.resetPasswordForEmail(loginData.email, {
      redirectTo: 'http://localhost:3000/profile',
    });
    setLoading(false);
    setResetPasswordResult(resetResult);

    if (resetPasswordResult?.error instanceof AuthError) {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="red.50">
            Please wait for 60sec
          </Box>
        ),
      });
    } else if (resetPasswordResult?.error !== null) {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="red.50">
            Server Error. Please try again
          </Box>
        ),
      });
    } else if (resetPasswordResult?.error === null) {
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} rounded="12px" bg="green.50">
            Please check your registered email
          </Box>
        ),
      });
    }
  };

  const handleLoginData = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };
  return (
    <Box p={2}>
      <Box mt="20px" mb="30px">
        <Text fontSize="5xl" fontWeight="black" color="black.50">
          Welcome
          <br />
        </Text>
        <Text fontSize="xl" ml="2.5" fontWeight="medium" color="gray.75" mr="1">
          To SJCET Labs
        </Text>
      </Box>

      <FormControl pt={28}>
        {forgotPassword === false ? (
          <>
            <FormLabel htmlFor="email" pl="1">
              Email
            </FormLabel>
            <Input
              bg="gray.50"
              id="email"
              value={loginData.email}
              onChange={handleLoginData}
              placeholder="john.doe@sjcetpalai.ac.in"
              h={14}
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
              h={14}
              value={loginData.password}
              onChange={handleLoginData}
              rounded="12px"
              mb={2}
            />
            <Text
              fontWeight="semibold"
              fontSize="sm"
              color="black.25"
              pr={1}
              mb={7}
              textAlign="end"
              onClick={() => setForgotPassword(true)}
              cursor="pointer"
            >
              Forgot Password ?
            </Text>
            <CustomButton
              innerText="Log in"
              onClick={() => login()}
              type="login"
              disabled={false}
              isLoading={isLoading}
            />
            <HStack justify="center">
              <Text fontWeight="medium" fontSize="sm" color="black.25">
                Don&apos;t have an account?
              </Text>
              <Text fontWeight="semibold" fontSize="sm" color="black.25">
                Contact Admin
              </Text>
            </HStack>
          </>
        ) : (
          <>
            <FormLabel htmlFor="email" pl="1">
              Email
            </FormLabel>
            <Input
              bg="gray.50"
              id="email"
              value={loginData.email}
              onChange={handleLoginData}
              placeholder="john.doe@sjcetpalai.ac.in"
              h={14}
              mb="7"
              rounded="12px"
            />
            <CustomButton
              innerText="Send Email"
              onClick={() => passwordReset()}
              type="login"
              disabled={false}
              isLoading={isLoading}
            />
            <HStack justify="center">
              <Text fontWeight="medium" fontSize="sm" color="black.25">
                Already have an account?
              </Text>
              <Text
                fontWeight="semibold"
                fontSize="sm"
                color="black.25"
                cursor="pointer"
                onClick={() => setForgotPassword(false)}
              >
                Log In
              </Text>
            </HStack>
          </>
        )}
      </FormControl>
    </Box>
  );
};

export default LoginPage;
