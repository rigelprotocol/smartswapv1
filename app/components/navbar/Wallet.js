import React from 'react';
import { Flex } from '@chakra-ui/layout';
import Account from './Account';
import RGP from './RGP';

const Wallet = () => (
  <Flex alignItems="center">
    <RGP />
    <Account />
  </Flex>
);

export default Wallet;
