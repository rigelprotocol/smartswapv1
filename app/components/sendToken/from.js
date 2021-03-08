import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Menu } from '@chakra-ui/menu';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useMediaQuery } from '@chakra-ui/react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';

import RGPImage from '../../assets/rgp.svg';
import BNBImage from '../../assets/bnb.svg';
import ArrowDownImage from '../../assets/arrow-down.svg';
import ETHImage from '../../assets/eth.svg';
import { TOKENS } from '../../utils/constants';

const Manual = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedToken, setSelectedToken] = useState(TOKENS.RGP);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const handleChangeFromAmount = event => setFromAmount(event.target.value);
  const handleChangeToAmount = event => setToAmount(event.target.value);
  const [isMobileDevice] = useMediaQuery('(min-width: 560px)');
  const isMobile = () => {
    if (isMobileDevice) {
      return (
        <>
          <Flex justifyContent="space-between">
            <Input
              isFullWidth
              placeholder="0.0"
              fontSize="lg"
              color=" rgba(255, 255, 255,0.25)"
              value={fromAmount}
              isRequired
              type="number"
              width="38%"
              onChange={handleChangeFromAmount}
            />
            <Flex
              cursor="pointer"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                bg="rgba(64, 186, 213,0.25)"
                p="5px 10px"
                rounded="lg"
                mt="10px"
                mr="15px"
                fontSize="sm"
                color="#72cfe4"
                _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
              >
                MAX
              </Text>
              <Flex>
                <Menu>
                  <Button
                    onClick={onOpen}
                    border="0px"
                    h="30px"
                    fontWeight="regular"
                    fontSize="16px"
                    cursor="pointer"
                    bg={selectedToken ? 'none' : '#40BAD5'}
                    marginBottom="5px"
                    color="white"
                    _hover={{ background: '#72cfe4', color: '#29235E' }}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {selectedToken === TOKENS.BNB && <BNBImage />}
                    {selectedToken === TOKENS.ETH && <ETHImage />}
                    {selectedToken === TOKENS.RGP && <RGPImage />}
                    <Text ml={4}>{selectedToken}</Text>
                  </Button>
                </Menu>
              </Flex>
            </Flex>
          </Flex>
        </>
      );
    }
    return (
      <>
        <Flex justifyContent="space-between">
          <Input
            isFullWidth
            placeholder="0.0"
            fontSize="lg"
            color=" rgba(255, 255, 255,0.25)"
            value={fromAmount}
            isRequired
            type="number"
            onChange={handleChangeFromAmount}
          />
        </Flex>
        <Flex
          cursor="pointer"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            bg="rgba(64, 186, 213,0.25)"
            p="5px 10px"
            rounded="lg"
            mt="10px"
            mr="15px"
            fontSize="sm"
            color="#72cfe4"
            _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
          >
            MAX
          </Text>
          <Flex>
            <Menu>
              <Button
                onClick={onOpen}
                border="0px"
                h="30px"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                bg={selectedToken ? 'none' : '#40BAD5'}
                marginBottom="5px"
                color="white"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
                rightIcon={<ChevronDownIcon />}
              >
                {selectedToken === TOKENS.BNB && <BNBImage />}
                {selectedToken === TOKENS.ETH && <ETHImage />}
                {selectedToken === TOKENS.RGP && <RGPImage />}
                <Text ml={4}>{selectedToken}</Text>
              </Button>
            </Menu>
          </Flex>
        </Flex>
      </>
    );
  };

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
            Balance: 2,632.34
          </Text>
        </Flex>
        {isMobile()}
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
                0
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                setSelectedToken(TOKENS.ETH);
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
                0
              </Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                setSelectedToken(TOKENS.RGP);
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
                2,632.34
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Manual;
