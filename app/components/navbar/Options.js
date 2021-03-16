import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { ModalBody, ModalHeader } from '@chakra-ui/react';
import MetaMaskImage from '../../assets/mask.svg';
import TrustWalletImage from '../../assets/trust.svg';
import { connectWallet } from '../../containers/WalletProvider/actions';
// import { notify } from '../../containers/NoticeProvider/actions';
const Options = () => {
  const context = useWeb3Context();

  const connectMetaMask = () => {
    connectWallet();
    context.setFirstValidConnector(['MetaMask']);
  };
  // to access the Wallet connected please use context
  // console.log(context)
  // to use else where apart from the Options page
  // import { useWeb3Context } from 'web3-react';
  // const context = useWeb3Context();
  // then use the context

  const connectTrustWallet = () => {
    context.setFirstValidConnector(['TrustWallet']);
  };
  return (
    <>
      <ModalHeader mt={4} fontWeight="regular">
        Connect to a wallet
      </ModalHeader>
      <ModalBody mt={4}>
        <Flex
          onClick={() => {
            connectMetaMask();
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
};
export default Options;
