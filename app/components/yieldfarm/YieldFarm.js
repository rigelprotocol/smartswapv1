import React, { useState } from 'react';
import { Box, Flex, Button, Tooltip } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ShowYieldFarmDetails from './ShowYieldFarmDetails';
import BNBImage from '../../assets/bnb.svg';
import ETHImage from '../../assets/eth.svg';
import RGPImage from '../../assets/rgp.svg';
import BUSDImage from '../../assets/busd.svg';

const YieldFarm = ({ content, wallet }) => {
  const [showYieldfarm, setShowYieldFarm] = useState(false);

  return (
    <>
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'row']}
        color="white"
        margin="0 auto"
        background="linear-gradient(
     270.02deg,
     rgba(41, 35, 94, 0.5) -11.35%,
     rgba(64, 186, 213, 0.5) 175.99%
   )"
        padding="15px 20px"
        paddingBottom="4px"
        marginTop="20px"
        borderRadius="10px"
        width={["95%", "100%"]}
      >
        <Flex justifyContent="space-between" width="100%">
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'none']}
            opacity="0.5"
          >
            Deposit
          </Box>
          <Box marginTop="15px" align="left">
            {content.deposit}
          </Box>
        </Flex>
        <Flex justifyContent="space-between" width="100%">
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'none']}
            opacity="0.5"
          >
            Earn
          </Box>
          <Box marginTop="15px" align="left">
            {content.img === 'bnb.svg' && <BNBImage mr="3" />}
            {content.img === 'eth.svg' && <ETHImage mr="3" />}
            {content.img === 'rgp.svg' && <RGPImage mr="3" />}
            {content.img === 'busd.svg' && <BUSDImage mr="3" />} {content.earn}
          </Box>
        </Flex>
        <Flex justifyContent="space-between" width="100%">
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'none']}
            opacity="0.5"
          >
            APY
          </Box>
          <Box marginTop="15px" align="left">
            {content.APY}
          </Box>
        </Flex>
        <Flex justifyContent="space-between" width="100%">
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'none']}
            opacity="0.5"
          >
            Total Liquidity
          </Box>
          <Box marginTop="15px" align="left">
            ${content.totalLiquidity}
          </Box>
        </Flex>
        <Tooltip label="In few days" bg="#120136" aria-label="A tooltip">
          <Box align="right" mt={['4', '0']} ml="2">

            <Button
              w={['100%', '100%', '146px']}
              h="40px"
              borderRadius="12px"
              bg="rgba(64, 186, 213, 0.1);"
              color="#40BAD5"
              border="0"
              mb="4"
              disabled
              cursor="not-allowed"
              _hover={{ color: '#423a85' }}
            // onClick={() => setShowYieldFarm(!showYieldfarm)}
            >
              Unlock
          </Button>
          </Box>
        </Tooltip>

      </Flex>
      {showYieldfarm && (
        <ShowYieldFarmDetails content={content} wallet={wallet} />
      )}
    </>
  );
};
YieldFarm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  content: PropTypes.object.isRequired,
};
export default YieldFarm;
