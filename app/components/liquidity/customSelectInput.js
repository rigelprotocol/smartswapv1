/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import { tokenWhere } from '../../utils/constants';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import BUSDImage from '../../assets/busd.svg';
import ETHImage from '../../assets/eth.svg';
import RGPImage from '../../assets/rgp.svg';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ArrowDownImage from '../../assets/arrow-down.svg';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';

const CustomSelectInput = ({
  selectingToken,
  defaultSelect,
  selectedToken,
  setSelectedToken,
  RGPBalance,
  ETHBalance,
  BUSDBalance
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSpinList, setShowSpinList] = useState(false);
  const [defaultSelectText, setDefaultSelectText] = useState(
    selectingToken[defaultSelect],
  );
  // This method handles the display of option list
  const handleListDisplay = () => {
    setShowSpinList(!showSpinList);
  };
  const handleOptionClick = e => {
    const obj = tokenWhere(e.target.getAttribute('data-id'));
    setDefaultSelectText(obj);
    setShowSpinList(false);
    selectedToken(obj);
    setSelectedToken(obj);
  };
  console.log(BUSDBalance, ETHBalance, RGPBalance)
  return (
    <>
      {/* <Flex alignItems="center">
        <div classsymbol={styles.customSelectContainer}>
          <div
            className={
              showSpinList
                ? `${styles.selectedText} ${styles.active}`
                : `${styles.selectedText}`
            }
            role="button"
            onClick={handleListDisplay}
          >
            <div>
              {' '}
              {defaultSelectText.symbol === 'BUSD' && <BNBImage mr="3" />}
              {defaultSelectText.symbol === 'WETH' && <ETHImage mr="3" />}
              {defaultSelectText.symbol === 'RGP' && <RGPImage mr="3" />}{' '}
              {!defaultSelectText.symbol
                ? defaultSelectText.name
                : defaultSelectText.symbol}
            </div>
          </div>
          {showSpinList && (
            <ul className={styles.selectOptions}>
              {selectingToken.map(option => (
                <li
                  className={styles.customSelectOption}
                  data-id={option.symbol}
                  key={option.symbol}
                  onClick={handleOptionClick}
                >
                  {option.symbol === 'BUSD' && <BNBImage mr="3" />}
                  {option.symbol === 'WETH' && <ETHImage mr="3" />}
                  {option.symbol === 'RGP' && <RGPImage mr="3" />}{' '}
                  {!option.symbol
                    ? `${option.name}`
                    : `${option.symbol}: `}{' '}
                  {option.symbol === 'BUSD' && BUSDBalance}
                  {option.symbol === 'WETH' && ETHBalance}
                  {option.symbol === 'RGP' && RGPBalance}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Flex>
    */}
      <Button
        onClick={onOpen}
        border="0px"
        h="30px"
        fontWeight="regular"
        fontSize="16px"
        cursor="pointer"
        bg={defaultSelectText.name ? 'none' : '#40BAD5'}
        marginBottom="5px"
        color="white"
        _hover={{ background: '#72cfe4', color: '#29235E' }}
        rightIcon={<ChevronDownIcon />}
      >
        {defaultSelectText.symbol === "BNB" && <BNBImage />}
        {defaultSelectText.symbol === "ETH" && <ETHImage />}
        {defaultSelectText.symbol === "RGP" && <RGPImage />}
        <Text ml={4}>{defaultSelectText.symbol}</Text>
      </Button>
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
            {/* <Flex
              justifyContent="space-between"
              mt={3}
              cursor="pointer"
              onClick={() => {
                setSelectedToken(TOKENS.BNB);
                setPathArray(TOKENS_CONTRACT.BNB, "BNB");
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
          */}
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                selectedToken(selectingToken[1]);
                setSelectedToken(selectingToken[1]);
                setDefaultSelectText(selectingToken[1])
                onClose();
              }}
            >
              <Flex alignItems="center">
                <BUSDImage />
                <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
                  {selectingToken[1].symbol}
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="regular" color="#fff">
                {BUSDBalance}
              </Text>
            </Flex>

            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                selectedToken(selectingToken[2]);
                setSelectedToken(selectingToken[2]);
                onClose();
                setDefaultSelectText(selectingToken[2])
              }}
            >
              <Flex alignItems="center">
                <ETHImage />
                <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
                  {selectingToken[2].symbol}
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
                selectedToken(selectingToken[3]);
                setSelectedToken(selectingToken[3]);
                setDefaultSelectText(selectingToken[3])
                onClose();
              }}
            >
              <Flex alignItems="center">
                <RGPImage />
                <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
                  {selectingToken[3].symbol}
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="regular" color="#fff">
                {RGPBalance}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>

    </>
  );
};
CustomSelectInput.propTypes = {
  selectingToken: PropTypes.array.isRequired,
  defaultSelect: PropTypes.number.isRequired,
  selectedToken: PropTypes.func,
  setSelectedToken: PropTypes.func,
};
export default CustomSelectInput;
