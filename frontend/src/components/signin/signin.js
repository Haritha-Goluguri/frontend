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
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const nav=useNavigate();
  const validateEmail = (email) => {
    // Basic email validation regex
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

    if (isValid) {
      // Handle successful sign-in logic here
      console.log('Form submitted');
    }
    await axios.post(api+"/signin",{email,password})
        .then((res)=>{
            if(res.data.message){
                console.log(res?.data?.values)
                alert("login sucessfully")
                // nav('/home')
                window.location.href="/home"
            } else {
                alert("user not found")
                window.location.href="/signup"
            }
        })
        .catch((e)=>console.log(e))

  }

  return (
    <Box bg="gray.50" p={8} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card width="400px" boxShadow="xl" borderRadius="lg">
        <CardBody>
          <Stack spacing={4}>
            <Heading size="lg" textAlign="center">SIGN IN</Heading>
            
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

            <Button 
              colorScheme="teal" 
              size="lg" 
               onClick={handleSubmit}
              mt={4}
              // onClick={Signin} 
            >
              
              Sign In
            </Button>
            <Button 
              variant="link" 
              colorScheme="teal" 
              onClick={() => window.location.href = '/forgotpassword'}
>
  Forgot Password?
</Button>

          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};
