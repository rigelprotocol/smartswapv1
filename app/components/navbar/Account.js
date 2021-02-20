import { Flex, Text } from '@chakra-ui/layout';
import Image from 'next/dist/client/image';
import React from 'react'
import {
  ModalOverlay,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Modal,
  useDisclosure,
} from '@chakra-ui/react';

const Account = () => {
  const modal3Disclosure = useDisclosure();

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
          0 ETH
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
          <Text mr="10px">0xDa7a...362b</Text>
          <Image src="/current.svg" width={20} height={20} />
        </Button>
      </Flex>

      <Modal
        isOpen={modal3Disclosure.isOpen}
        onClose={modal3Disclosure.onClose}
        isCentered="true"
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
            bg={'none'}
            border="0px"
            color={'#fff'}
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
              <Image src="/current.svg" width={20} height={15} />
              <Text color="gray.400" fontSize="13px" ml={2}>
                0xDa7a...362b
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
                <Image src="/copy.svg" width={20} height={15} />
                <Text color="gray.400" fontSize="13px" ml={2}>
                  Copy Address
                </Text>
              </Flex>

              <Flex alignItems="center">
                <Image src="/edit.svg" width={20} height={15} />
                <Text color="gray.400" fontSize="13px" ml={2}>
                  View on Etherscan
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

export default Account;
