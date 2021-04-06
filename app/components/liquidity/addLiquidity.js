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
import LiquidityFromBox from 'components/liquidity/from';
import To from 'components/liquidity/to';
import React from 'react';
import PropTypes from 'prop-types';
import ApproveBox from './ApproveBox';
import LiquidityPriceBox from './LiquidityPriceBox';
import Question from '../../assets/question.svg';
import Plus from '../../assets/plus-c.svg';
import ArrowLeft from '../../assets/arrow-left.svg';
import BNBImage from '../../assets/bnb.svg';
import ETHImage from '../../assets/eth.svg';
import RGPImage from '../../assets/rgp.svg';

const AddLiquidity = ({
  wallet,
  fromValue,
  setFromValue,
  toValue,
  setFromAddress,
  setToAddress,
  selectingToken,
  setSelectedValue,
  fromSelectedToken,
  toSelectedToken,
  setFromSelectedToken,
  setToSelectedToken,
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
    {approveBNBPopup ? <ApproveBox popupText={popupText} /> : <div />}
    <Flex justifyContent="space-between" alignItems="center" px={4}>
      <ArrowLeft cursor="pointer" onClick={back} />
      <Text color="gray.200">Add Liquidity</Text>
      <Question />
    </Flex>

    <LiquidityFromBox
      wallet={wallet}
      fromValue={fromValue}
      selectingToken={selectingToken}
      setFromAddress={setFromAddress}
      setFromValue={e => setFromValue(e)}
      fromSelectedToken={fromSelectedToken}
      setFromSelectedToken={setFromSelectedToken}
    />
    <Flex justifyContent="center" my={3}>
      <Plus />
    </Flex>
    <To
      wallet={wallet}
      toValue={toValue}
      setToAddress={setToAddress}
      selectedValue={selectedValue}
      selectingToken={selectingToken}
      toSelectedToken={toSelectedToken}
      setToSelectedToken={setToSelectedToken}
      selectedToken={val => setSelectedValue(val)}
    />
    {selectedValue.symbol && fromValue > 0 ? (
      <LiquidityPriceBox
        selectedValue={selectedValue}
        fromValue={fromValue}
        toValue={toValue}
        fromSelectedToken={fromSelectedToken}
      />
    ) : (
      <div />
    )}
    <Box mt={5} p={5}>
      {selectedValue.symbol && fromValue > 0 && toValue > 0 ? (
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
          Approve {selectedValue.symbol}
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
            {toValue}
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
  setFromAddress: PropTypes.func,
  setToAddress: PropTypes.func,
  wallet: PropTypes.object,
  fromValue: PropTypes.string.isRequired,
  setFromValue: PropTypes.func.isRequired,
  setFromSelectedToken: PropTypes.func.isRequired,
  fromSelectedToken: PropTypes.object.isRequired,
  toValue: PropTypes.string.isRequired,
  toSelectedToken: PropTypes.object.isRequired,
  setToSelectedToken: PropTypes.func.isRequired,
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
