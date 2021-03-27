import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

function LiquidityPriceBox({ selectedValue }) {
  return (
    <Box
      color="#fff"
      bg="#29235E"
      mt="10px"
      justifyContent="space-between"
      py={1}
      px={4}
      mx={4}
      rounded="2xl"
    >
      <Text fontSize="sm" color="gray.200" my={3}>
        Prices and pool share
      </Text>
      <Flex
        justifyContent="space-between"
        px={2}
        bg="background: rgba(41, 35, 94, 1);
"
      >
        <Box>
          <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
            497.209
          </Text>
          <Text fontSize="sm" color="gray.500" my={3}>
            RGP per {selectedValue.name}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
            0.00201078
          </Text>
          <Text fontSize="sm" color="gray.500" my={3}>
            ETH per DAI
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
            0%
          </Text>
          <Text fontSize="sm" color="gray.500" my={3}>
            Share of Pool
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default LiquidityPriceBox;
