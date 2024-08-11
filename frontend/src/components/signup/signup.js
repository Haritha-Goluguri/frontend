import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  Box,
  Text
} from '@chakra-ui/react';
import { api } from '../actions/api';
import axios from 'axios';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async() => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      console.log('Form submitted');
    }
    await axios.post(api + "/signup", { email, password })
    .then((res) => {
      if (res.data.message) {
        console.log(res?.data?.values);
        alert("Signup successful");
        window.location.href = "/signin";
      } else {
        alert("Signup failed, please try again");
      }
    })
    .catch((e) => console.log(e));
  };


  return (
    <Box bg="gray.50" p={8} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card width="400px" boxShadow="xl" borderRadius="lg">
        <CardBody>
          <Stack spacing={4}>
            <Heading size="lg" textAlign="center">SIGN UP</Heading>

            <FormControl isInvalid={!!emailError}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>We'll never share your email.</FormHelperText>
              ) : (
                <FormErrorMessage>{emailError}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!passwordError}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!passwordError ? (
                <FormHelperText>We'll never share your password.</FormHelperText>
              ) : (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!confirmPasswordError}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!confirmPasswordError ? (
                <FormHelperText>Please confirm your password.</FormHelperText>
              ) : (
                <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
              )}
            </FormControl>

            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleSubmit}
              mt={4}
            >
              
              Sign Up
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};
