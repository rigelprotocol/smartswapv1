import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { ModalBody, ModalHeader } from '@chakra-ui/react';
import { connect } from 'react-redux';
import MetaMaskImage from '../../assets/mask.svg';
import TrustWalletImage from '../../assets/trust.svg';
import { connectWallet } from '../../containers/WalletProvider/actions';

const Options = ({ connectWallet }) => (
  <>
    <ModalHeader mt={4} fontWeight="regular">
      Connect to a wallet
    </ModalHeader>
    <ModalBody mt={4}>
      <Flex
        onClick={async () => {
          connectWallet();
        }}
        color="#fff"
        bg="#29235E"
        h="50px"
        cursor="pointer"
        _hover={{ color: '#40BAD5' }}
        alignItems="center"
        justifyContent="space-between"
        p={9}
        rounded="2xl"
      >
        <Text color="white" _hover={{ color: '#40BAD5' }}>
          Metamask
        </Text>
        <MetaMaskImage />
      </Flex>
      <Flex
        color="#fff"
        bg="#29235E"
        h="50px"
        cursor="pointer"
        alignItems="center"
        justifyContent="space-between"
        p={8}
        mt={5}
        onClick={() => {
          connectTrustWallet();
        }}
        rounded="2xl"
      >
        <Text color="white" _hover={{ color: '#40BAD5' }}>
          Trust Wallet
        </Text>
        <TrustWalletImage />
      </Flex>
    </ModalBody>
  </>
);
export default connect(
  null,
  { connectWallet },
)(Options);
