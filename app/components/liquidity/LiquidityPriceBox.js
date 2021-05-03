import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

function LiquidityPriceBox({
  toSelectedToken,
  fromValue,
  toValue,
  fromSelectedToken,
}) {
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
      <Text align="center" fontSize="lg" color="gray.200" mx={3}>
        PRICE POOL SHARE
      </Text>
      <Flex
        justifyContent="space-between"
        px={2}
        bg="background: rgba(41, 35, 94, 1);
"
      >
        <Box>
          <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
            {fromValue > 0 && toValue > 0
              ? (parseFloat(fromValue) / parseFloat(toValue)).toFixed(5)
              : 0.0}
          </Text>
          <Text fontSize="sm" color="gray.500" my={3}>
            {fromSelectedToken.symbol} per {toSelectedToken.symbol}
          </Text>
        </Box>
        <Box>
          {/* <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
            {fromValue > 0 && toValue > 0
              ? (parseFloat(toValue) / parseFloat(fromValue)).toFixed(5)
              : 0.0}
          </Text>
          <Text fontSize="sm" color="gray.500" my={3}>
            {toSelectedToken.symbol} per {fromSelectedToken.symbol}
          </Text> */}
          <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
            {fromValue > 0 && toValue > 0
              ? (parseFloat(toValue) / parseFloat(fromValue)).toFixed(5)
              : 0.0}
          </Text>
          <Text fontSize="sm" color="gray.500" my={3}>
            {toSelectedToken.symbol} per {fromSelectedToken.symbol}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
            {fromValue > 0 && toValue > 0
              ? ((parseFloat(fromValue) * 3) / 100).toFixed(4)
              : 0.0}
            %
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
