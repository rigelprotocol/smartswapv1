/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import {
  Text,
  Circle,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import { QuestionIcon, ArrowUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import Spinner from '../spinner/spinner';
import ArrowDownImage from '../../assets/arrow-down.svg';
import { isNotEmpty } from '../../utils/UtilFunc';

const ConfirmSwapBox = props => {
  const {
    path,
    amountIn,
    tokenPrice,
    fromAmount,
    closeModal1,
    closeModal2,
    closeModal3,
    closeModal4,
    modal1Disclosure,
    modal2Disclosure,
    modal3Disclosure,
    modal4Disclosure,
    selectedToken,
    selectedToToken,
    openLoadingSpinnerAndSwap,
  } = props;

  return (
    <>
      {/* Modal One */}
      <Modal isOpen={modal1Disclosure.isOpen} onClose={closeModal1} isCentered>
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
            onClick={closeModal1}
          />
          <ModalHeader fontSize="18px" fontWeight="regular" align="center">
            Confirm Swap
          </ModalHeader>
          <ModalBody>
            <Flex justifyContent="space-between">
              <Box>
                <Text>{fromAmount}</Text>
              </Box>
              <Box>
                <Text>
                  {isNotEmpty(selectedToken) && (
                    <span
                      className={`icon icon-${selectedToken.symbol.toLowerCase()}`}
                    />
                  )}
                  {` `}
                  {isNotEmpty(selectedToken) && selectedToken.symbol}
                </Text>
              </Box>
            </Flex>
            <Box>
              <ArrowDownImage />
            </Box>
            <Flex justifyContent="space-between">
              <Box>
                <Text>{amountIn}</Text>
              </Box>
              <Box>
                <Text>
                  {isNotEmpty(selectedToToken) && (
                    <span
                      className={`icon icon-${selectedToToken.symbol.toLowerCase()}`}
                    />
                  )}
                  {` `}
                  {path[1] !== undefined && path[1].token !== undefined
                    ? path[1].token
                    : ''}
                </Text>
              </Box>
            </Flex>
            <Text mr="3" opacity="0.5">
              Output is estimated, you will receive at least 1.8102 or the
              transaction will revert.
            </Text>
            <Box p="3" background="#29235E" opacity="0.5" borderRadius="20px">
              <Flex m="1" justifyContent="space-between">
                <Text mt={-1}> Price </Text>
                <Box>
                  {tokenPrice} {path[0].token} / {path[1] ? path[1].token : ''}
                </Box>
              </Flex>
              <Flex m="1" justifyContent="space-between">
                <Text mt={-1}>
                  {' '}
                  Minimum received <QuestionIcon />
                </Text>
                <Box>{amountIn}</Box>
              </Flex>
              <Flex m="1" justifyContent="space-between">
                <Text>
                  {' '}
                  Price Impact <QuestionIcon />{' '}
                </Text>
                <Box textAlign="right">
                  <Text>1.49%</Text>
                </Box>
              </Flex>
              <Flex m="1" justifyContent="space-between">
                <Text>
                  {' '}
                  Liquidity Provider Fee <QuestionIcon />{' '}
                </Text>
                <Box>
                  <Text>0.03 {path[0].token}</Text>
                </Box>
              </Flex>
            </Box>
            <Button
              my="4"
              mx="auto"
              color="#40BAD5"
              width="100%"
              background="rgba(64, 186, 213, 0.15)"
              cursor="pointer"
              border="none"
              borderRadius="10px"
              padding="10px"
              height="50px"
              fontSize="16px"
              _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
              onClick={openLoadingSpinnerAndSwap}
            >
              Confirm Swap
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal Two */}
      <Modal isOpen={modal2Disclosure.isOpen} onClose={closeModal2} isCentered>
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
            onClick={closeModal2}
          />
          <ModalBody align="center">
            <Spinner />
            <Text fontSize="18px" fontWeight="normal">
              Waiting for Confirmation
            </Text>
            <Text fontSize="16px" fontWeight="bold">
              Swapping {fromAmount} {path[0] !== undefined && path[0].token} to{' '}
              {amountIn} {path[1] !== undefined && path[1].token}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal Three */}
      <Modal isOpen={modal3Disclosure.isOpen} onClose={closeModal3} isCentered>
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
            onClick={closeModal3}
          />
          <ModalBody align="center" my={2}>
            <Circle size="70px" background="#68C18A" my={3}>
              <ArrowUpIcon fontSize="50px" />
            </Circle>
            <Text fontSize="18px" fontWeight="normal">
              Transaction Submitted
            </Text>
            <Text
              fontSize="14px"
              fontWeight="normal"
              color="rgba(64, 186, 213, 1)"
            >
              <a href="#">View on Etherscan</a>
            </Text>
            <Button
              width="100%"
              rounded="2xl"
              border="0"
              py={6}
              mt={3}
              background="rgba(64, 186, 213, 0.1)"
              color="rgba(64, 186, 213, 1)"
              cursor="pointer"
              onClick={closeModal3}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal Four */}
      <Modal isOpen={modal4Disclosure.isOpen} onClose={closeModal4} isCentered>
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
            onClick={closeModal4}
          />
          <ModalBody align="center" my={2}>
            <Circle size="70px" background="#EA4659" my={3}>
              <CloseIcon fontSize="40px" />
            </Circle>
            <Text fontSize="18px" fontWeight="normal">
              Transaction Failed
            </Text>
            <Text
              fontSize="14px"
              fontWeight="normal"
              color="rgba(64, 186, 213, 1)"
            >
              <a href="#">View on Etherscan</a>
            </Text>
            <Button
              width="100%"
              rounded="2xl"
              border="0"
              py={6}
              mt={3}
              background="rgba(64, 186, 213, 0.1)"
              color="rgba(64, 186, 213, 1)"
              cursor="pointer"
              onClick={closeModal4}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmSwapBox;
