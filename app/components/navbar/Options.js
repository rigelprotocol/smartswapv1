import { Flex, Text } from '@chakra-ui/layout';
import { ModalBody, ModalHeader } from '@chakra-ui/react';
import { WalletContext } from '../../context';
import MetaMaskImage from '../../assets/mask.svg';
import TrustWalletImage from '../../assets/trust.svg';

const Options = () => {
  return (
    <WalletContext.Consumer>
      {({ setLoading, setConnected }) => (
        <>
          <ModalHeader mt={4} fontWeight="regular">
            Connect to a wallet
          </ModalHeader>
          <ModalBody mt={4}>
            <Flex
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setConnected(true);
                }, 5000);
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
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setConnected(true);
                }, 5000);
              }}
              rounded="2xl"
            >
              <Text color="white" _hover={{ color: '#40BAD5' }}>
                Trustwallet
              </Text>
              <TrustWalletImage />
            </Flex>
          </ModalBody>
        </>
      )}
    </WalletContext.Consumer>
  );
};

export default Options;
