import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Flex, Text } from '@chakra-ui/layout';
import {
  ModalOverlay,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Modal,
  useDisclosure,
  useClipboard,
} from '@chakra-ui/react';
import CurrentImage from '../../assets/current.svg';
import EditImage from '../../assets/edit.svg';
import CopyImage from '../../assets/copy.svg';

const Account = ({ wallet, wallet_props }) => {
  const { address, balance, signer } = wallet;
  const modal3Disclosure = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(address);
  return (
    <>
      <Flex
        display="flex"
        alignItems="center"
        bg="#120136"
        pl={2}
        py={0}
        rounded="xl"
        border="0px"
        ml={5}
      >
        <Text color="#fff" fontSize="sm" ml={2} mr={4}>
          {balance} BNB
        </Text>
        <Button
          onClick={modal3Disclosure.onOpen}
          d="flex"
          bg="#29235E"
          mb={0}
          mr={1}
          rounded="xl"
          color="#fff"
          fontSize="sm"
          _hover={{ background: '#29235E' }}
          _focus={{ outline: 'none' }}
          cursor="pointer"
          fontWeight="light"
          border="0px"
        >
          <Text mr="10px">{`${address.substr(0, 6)}...${address.slice(
            -6,
            address.length,
          )}`}</Text>
          <CurrentImage />
        </Button>
      </Flex>

      <Modal
        isOpen={modal3Disclosure.isOpen}
        onClose={modal3Disclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="#120136"
          color="#fff"
          borderRadius="20px"
          minHeight="30vh"
          width="90vw"
        >
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            _focus={{ outline: 'none' }}
          />
          <ModalHeader fontWeight="light" fontSize="sm">
            Account
          </ModalHeader>
          <ModalBody mt={4}>
            <Flex justifyContent="space-between" mb={2}>
              <Text color="gray.400" fontSize="13px">
                Connected with MetaMask
              </Text>
              <Button
                border="1px"
                fontWeight="light"
                py={0}
                px={5}
                fontSize="13px"
                cursor="pointer"
                bg="#29235E"
                borderColor="#40BAD5"
                color="#40BAD5"
                _hover={{ background: '#29235E' }}
                _focus={{ outline: '#29235E', background: '#29235E' }}
              >
                Change
              </Button>
            </Flex>

            <Flex color="#fff" alignItems="center" rounded="md">
              <CurrentImage />
              <Text color="gray.400" fontSize="13px" ml={2}>
                {address}
              </Text>
            </Flex>

            <Flex
              color="#fff"
              alignItems="center"
              justifyContent="space-between"
              rounded="md"
              mb={3}
            >
              <Flex alignItems="center">
                <CopyImage />
                <Text
                  color="gray.400"
                  cursor="pointer"
                  onClick={onCopy}
                  fontSize="13px"
                  ml={2}
                >
                  {hasCopied ? 'Copied Address' : 'Copy Address'}
                </Text>
              </Flex>

              <Flex alignItems="center">
                <EditImage />
                <Text color="gray.400" fontSize="13px" ml={2}>
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                  >
                    View on Etherscan
                  </a>
                </Text>
              </Flex>
            </Flex>

            <Flex
              alignItems="center"
              borderRadius="6px"
              px={3}
              h="50px"
              bg="#29235E"
              mb={2}
            >
              <Text fontSize="13px" color="gray.300">
                Your transaction will appear here...
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ wallet }) => wallet;
export default connect(
  mapStateToProps,
  null,
)(Account);
