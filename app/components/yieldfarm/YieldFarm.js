import React, { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ShowYieldFarmDetails from './ShowYieldFarmDetails';
import { ethers } from 'ethers';
import { SMART_SWAP, TOKENS_CONTRACT } from "../../utils/constants";
import { BUSDToken, rigelToken, MasterChefContract } from '../../utils/SwapConnect';


const YieldFarm = ({ content }) => {
  const [showYieldfarm, setShowYieldFarm] = useState(false);

  const useDeposit = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await MasterChefContract();
      await masterChef.deposit("uint", "uint", {
        from: wallet.address,
      });
    }
  };

  const useWithdrawal = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await MasterChefContract();
      await masterChef.withdraw("uint", "uint", {
        from: wallet.address,
      });
    }
  };

  const rgpApproveMasterChef = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      await rgp.approve(SMART_SWAP.MasterChef, walletBal, {
        from: wallet.address,
      });
    }
  };


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
        width="95%"
        align="left"
      >
        <Flex justifyContent="space-between">
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
        <Flex justifyContent="space-between">
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'none']}
            opacity="0.5"
          >
            Earn
          </Box>
          <Box marginTop="15px" align="left">
            <img src="../../assets/rgp.svg" alt={content.img} /> {content.earn}
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
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
        <Flex justifyContent="space-between">
          <Box
            marginTop="15px"
            align="left"
            display={['block', 'none']}
            opacity="0.5"
          >
            Total Liquidity
          </Box>
          <Box marginTop="15px" align="left">
            {content.totalLiquidity}
          </Box>
        </Flex>
        <Box align="right" mt={['4', '0']}>
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
        </Box>
      </Flex>
      {showYieldfarm && <ShowYieldFarmDetails content={content} />}
    </>
  );
};
YieldFarm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  content: PropTypes.object.isRequired,
};
export default YieldFarm;
