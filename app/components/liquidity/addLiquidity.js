import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
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
import { CheckIcon } from '@chakra-ui/icons';
import From from 'components/liquidity/from';
import To from 'components/liquidity/to';
import React from 'react';
import PropTypes from 'prop-types';
import Question from '../../assets/question.svg';
import Plus from '../../assets/plus-c.svg';
import ArrowLeft from '../../assets/arrow-left.svg';
import BNBImage from '../../assets/bnb.svg';
import ETHImage from '../../assets/eth.svg';
import RGPImage from '../../assets/rgp.svg';
const AddLiquidity = ({
  fromValue,
  setFromValue,
  toValue,
  selectingToken,
  setSelectedValue,
  selectedValue,
  popupText,
  confirmingSupply,
  approveBNBPopup,
  approveBNB,
  buttonValue,
  openSupplyButton,
  open,
  back,
  displayButton,
  closeModal1,
  closeModal2,
  closeModal3,
  modal1Disclosure,
  modal2Disclosure,
  modal3Disclosure,
}) => (
    <Box
      bg="#120136"
      minHeight="50vh"
      w={['100%', '100%', '29.50%', '29.5%']}
      rounded="lg"
    >
      {approveBNBPopup ? (
        <Box
          bg="#120136"
          borderRadius="20px"
          width="220px"
          position="fixed"
          right="150px"
          top="150px"
          p="2"
          border="1px solid rgba(255, 255, 255,0.25)"
        >
          <Flex>
            <Box pt="2" mr="4">
              <Circle size="30px" borderRadius="50%" bg="#68C18A" border="0">
                <CheckIcon color="white" />
              </Circle>
            </Box>
            <Box>
              <Text color="white">{popupText}</Text>
              <Text>
                <a href="google.com">view on bscscan</a>
              </Text>
            </Box>
          </Flex>
        </Box>
      ) : (
          <div />
        )}
      <Flex justifyContent="space-between" alignItems="center" px={4}>
        <ArrowLeft cursor="pointer" onClick={back} />
        <Text color="gray.200">Add Liquidity</Text>
        <Question />
      </Flex>

      <From
        selectingToken={selectingToken}
        fromValue={fromValue}
        setFromValue={e => setFromValue(e)}
        selectedValue={selectedValue}
      />
      <Flex justifyContent="center" my={3}>
        <Plus />
      </Flex>
      <To
        selectingToken={selectingToken}
        selectedToken={val => setSelectedValue(val)}
        toValue={toValue}
        selectedValue={selectedValue}
      />
      {selectedValue.id !== 0 ? (
        <Box
          color="#fff"
          bg="#29235E"
          mt="10px"
          justifyContent="space-between"
          py={1}
          px={4}
          mx={4}
          rounded="2xl"
        >
          <Text fontSize="sm" color="gray.200" my={3}>
            Prices and pool share
        </Text>
          <Flex
            justifyContent="space-between"
            px={2}
            bg="background: rgba(41, 35, 94, 1);
"
          >
            <Box>
              <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
                497.209
            </Text>
              <Text fontSize="sm" color="gray.500" my={3}>
                RGP per {selectedValue.name}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
                0.00201078
            </Text>
              <Text fontSize="sm" color="gray.500" my={3}>
                ETH per DAI
            </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.200" my={3} textAlign="center">
                0%
            </Text>
              <Text fontSize="sm" color="gray.500" my={3}>
                Share of Pool
            </Text>
            </Box>
          </Flex>
        </Box>
      ) : (
          <div />
        )}
      <Box mt={5} p={5}>
        {displayButton ? (
          <Button
            d="block"
            w="100%"
            h="50px"
            color="rgba(64, 186, 213, 1)"
            border="none"
            fontWeight="regular"
            fontSize="lg"
            cursor="pointer"
            rounded="2xl"
            bg="rgba(64, 186, 213, 0.1)"
            my="3"
            borderColor="#40BAD5"
            _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
            _active={{ outline: '#29235E', background: '#29235E' }}
            onClick={approveBNB}
          >
            Approve BNB
          </Button>
        ) : (
            <div />
          )}
        <Button
          d="block"
          w="100%"
          h="50px"
          color={openSupplyButton ? '#BEBEBE' : 'rgba(64, 186, 213, 1)'}
          border="none"
          fontWeight="regular"
          fontSize="lg"
          cursor="pointer"
          rounded="2xl"
          bg={openSupplyButton ? '#444159' : 'rgba(64, 186, 213, 0.1)'}
          borderColor="#40BAD5"
          _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
          _active={{ outline: '#29235E', background: '#29235E' }}
          disabled={openSupplyButton}
          onClick={open}
        >
          {buttonValue}
        </Button>
      </Box>
      {/* modal 1 summary */}
      <Modal
        isOpen={modal1Disclosure.isOpen}
        onClose={closeModal1}
        isCentered="true"
      >
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
            You will recieve
        </ModalHeader>
          <ModalBody>
            <h2>
              0.1738839030{' '}
              {selectedValue.img === 'bnb.svg' && <BNBImage mr="3" />}
              {selectedValue.img === 'eth.svg' && <ETHImage mr="3" />}
              {selectedValue.img === 'rgp.svg' && <RGPImage mr="3" />}{' '}
              <RGPImage />
            </h2>
            <Text mr="3" opacity="0.5">
              Output is estimated if the price changes by more than 0.5% your
              transaction will revert
          </Text>
            <Box p="3" background="#29235E" opacity="0.5" borderRadius="20px">
              <Flex m="1" justifyContent="space-between">
                <Text mt={-1}> RGP Deposited </Text>
                <Box>
                  <RGPImage /> {fromValue}
                </Box>
              </Flex>
              <Flex m="1" justifyContent="space-between">
                <Text mt={-1}> {selectedValue.name} Deposited </Text>
                <Box>
                  <BNBImage /> {toValue}
                </Box>
              </Flex>
              <Flex m="1" justifyContent="space-between">
                <Text> Rates </Text>
                <Box textAlign="right">
                  <Text>1 RGP = 1.8623 BNB</Text>
                  <Text>0.623201 BNB = 1 BNB</Text>
                </Box>
              </Flex>
              <Flex m="1" justifyContent="space-between">
                <Text> Share of Pool </Text>
                <Box>
                  <Text>0.004236%</Text>
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
              onClick={confirmingSupply}
            >
              Confirm Supply
          </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* modal 2 spin */}
      <Modal
        isOpen={modal2Disclosure.isOpen}
        onClose={closeModal2}
        isCentered="true"
      >
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
            <h1>SPIN</h1>
            <h4>Waiting for Confirmation</h4>
            <h2>
              Supplying {fromValue} RGP to {toValue} BNB
          </h2>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* modal 3 submitted */}
      <Modal
        isOpen={modal3Disclosure.isOpen}
        onClose={closeModal3}
        isCentered="true"
      >
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
          <ModalBody align="center">
            <Circle size="60px" borderRadius="50%" bg="#68C18A" border="0">
              <CheckIcon color="white" w={8} h={8} />
            </Circle>
            <h4>Transaction submitted</h4>
            <Text>
              <a href="google.com">view on BSCSCAN</a>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
AddLiquidity.propTypes = {
  fromValue: PropTypes.string.isRequired,
  setFromValue: PropTypes.func.isRequired,
  toValue: PropTypes.string.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  selectedValue: PropTypes.object.isRequired,
  selectingToken: PropTypes.object.isRequired,
  popupText: PropTypes.string.isRequired,
  confirmingSupply: PropTypes.string.isRequired,
  approveBNBPopup: PropTypes.bool.isRequired,
  approveBNB: PropTypes.bool.isRequired,
  buttonValue: PropTypes.string.isRequired,
  openSupplyButton: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  displayButton: PropTypes.bool.isRequired,
  closeModal1: PropTypes.func.isRequired,
  closeModal2: PropTypes.func.isRequired,
  closeModal3: PropTypes.func.isRequired,
  modal1Disclosure: PropTypes.string,
  modal2Disclosure: PropTypes.string,
  modal3Disclosure: PropTypes.string,
};

export default AddLiquidity;
