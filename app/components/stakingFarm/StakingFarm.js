import React, { useState } from 'react';
import { Box, Flex, Button, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ShowYieldFarmDetails from './ShowYieldFarmDetails';
import BNBImage from '../../assets/bnb.svg';
import ETHImage from '../../assets/eth.svg';
import RGPImage from '../../assets/rgp.svg';
import BUSDImage from '../../assets/busd.svg';

const YieldFarm = ({
  content,
  wallet,
  onOpenModal,
  refreshTokenStaked,
  loadingTotalLiquidity,
  isAddressWhitelist,
}) => {
  const [showYieldfarm, setShowYieldFarm] = useState(false);

  const formatAmount = value => parseFloat(value).toLocaleString();

  const totalLiquidityValue = () => {
    if (loadingTotalLiquidity) {
      return <Spinner speed="0.65s" color="blue.500" />;
    }
    if (content.totalLiquidity) {
      return `$ ${formatAmount(content.totalLiquidity)}`;
    }
  };
  const checkIfAddressIsWhiteListed = () => {
    if (isAddressWhitelist) {
      setShowYieldFarm(!showYieldfarm);
    } else {
      onOpenModal();
    }
  };
  return (
    <>
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row']}
        color="white"
        background="#29235e"
        border="1px solid #4D4693"
        padding="15px 20px"
        width={['100%', '100%', '100%']}
      >
        <Flex justifyContent="space-between" width="100%">
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'block', 'none']}
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
            display={['block', 'block', 'none']}
            opacity="0.5"
          >
            Earn
          </Box>
          <Box marginTop="15px" paddingLeft="40px" align="left">
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
            display={['block', 'block', 'none']}
            opacity="0.5"
          >
            APY
          </Box>
          <Box marginTop="15px" paddingLeft="40px" align="left">
            {formatAmount(content.ARYValue)} %
          </Box>
        </Flex>
        <Flex
          justifyContent="space-between"
          width="100%"
          marginBottom={['10px', '10px', '0']}
        >
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'block', 'none']}
            opacity="0.5"
          >
            Total Liquidity
          </Box>
          <Box marginTop="15px" paddingLeft="65px" align="right">
            {totalLiquidityValue()}
          </Box>
        </Flex>
        <Box align="right" mt={['4', '0']} ml="2">
          {content.id === 1 ? (
            <Button
              w={['100%', '100%', '146px']}
              h="40px"
              bg="#4D4693"
              color="#FFF"
              border="0"
              borderRadius="0px"
              mb="4"
              _hover={{ color: '#423a85' }}
              onClick={checkIfAddressIsWhiteListed}
            >
              Unlock
            </Button>
          ) : (
            <Button
              w={['100%', '100%', '146px']}
              h="40px"
              bg="#4D4693"
              color="#FFF"
              border="0"
              mb="4"
              cursor="pointer"
              borderRadius="0px"
              _hover={{ color: '#423a85' }}
              onClick={() => setShowYieldFarm(!showYieldfarm)}
            >
              Unlock
            </Button>
          )}
        </Box>
      </Flex>
      {showYieldfarm && (
        <ShowYieldFarmDetails
          content={content}
          wallet={wallet}
          refreshTokenStaked={refreshTokenStaked}
        />
      )}
    </>
  );
};
YieldFarm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  content: PropTypes.object.isRequired,
};
export default YieldFarm;
