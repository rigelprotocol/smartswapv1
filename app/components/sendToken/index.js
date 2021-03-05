// @ts-nocheck
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import React from 'react';
import { useWeb3Context } from 'web3-react';
import ArrowDownImage from '../../assets/arrow-down.svg';
import From from './from';
import To from './to';

const Manual = () => {
  const context = useWeb3Context();

  const connectMetaMask = () => {
    context.setFirstValidConnector(['MetaMask']);
  };
  return (
    <div>
      <Box
        boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
        bg="#120136"
        mt={3}
        p={5}
        rounded="2xl"
      >
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
              connectMetaMask();
            }}
          >
            Connect
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Manual;
