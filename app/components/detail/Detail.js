import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import styles from '../../styles/details.css';

const Detail = () => (
  <Box className={styles.details__container}>
    <Box p={3}>
      <Flex w="65%" justifyContent="space-between" mb={2}>
        <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
          Token name:
        </Text>
        <Text fontSize="14px" color="white">
          Rigel Protocol
        </Text>
      </Flex>
      <Flex w="65%" justifyContent="space-between" mb={2}>
        <Text fontSize="14px" color="rgba(255, 255, 255,0.25)">
          Circulating supply:
        </Text>
        <Text fontSize="14px" color="white">
          625,000 RGP
        </Text>
      </Flex>
      <Flex flexDirection="column" mb={2}>
        <Text fontSize="14px" color="rgba(255, 255, 255,0.25)" mb={0}>
          Description:
        </Text>
        <Text fontSize="14px" color="white" lineHeight={6}>
          Rigel Protocol is a Decentralized protocol of several DeFi products.
          Rigel Protocol is completely considered, initiated, developed, and
          driven by the Rigel Protocol community.
        </Text>
      </Flex>
    </Box>
  </Box>
);

export default Detail;
