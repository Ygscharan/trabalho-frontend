import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Heading, Image, Text, Center } from '@chakra-ui/react';

const Details = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [apiUrl]);

  return (
    <Center height="100vh">
      {pokemon ? (
        <Box
          p={8}
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg"
          maxWidth="600px"
          width="100%"
          textAlign="center"
          backgroundColor="#ffffa0"
        >
          <Heading as="h2" size="lg" mb={6}>{pokemon.name}</Heading>
          <Center>
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} mb={6} boxSize="150px" />
          </Center>
          <Text fontWeight="bold" fontSize="lg" mb={4}>Altura: {pokemon.height}</Text>
          <Text fontWeight="bold" fontSize="lg" mb={4}>Peso: {pokemon.weight}</Text>
          <Text fontWeight="bold" fontSize="lg" mb={4}>Tipos: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</Text>
          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <Text fontWeight="bold" fontSize="lg" mb={4}>Habilidade Principal: {pokemon.abilities[0].ability.name}</Text>
          )}
          {pokemon.species && pokemon.species.name && (
            <Text fontWeight="bold" fontSize="lg" mb={4}>Espécie: {pokemon.species.name}</Text>
          )}
        </Box>
      ) : (
        <Text>Carregando...</Text>
      )}
    </Center>
  );
};

export default Details;
