/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';

import InputSelector from './InputSelector';
import RGPImage from '../../assets/rgp.svg';
import BNBImage from '../../assets/bnb.svg';
import BUSDImage from '../../assets/busd.svg';
import ArrowDownImage from '../../assets/arrow-down.svg';
import ETHImage from '../../assets/eth.svg';
import { TOKENS, TOKENS_CONTRACT } from '../../utils/constants';

const From = ({
  fromAmount,
  handleChangeFromAmount,
  setPathArray,
  selectedToken,
  setSelectedToken,
  rgpBalance,
  busdBalance,
  bnbBalance,
  ETHBalance,
  userWallet,
  getToAmount,
  path,
  setPath,
  showMaxValue
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { wallet } = userWallet;
  useEffect(() => {
    setSelectedToken(TOKENS.RGP);
    path.push({ fromPath: TOKENS_CONTRACT.RGP });
  }, []);

  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        h="100%"
        mb="10px"
        justifyContent="space-between"
        px={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            From
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            {/* Balance: {tokenBalance} */}
            Balance:{' '}
            {selectedToken == 'BNB'
              ? busdBalance
              : selectedToken == 'ETH'
                ? ETHBalance
                : rgpBalance}
          </Text>
        </Flex>
        <InputSelector
          handleChange={handleChangeFromAmount}
          value={fromAmount}
          max
          onOpen={onOpen}
          getToAmount={getToAmount}
          selectedToken={selectedToken}
          showMaxValue={showMaxValue}
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
          <ModalHeader fontWeight="light">Select a token</ModalHeader>
          <ModalBody mt={4}>
            <Input
              placeholder="Search by name or paste address"
              borderColor="#40BAD5"
              color="gray.500"
              rounded="2xl"
              h="50px"
              fontSize="sm"
              variant="outline"
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
                setSelectedToken(TOKENS.BNB);
                setPathArray(TOKENS_CONTRACT.BNB);
                setPath(path => {
                  path.shift()
                  path.unshift({ fromPath: TOKENS_CONTRACT.BNB })
                })
                getToAmount();
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
                {bnbBalance}
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                setSelectedToken(TOKENS.BUSD);
                setPathArray(wallet.address);
                setPath(path => {
                  path.shift()
                  path.unshift({ fromPath: TOKENS_CONTRACT.BUSD })
                })
                getToAmount();
                onClose();
              }}
            >
              <Flex alignItems="center">
                <BUSDImage />
                <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
                  {TOKENS.BUSD}
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
                setSelectedToken(TOKENS.ETH);
                setPathArray(wallet.address);
                setPath(path => {
                  path.shift()
                  path.unshift({ fromPath: TOKENS_CONTRACT.ETH })
                })
                getToAmount();
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
                setSelectedToken(TOKENS.RGP);
                setPathArray(TOKENS_CONTRACT.RGP);
                setPath(path => {
                  path.shift()
                  path.unshift({ fromPath: TOKENS_CONTRACT.RGP })
                })
                getToAmount();
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
export default From;
