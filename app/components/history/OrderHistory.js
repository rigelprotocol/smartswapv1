import { Box, Text, Flex } from '@chakra-ui/layout';
import React from 'react';
// import styles from '../../styles/history.css';

const OrderHistory = () => (
  <Flex p={3}>
    <div style={{ width: '100%' }}>
      <Box
        color="#fff"
        bg="#29235E"
        width="100%"
        justifyContent="space-between"
        px={4}
        py={2}
        rounded="2xl"
      >
        <Text color="rgba(255, 255, 255,0.25)" fontSize="12px" lineHeight="0">
          Operation
        </Text>
        <Flex>
          <Flex mr={4}>
            <img
              src="https://bscscan.com/token/images/rigelprotocol_32.png"
              width={20}
              height={15}
              alt="logo"
            />
            <Text fontSize="sm" color="#fff" ml={2}>
              20 RGP
            </Text>
          </Flex>
          <img src="/arrow-right.svg" width={15} height={15} alt="logo" />
          <Flex ml={4}>
            <img
              src="https://bscscan.com/token/images/binance_32.png"
              width={20}
              height={15}
              alt="logo"
            />
            <Text fontSize="sm" color="#fff" ml={2}>
              30 BNB
            </Text>
          </Flex>
        </Flex>

        <Flex justifyContent="space-between">
          <Box>
            <Text
              fontSize="12px"
              lineHeight="0"
              color="rgba(255, 255, 255,0.25)"
            >
              Type
            </Text>
            <Text color="#fff" fontSize="14px" fontWeight="regular">
              Manual
            </Text>
          </Box>
          <Box>
            <Text
              color="rgba(255, 255, 255,0.25)"
              fontSize="12px"
              lineHeight="0"
            >
              Type
            </Text>
            <Text color="#fff" fontSize="14px" fontWeight="regular">
              @ 0.004500
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="12px"
              lineHeight="0"
              color="rgba(255, 255, 255,0.25)"
            >
              &nbsp;
            </Text>
            <Text color="#fff" fontSize="14px" fontWeight="regular">
              18:22:16
            </Text>
          </Box>
        </Flex>
        <Box>
          <Text color="rgba(255, 255, 255,0.25)" fontSize="12px" lineHeight="0">
            Status
          </Text>
          <Text color="#68C18A" fontSize="14px" fontWeight="regular">
            Completed
          </Text>
        </Box>
      </Box>
    </div>
  </Flex>
);

export default OrderHistory;
