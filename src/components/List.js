import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Flex, Box, Heading, Image, Text, Button, Center, Card, CardBody } from '@chakra-ui/react';

const List = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchPokemons = async () => {
      const offset = (currentPage - 1) * limit;
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemonResults = response.data.results;

        const detailedPokemons = await Promise.all(
          pokemonResults.map(async (pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return {
              name: pokemonDetail.data.name,
              image: pokemonDetail.data.sprites.front_default,
              height: pokemonDetail.data.height,
              weight: pokemonDetail.data.weight,
              types: pokemonDetail.data.types.map(type => type.type.name),
            };
          })
        );

        setPokemons(detailedPokemons);
        setTotalPages(Math.ceil(response.data.count / limit));
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>Lista de Pokémon</Heading>
      <Flex flexWrap="wrap" justifyContent="center" gap={4}>
        {pokemons.map((pokemon, index) => (
          <Card
            key={index}
            className={`list-item ${pokemon.types[0]}`}
            p={4}
            width="16.66%"
            textAlign="center"
            boxShadow="md"
            backgroundColor="#ffffa0"
          >
            <Link to={`/details/${pokemon.name}`}>
              <Center>
                <Image src={pokemon.image} alt={pokemon.name} maxW="100%" mb={4} />
              </Center>
              <CardBody>
                <Text fontWeight="bold" fontSize="lg" mb={2} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                  Nome: {pokemon.name}
                </Text>
                <Text>Altura: {pokemon.height}</Text>
                <Text>Peso: {pokemon.weight}</Text>
              </CardBody>
            </Link>
          </Card>
        ))}
      </Flex>
      <Center mt={4}>
        <Button mr={2} onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <Text>{currentPage} de {totalPages}</Text>
        <Button ml={2} onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próximo
        </Button>
      </Center>
    </Box>
  );
};

export default List;
