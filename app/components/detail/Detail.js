import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import styles from '../../styles/details.css';
import ReadMore from './ReadMore';

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
            <Text fontSize="14px" color="white" textTransform="uppercase">
              {swapInputToken.t_supply} {swapInputToken.symbol}
            </Text>
          </Flex>
          <Flex w="65%" justifyContent="space-between" mb={2}>
            <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
              Circulating supply:
            </Text>
            <Text fontSize="14px" color="white" textTransform="uppercase">
              {swapInputToken.C_supply} {swapInputToken.symbol}
            </Text>
          </Flex>
          <Flex flexDirection="column" mb={2}>
            <Text fontSize="14px" color="rgba(255, 255, 255,0.25)" mb={0}>
              Description:
            </Text>
            {swapInputToken.details !== undefined && (
              <ReadMore>{swapInputToken.details}</ReadMore>
            )}
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
              <Text fontSize="14px" color="white" textTransform="uppercase">
                {swapOutputToken.t_supply} {swapOutputToken.symbol}
              </Text>
            </Flex>
            <Flex w="65%" justifyContent="space-between" mb={2}>
              <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
                Circulating supply:
              </Text>
              <Text fontSize="14px" color="white" textTransform="uppercase">
                {swapOutputToken.C_supply} {swapOutputToken.symbol}
              </Text>
            </Flex>
            <Flex flexDirection="column" mb={2}>
              <Text fontSize="14px" color="rgba(255, 255, 255,0.25)" mb={0}>
                Description:
              </Text>
              {swapOutputToken.details !== undefined && (
                <ReadMore>{swapOutputToken.details}</ReadMore>
              )}
            </Flex>
          </Box>
        </Box>
      </>
    )}
  </>
);

export default Detail;
