import { Flex, Text } from '@chakra-ui/layout';
import Image from 'next/dist/client/image';
import { ModalBody, ModalHeader, Spinner } from '@chakra-ui/react';
import { WalletContext } from '../../context';

const Loading = () => {
  return (
    <WalletContext.Consumer>
      {({ setLoading }) => (
        <>
          <ModalHeader
            mt={4}
            fontWeight="light"
            cursor="pointer"
            color="#40BAD5"
            onClick={() => setLoading(false)}
          >
            Back
          </ModalHeader>
          <ModalBody mt={4}>
            <Flex
              color="#40BAD5"
              bg="#29235E"
              h="50px"
              alignItems="center"
              p={8}
              rounded="2xl"
            >
              <Spinner speed="0.65s" emptyColor="gray.200" />
              <Text color="white" ml={5} _hover={{ color: '#40BAD5' }}>
                Initializing ...
              </Text>
            </Flex>
            <Flex
              color="#fff"
              bg="#29235E"
              h="70px"
              alignItems="center"
              justifyContent="space-between"
              p={8}
              mt={5}
              rounded="2xl"
            >
              <div>
                <Text color="white">Metamask</Text>
                <Text color="white">Easy-to-use browser extension.</Text>
              </div>
              <Image src="/mask.svg" width={50} height={25} />
            </Flex>
          </ModalBody>
        </>
      )}
    </WalletContext.Consumer>
  );
};

export default Loading;
