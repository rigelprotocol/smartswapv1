import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import BNBImage from '../../assets/bnb.svg';
import RGPImage from '../../assets/rgp.svg';
import ETHImage from '../../assets/eth.svg';
import BUSDImage from '../../assets/busd.svg'
import LiquidityDetails from './liquidityDetails';
const Liquidities = ({
  value,
  addLiquidity,
  removeLiquidity,
  removeALiquidity,
}) => {
  console.log(value);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <Flex
        color="#fff"
        bg="#29235E"
        px={4}
        py={4}
        mx={5}
        borderRadius={showDetails ? '20px 20px 0 0' : '20px'}
        justifyContent="space-between"
        my={3}
      >
        <Box>
          {value.path[0].token === "RGP" ?
            <RGPImage /> : value.path[0].token === "BUSD" ?
              <BUSDImage /> : value.path[0].token === "ETH" ?
                <ETHImage /> : <BNBImage />
          }  {value.path[1].token === "RGP" ?
            <RGPImage /> : value.path[1].token === "BUSD" ?
              <BUSDImage /> : value.path[1].token === "ETH" ?
                <ETHImage /> : <BNBImage />
          }{' '}
          {value.path[0].token == "WBNB" ? 'BNB' : value.path[0].token} /{' '}
          {value.path[1].token == "WBNB" ? 'BNB' : value.path[1].token}
        </Box>
        <Box>
          <ChevronDownIcon
            h={4}
            w={4}
            onClick={() => setShowDetails(!showDetails)}
          />
        </Box>
      </Flex>
      {showDetails ? (
        <LiquidityDetails
          value={value}
          addLiquidity={addLiquidity}
          removeLiquidity={removeLiquidity}
          removeALiquidity={removeALiquidity}
        />
      ) : (
          <div />
        )}
    </>
  );
};

Liquidities.propTypes = {
  value: PropTypes.object.isRequired,
  removeALiquidity: PropTypes.func.isRequired,
  removeLiquidity: PropTypes.func.isRequired,
  addLiquidity: PropTypes.func.isRequired,
};
export default Liquidities;
