import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import BNBImage from '../../assets/bnb.svg';
import RGPImage from '../../assets/rgp.svg';

const LiquidityDetails = ({ value }) => (
  <Box
    color="#fff"
    bg="#29235E"
    px={4}
    py={3}
    mx={5}
    borderRadius="0 0 20px 20px"
    justifyContent="space-between"
  >
    <Flex mb="10px" py={2} justifyContent="space-between">
      <Box>Polled RGP</Box>
      <Box>
        <RGPImage pr={2} />
        {value.pooledRGP}
      </Box>
    </Flex>
    <Flex mb="10px" py={2} justifyContent="space-between">
      <Box>Polled BNB</Box>
      <Box>
        <BNBImage pr={2} />
        {value.pooledBNB}
      </Box>
    </Flex>
    <Flex mb="10px" py={2} justifyContent="space-between">
      <Box>Pool Tokens</Box>
      <Box>{value.poolToken}</Box>
    </Flex>
    <Flex mb="10px" py={2} justifyContent="space-between">
      <Box>Pool Share</Box>
      <Box>{value.poolShare}</Box>
    </Flex>
  </Box>
);

LiquidityDetails.propTypes = {
  value: PropTypes.object.isRequired,
};
export default LiquidityDetails;
