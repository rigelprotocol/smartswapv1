/* eslint-disable react/prop-types */
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Input } from '@chakra-ui/input';
import RGPImage from '../../assets/rgp.svg';
import BNBImage from '../../assets/bnb.svg';
import ArrowDownImage from '../../assets/arrow-down.svg';
import ETHImage from '../../assets/eth.svg';
import { TOKENS, TOKENS_CONTRACT } from '../../utils/constants';
import InputSelector from './InputSelector';

const SendTo = props => {
  const {
    amountIn,
    handleChangeToAmount,
    setPathToArray,
    selectedToToken,
    setSelectedToToken,
    rgpBalance,
    busdBalance,
    ETHBalance,
    userWallet,
    getToAmount,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    setSelectedToToken('Select a token');
  }, []);
  const { wallet } = userWallet;
  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        mt="10px"
        h="100%"
        justifyContent="space-between"
        px={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            To
          </Text>
        </Flex>
        <InputSelector
          max={false}
          handleChange={handleChangeToAmount}
          value={amountIn}
          selectedToken={selectedToToken}
          onOpen={onOpen}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="#120136"
          color="#fff"
          borderRadius="20px"
          width="90vw"
          minHeight="60vh"
        >
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
          />
          <ModalHeader fontWeight="regular">Select a token</ModalHeader>
          <ModalBody mt={4}>
            <Input
              placeholder="Search by name or paste address"
              borderColor="#40BAD5"
              color="gray.500"
              rounded="2xl"
              h="50px"
              fontSize="sm"
            />
            <Flex justifyContent="space-between" mt={5}>
              <Text fontSize="sm" fontWeight="light" color="#fff">
                Token
              </Text>
              <ArrowDownImage />
            </Flex>
            <Flex
              justifyContent="space-between"
              mt={3}
              cursor="pointer"
              onClick={() => {
                setSelectedToToken(TOKENS.BNB);
                setPathToArray(TOKENS_CONTRACT.BNB);
                getToAmount(TOKENS_CONTRACT.BNB, TOKENS.BNB);
                onClose();
              }}
            >
              <Flex alignItems="center">
                <BNBImage />
                <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
                  {TOKENS.BNB}
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="regular" color="#fff">
                {busdBalance}
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                setSelectedToToken(TOKENS.ETH);
                setPathToArray(wallet.address);
                getToAmount(TOKENS_CONTRACT.ETH, TOKENS.ETH);
                onClose();
              }}
            >
              <Flex alignItems="center">
                <ETHImage />
                <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
                  {TOKENS.ETH}
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="regular" color="#fff">
                {ETHBalance}
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                setSelectedToToken(TOKENS.RGP);
                setPathToArray(TOKENS_CONTRACT.RGP);
                getToAmount(TOKENS_CONTRACT.RGP, TOKENS.RGP);
                onClose();
              }}
            >
              <Flex alignItems="center">
                <RGPImage />
                <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
                  {TOKENS.RGP}
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="regular" color="#fff">
                {rgpBalance}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendTo;
