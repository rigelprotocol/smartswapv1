// @ts-nocheck
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import ArrowDownImage from '../../assets/arrow-down.svg';
import From, {swapExactTokforTok} from './from';
import To from './to';
import swapConnect, { provider, signer } from '../../utils/swapConnect';
import SmartSwapRouter02 from '../../utils/abis/SmartSwapRouter02.json';
import swapSettings from './swapSettings';
import from from './from';

const Manual = props => {
  return (
    <div>
      <Box
        boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
        bg="#120136"
        mt={3}
        p={5}
        rounded="2xl"
      >
        <swapSettings />
        <From />
        <Box textAlign="center">
          <ArrowDownImage />
        </Box>
        <To />
        <Box mt={14}>
          <Button
            d="block"
            w="100%"
            h="50px"
            color="#40BAD5"
            border="none"
            fontWeight="regular"
            fontSize="lg"
            cursor="pointer"
            rounded="2xl"
            bg="rgba(64, 186, 213,0.25)"
            borderColor="#40BAD5"
            _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
            _active={{ outline: '#29235E', background: '#29235E' }}
            onClick={() => {
              swapExactTokforTok();
            }}
          >
            Enter an Amount
        </Button>
        </Box>
      </Box>
    </div>
  );
}
export default Manual;
