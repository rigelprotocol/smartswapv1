import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import styles from '../../styles/details.css';

const Detail = ({ swapOutputToken, swapInputToken }) => (
  <>
    {swapInputToken !== undefined && (
      <Box className={styles.details__container}>
        <Box p={3}>
          <Flex w="65%" justifyContent="space-between" mb={2}>
            <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
              Token name:
            </Text>
            <Text fontSize="14px" color="white">
              {swapInputToken.name}
            </Text>
          </Flex>
          <Flex w="65%" justifyContent="space-between" mb={2}>
            <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
              Total supply:
            </Text>
            <Text fontSize="14px" color="white">
              {swapInputToken.t_supply} {swapInputToken.symbol}
            </Text>
          </Flex>
          <Flex w="65%" justifyContent="space-between" mb={2}>
            <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
              Circulating supply:
            </Text>
            <Text fontSize="14px" color="white">
              {swapInputToken.C_supply} {swapInputToken.symbol}
            </Text>
          </Flex>
          <Flex flexDirection="column" mb={2}>
            <Text fontSize="14px" color="rgba(255, 255, 255,0.25)" mb={0}>
              Description:
            </Text>
            <Text fontSize="14px" color="white" lineHeight={6}>
              {swapInputToken.details}
            </Text>
          </Flex>
        </Box>
      </Box>
    )}
    {swapOutputToken !== undefined && (
      <>
        <hr style={{ height: '1px', background: '#b3d4fc', border: 'none' }} />
        <Box className={styles.details__container}>
          <Box p={3}>
            <Flex w="65%" justifyContent="space-between" mb={2}>
              <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
                Token name:
              </Text>
              <Text fontSize="14px" color="white">
                {swapOutputToken.name}
              </Text>
            </Flex>
            <Flex w="65%" justifyContent="space-between" mb={2}>
              <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
                Total supply:
              </Text>
              <Text fontSize="14px" color="white">
                {swapOutputToken.t_supply} {swapOutputToken.symbol}
              </Text>
            </Flex>
            <Flex w="65%" justifyContent="space-between" mb={2}>
              <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
                Circulating supply:
              </Text>
              <Text fontSize="14px" color="white">
                {swapOutputToken.C_supply} {swapOutputToken.symbol}
              </Text>
            </Flex>
            <Flex flexDirection="column" mb={2}>
              <Text fontSize="14px" color="rgba(255, 255, 255,0.25)" mb={0}>
                Description:
              </Text>
              <Text fontSize="14px" color="white" lineHeight={6}>
                {swapOutputToken.details}
              </Text>
            </Flex>
          </Box>
        </Box>
      </>
    )}
  </>
);

export default Detail;
