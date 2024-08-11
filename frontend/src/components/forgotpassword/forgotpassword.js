// import React, { useState } from 'react';
// import {
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   FormHelperText,
//   Input,
//   Button,
//   Card,
//   CardBody,
//   Stack,
//   Heading,
//   Box,
//   Text
// } from '@chakra-ui/react';
// import { api } from '../actions/api';
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// export const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleSubmit = async () => {
//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address');
//     } else {
//       setEmailError('');

//       try {
//         const response = await axios.post(api + '/forgotpassword', { email });

//         if (response.data.success) {
//           setSuccessMessage('A password reset link has been sent to your email.');
          
//         } else {
//           setEmailError('Email not found.');
//         }
//       } catch (error) {
//         console.error(error);
//         setEmailError('An error occurred. Please try again later.');
//       }
//     }
//   };

//   return (
//     <Box bg="gray.50" p={8} minH="100vh" display="flex" alignItems="center" justifyContent="center">
//       <Card width="400px" boxShadow="xl" borderRadius="lg">
//         <CardBody>
//           <Stack spacing={4}>
//             <Heading size="lg" textAlign="center">Forgot Password</Heading>
            
//             <FormControl isInvalid={!!emailError}>
//               <FormLabel>Email address</FormLabel>
//               <Input 
//                 type="email" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {!emailError ? (
//                 <FormHelperText>Enter the email associated with your account.</FormHelperText>
//               ) : (
//                 <FormErrorMessage>{emailError}</FormErrorMessage>
//               )}
//             </FormControl>

//             {successMessage && (
//               <Text color="green.500" textAlign="center">{successMessage}</Text>
//             )}

//             <Button 
//               colorScheme="teal" 
//               size="lg" 
//               onClick={handleSubmit}
//               mt={4}
//             >
//               Reset Password
//             </Button>

//             <Button 
//               colorScheme="gray" 
//               size="lg" 
//               variant="link" 
//               mt={4}
//               onClick={() => window.location.href = '/signin'}
//             >
//               Back to Sign In
//             </Button>
//           </Stack>
//         </CardBody>
//       </Card>
//     </Box>
//   );
// };
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

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleForgotPasswordSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      try {
        const response = await axios.post(api + '/forgotpassword', { email });
        if (response.data.success) {
          setSuccessMessage('A password reset link has been sent to your email.');
        } else {
          setEmailError('Email not found.');
        }
      } catch (error) {
        console.error(error);
        setEmailError('An error occurred. Please try again later.');
      }
    }
  };

  const handleResetPasswordSubmit = async () => {
    if (!newPassword) {
      setResetPasswordError('Please enter a new password');
    } else {
      setResetPasswordError('');
      try {
        const response = await axios.post(api + '/resetpassword', { resetToken, newPassword });
        if (response.data.success) {
          setResetSuccessMessage('Your password has been successfully reset.');
        } else {
          setResetPasswordError('Failed to reset password. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setResetPasswordError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Box bg="gray.50" p={8} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card width="400px" boxShadow="xl" borderRadius="lg">
        <CardBody>
          <Stack spacing={4}>
            <Heading size="lg" textAlign="center">{isResetMode ? 'Reset Password' : 'Forgot Password'}</Heading>

            {!isResetMode ? (
              <>
                <FormControl isInvalid={!!emailError}>
                  <FormLabel>Email address</FormLabel>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!emailError ? (
                    <FormHelperText>Enter the email associated with your account.</FormHelperText>
                  ) : (
                    <FormErrorMessage>{emailError}</FormErrorMessage>
                  )}
                </FormControl>

                {successMessage && (
                  <Text color="green.500" textAlign="center">{successMessage}</Text>
                )}

                <Button 
                  colorScheme="teal" 
                  size="lg" 
                  onClick={handleForgotPasswordSubmit}
                  mt={4}
                >
                  Send Reset Link
                </Button>
              </>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Reset Token</FormLabel>
                  <Input 
                    type="text" 
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                  />
                </FormControl>

                <FormControl isInvalid={!!resetPasswordError}>
                  <FormLabel>New Password</FormLabel>
                  <Input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {!resetPasswordError ? (
                    <FormHelperText>Enter your new password.</FormHelperText>
                  ) : (
                    <FormErrorMessage>{resetPasswordError}</FormErrorMessage>
                  )}
                </FormControl>

                {resetSuccessMessage && (
                  <Text color="green.500" textAlign="center">{resetSuccessMessage}</Text>
                )}

                <Button 
                  colorScheme="teal" 
                  size="lg" 
                  onClick={handleResetPasswordSubmit}
                  mt={4}
                >
                  Reset Password
                </Button>
              </>
            )}

            <Button 
              colorScheme="gray" 
              size="lg" 
              variant="link" 
              mt={4}
              onClick={() => setIsResetMode(!isResetMode)}
            >
              {isResetMode ? 'Back to Forgot Password' : 'I have a reset token'}
            </Button>

            <Button 
              colorScheme="gray" 
              size="lg" 
              variant="link" 
              mt={4}
              onClick={() => window.location.href = '/signin'}
            >
              Back to Sign In
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};
