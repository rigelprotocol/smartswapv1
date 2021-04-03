import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import BNBImage from '../../assets/bnb.svg';
import RGPImage from '../../assets/rgp.svg';
import LiquidityDetails from './liquidityDetails';
const Liquidities = ({ value }) => {
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
      >
        <Box>
          <BNBImage /> <RGPImage /> {value.from} / {value.to}
        </Box>
        <Box>
          <ChevronDownIcon
            h={4}
            w={4}
            onClick={() => setShowDetails(!showDetails)}
          />
        </Box>
      </Flex>
      {showDetails ? <LiquidityDetails value={value} /> : <div />}
    </>
  );
};

Liquidities.propTypes = {
  value: PropTypes.object.isRequired,
};
export default Liquidities;