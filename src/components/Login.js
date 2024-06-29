import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Center,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isFormValid = email && password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/list');
    }
  };

  return (
    <Center height="100vh">
      <Box
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        width="100%"
        maxWidth="400px"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%" disabled={!isFormValid}>
            Acessar
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
