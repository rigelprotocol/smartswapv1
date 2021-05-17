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
import { CheckIcon, CloseIcon, ArrowUpIcon } from '@chakra-ui/icons';
import LiquidityFromBox from 'components/liquidity/from';
import To from 'components/liquidity/to';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import ApproveBox from './ApproveBox';
import LiquidityPriceBox from './LiquidityPriceBox';
import Question from '../../assets/question.svg';
import Plus from '../../assets/plus-c.svg';
import ArrowLeft from '../../assets/arrow-left.svg';
import BreakdownBg from '../../assets/breakdown-bg.svg';


const AddLiquidity = ({
  wallet,
  fromValue,
  setFromValue,
  toValue,
  setFromAddress,
  setToAddress,
  approveToToken,
  approveFromToken,
  selectingToken,
  fromSelectedToken,
  toSelectedToken,
  setFromSelectedToken,
  setToSelectedToken,
  popupText,
  confirmingSupply,
  approveTokenSpending,
  approveToken,
  checkUser,
  isNewUser,
  buttonValue,
  openSupplyButton,
  open,
  back,
  closeModal1,
  closeModal2,
  closeModal3,
  closeModal4,
  closeModal5,
  closeModal6,
  modal1Disclosure,
  modal2Disclosure,
  modal3Disclosure,
  modal4Disclosure,
  modal5Disclosure,
  modal6Disclosure,
  showApprovalBox,
  hasAllowedToToken,
  hasAllowedFromToken,
  tokenFromValue,
  tokenToValue,
  handleFromAmount,
}) => (
  <Box
    bg="#120136"
    minHeight="50vh"
    w={['100%', '100%', '29.50%', '29.5%']}
    rounded="lg"
  >
    {isNewUser ? <ApproveBox popupText={popupText} /> : <div />}
    <Flex justifyContent="space-between" alignItems="center" px={4}>
      <ArrowLeft cursor="pointer" onClick={() => back('INDEX')} />
      <Text color="gray.200">Add Liquidity</Text>
      <Question />
    </Flex>

    <LiquidityFromBox
      label="input"
      fromValue={fromValue}
      setFromAddress={setFromAddress}
      setFromValue={setFromValue}
      handleFromAmount={handleFromAmount}
      fromSelectedToken={fromSelectedToken}
      setFromSelectedToken={setFromSelectedToken}
    />
    <Flex justifyContent="center" my={3}>
      <Plus />
    </Flex>
    <To
      label="input"
      toValue={toValue}
      setToAddress={setToAddress}
      toSelectedToken={toSelectedToken}
      setToSelectedToken={setToSelectedToken}
    />
    {toSelectedToken.symbol !== 'SELECT A TOKEN' && fromValue > 0 ? (
      <LiquidityPriceBox
        toSelectedToken={toSelectedToken}
        fromValue={fromValue}
        toValue={toValue}
        fromSelectedToken={fromSelectedToken}
      />
    ) : (
      <div />
    )}
    <Box mt={5} p={5}>
      {!hasAllowedToToken && (toSelectedToken.symbol !== "SELECT A TOKEN") && (toSelectedToken.symbol !== "BNB") && (
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
          onClick={approveToToken}
        >
          Approve {toSelectedToken.symbol}
        </Button>
      )}
      {!hasAllowedFromToken && (fromSelectedToken.symbol !== "SELECT A TOKEN") && (fromSelectedToken.symbol !== "BNB") && (
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
          onClick={approveFromToken}
        >
          Approve {fromSelectedToken.symbol}
        </Button>
      )}
      {!showApprovalBox && (
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
          // disabled={openSupplyButton}
          onClick={open}
        >
          {buttonValue}
        </Button>
      )}
    </Box>
    {/* modal 1 summary */}
    <Modal isOpen={modal1Disclosure.isOpen} onClose={closeModal1} isCentered>
      <ModalOverlay />
      <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
        <ModalCloseButton
          border="0px"
          color="#fff"
          cursor="pointer"
          rounded="2xl"
          bg={openSupplyButton ? '#444159' : 'rgba(64, 186, 213, 0.1)'}
          borderColor="#40BAD5"
          _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
          _active={{ outline: '#29235E', background: '#29235E' }}
          disabled={openSupplyButton}
        // onClick={open}
        />
        <ModalHeader fontSize="18px" fontWeight="regular" align="center">
          You will recieve
        </ModalHeader>
        <ModalBody>
          <h2>
            {Number(toValue).toFixed(5)}
            <span className={`icon icon-${toSelectedToken.symbol}`} />
          </h2>
          <Text mr="3" opacity="0.5">
            Output is estimated if the price changes by more than 0.5% your
            transaction will revert
          </Text>
          <Box p="3" background="#29235E" opacity="0.5" borderRadius="20px">
            <Flex m="1" justifyContent="space-between">
              <Text mt={-1}> {fromSelectedToken.symbol} </Text>
              <Box>{fromValue}</Box>
            </Flex>
            <Flex m="1" justifyContent="space-between">
              <Text mt={-1}> {toSelectedToken.symbol} Deposited </Text>
              <Box>{toValue}</Box>
            </Flex>
            <Flex m="1" justifyContent="space-between">
              <Text> Rates </Text>
              <Box textAlign="right">
                <Text>
                  1 {fromSelectedToken.symbol} = {tokenToValue}{' '}
                  {toSelectedToken.symbol}
                </Text>
                <Text>
                  1 {toSelectedToken.symbol} = {tokenFromValue}{' '}
                  {fromSelectedToken.symbol}
                </Text>
              </Box>
            </Flex>
            <Flex m="1" justifyContent="space-between">
              <Text> Share of Pool </Text>
              <Box>
                <Text>
                  {fromValue > 0 && toValue > 0
                    ? (parseFloat(fromValue) * 3) / 100
                    : 0.0}
                  %
                </Text>
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
            Supplying {fromValue} {fromSelectedToken.symbol} to {toValue}{' '}
            {toSelectedToken.symbol}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
    {/* modal 3 submitted */}
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
        <ModalBody align="center">
          <Circle size="60px" borderRadius="50%" bg="#68C18A" border="0">
            <CheckIcon color="white" w={8} h={8} />
          </Circle>
          <h4>Transaction submitted</h4>
          <Text>
            <a href="google.com">view on BSCSCAN</a>
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
    {/* modal 4 final confirmed */}
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
          <Circle size="70px" background="#68C18A" my={3}>
            <CheckIcon fontSize="40px" />
          </Circle>
          <Text fontSize="18px" fontWeight="normal">
            Transaction Succesful
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
    {/* modal 5  Transaction Result */}
    <Modal isOpen={modal5Disclosure.isOpen} onClose={closeModal5} isCentered>
      <ModalOverlay />
      <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
        <ModalCloseButton
          bg="none"
          border="0px"
          color="#fff"
          cursor="pointer"
          _focus={{ outline: 'none' }}
          onClick={closeModal5}
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
            onClick={closeModal5}
          >
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
    <Modal isOpen={modal6Disclosure.isOpen} onClose={closeModal6} isCentered>
      <ModalOverlay />
      <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
        <ModalBody>
          <Flex
            mx={5}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            minHeight="70vh"
            rounded="lg"
            mb={4}
          >
            <Spinner />
            <BreakdownBg />
            <Text fontSize="18px" fontWeight="normal">
              Waiting for Blockchain Confirmation
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  </Box>
);
AddLiquidity.propTypes = {
  showApprovalBox: PropTypes.bool,
  hasAllowedToToken: PropTypes.bool,
  hasAllowedFromToken: PropTypes.bool,
  setFromAddress: PropTypes.func,
  approveToToken: PropTypes.func,
  approveFromToken: PropTypes.func,
  setToAddress: PropTypes.func,
  wallet: PropTypes.object,
  fromValue: PropTypes.string.isRequired,
  setFromValue: PropTypes.func.isRequired,
  setFromSelectedToken: PropTypes.func.isRequired,
  fromSelectedToken: PropTypes.object.isRequired,
  toValue: PropTypes.string.isRequired,
  toSelectedToken: PropTypes.object.isRequired,
  setToSelectedToken: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  selectingToken: PropTypes.object.isRequired,
  popupText: PropTypes.string.isRequired,
  confirmingSupply: PropTypes.string.isRequired,
  approveTokenSpending: PropTypes.bool.isRequired,
  buttonValue: PropTypes.string.isRequired,
  openSupplyButton: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  closeModal1: PropTypes.func.isRequired,
  closeModal2: PropTypes.func.isRequired,
  closeModal3: PropTypes.func.isRequired,
  closeModal4: PropTypes.func.isRequired,
  closeModal5: PropTypes.func.isRequired,
  closeModal6: PropTypes.func.isRequired,
  modal1Disclosure: PropTypes.object,
  modal2Disclosure: PropTypes.object,
  modal3Disclosure: PropTypes.object,
  modal4Disclosure: PropTypes.object,
  modal5Disclosure: PropTypes.object,
  modal6Disclosure: PropTypes.object,
  approveLiquidityToken: PropTypes.func.isRequired,
  tokenFromValue: PropTypes.string.isRequired,
  tokenToValue: PropTypes.string.isRequired,
  handleFromAmount: PropTypes.func,
};

export default AddLiquidity;
