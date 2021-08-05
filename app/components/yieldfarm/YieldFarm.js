import React, { useState } from 'react';
import { Box, Flex, Button, Spinner, Tooltip } from '@chakra-ui/react';
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
  setShowModalWithInput,
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
        width={['95%', '95%', '100%']}
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
            display={['block', 'block', 'none']}
            opacity="0.5"
          >
            APY
          </Box>
          <Box marginTop="15px" align="left">
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
          <Box marginTop="15px" align="left">
            {totalLiquidityValue()}
          </Box>
        </Flex>
        <Box align="right" mt={['4', '0']} ml="2">
          {content.id == 1 ? (
            <Button
              w={['100%', '100%', '146px']}
              h="40px"
              borderRadius="12px"
              bg="rgba(64, 186, 213, 0.1);"
              color="#40BAD5"
              border="0"
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
              borderRadius="12px"
              bg="rgba(64, 186, 213, 0.1);"
              color="#40BAD5"
              border="0"
              mb="4"
              cursor="pointer"
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
