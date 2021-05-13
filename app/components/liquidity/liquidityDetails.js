import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import BNBImage from '../../assets/bnb.svg';
import RGPImage from '../../assets/rgp.svg';
import ETHImage from '../../assets/eth.svg';
import BUSDImage from '../../assets/busd.svg';

const LiquidityDetails = ({
  value,
  addLiquidity,
  removeLiquidity,
  removeALiquidity,
}) => (
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
        <Box>Pooled {value.path[0].token == "WBNB" ? "BNB" : value.path[0].token}</Box>
        <Box>
          {value.path[0].token === "RGP" ?
            <RGPImage /> : value.path[0].token === "BUSD" ?
              <BUSDImage /> : value.path[0].token === "ETH" ?
                <ETHImage /> : <BNBImage />
          }
          {value.pooledToken0}
        </Box>
      </Flex>
      <Flex mb="10px" py={2} justifyContent="space-between">

        <Box>Pooled {value.path[1].token == "WBNB" ? "BNB" : value.path[1].token}</Box>
        <Box>
          {value.path[1].token === "RGP" ?
            <RGPImage /> : value.path[1].token === "BUSD" ?
              <BUSDImage /> : value.path[1].token === "ETH" ?
                <ETHImage /> : <BNBImage />
          }
          {value.pooledToken1}
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
      <Flex mb="10px" py={2} justifyContent="space-between">
        <Button
          w="60%"
          h="50px"
          borderRadius="12px"
          bg="rgba(64, 186,213, 0.1)"
          color="#40BAD5"
          border="0"
          mb="4"
          mr="6"
          cursor="pointer"
          _hover={{ color: '#423a85' }}
          onClick={() => addLiquidity()}
        >
          Add
      </Button>
        <Button
          w="60%"
          h="50px"
          borderRadius="12px"
          bg="rgba(64, 186,213, 0.1)"
          color="#40BAD5"
          border="0"
          mb="4"
          cursor="pointer"
          _hover={{ color: '#423a85' }}
          // onClick={() => removeLiquidity()}
          onClick={() => removeALiquidity(value.pairAddress)}
        >
          Remove
      </Button>
      </Flex>
    </Box>
  );

LiquidityDetails.propTypes = {
  value: PropTypes.object.isRequired,
  removeALiquidity: PropTypes.func.isRequired,
  removeLiquidity: PropTypes.func.isRequired,
  addLiquidity: PropTypes.func.isRequired,
};
export default LiquidityDetails;
