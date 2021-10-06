/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Circle } from '@chakra-ui/layout';
import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/hooks';
import { ChevronDownIcon } from '@chakra-ui/icons';
import TokenListBox from 'components/TokenListBox';
import NullImage24 from '../../assets/Null-24.svg';
import {
  NumberInput,
  NumberInputField,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import { erc20Token } from '../../utils/SwapConnect';
import { ethers } from 'ethers';

const LiquidityFromBox = ({
  fromValue,
  setFromValue,
  setFromAddress,
  setDetermineInputChange,
  checkIfLiquidityPairExist,
  fromSelectedToken,
  setFromSelectedToken,
  setFromInputMax,
  label,
  wallet,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [isMobileDevice] = useMediaQuery('(min-width: 560px)');

  const [balance, setBalance] = useState('');

  useEffect(() => {
    const getBalance = async () => {
      if (wallet.wallet.address != '0x') {
        try {
          const token = await erc20Token(fromSelectedToken.address);
          const balance = await token.balanceOf(wallet.wallet.address);
          const formattedBalance = ethers.utils.formatEther(balance).toString();
          setBalance(parseFloat(formattedBalance).toFixed(4));
        } catch (err) {
          setBalance('');
        }
      }
    };

    getBalance();
  }, [wallet]);

  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        paddingBottom="10px"
        mb="10px"
        justifyContent="space-between"
        px={isMobileDevice ? '4' : '2'}
        mx={4}
        mt={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="rgba(255, 255, 255, 0.5)">
            {label || 'From'}
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {` `}
            {fromSelectedToken.balance ? fromSelectedToken.balance : balance}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <InputGroup>
            <NumberInput
              onChange={value => {
                setFromValue(value);
                setDetermineInputChange('from');
              }}
              variant="unstyled"
              value={fromValue}
            >
              <NumberInputField
                padding="0"
                border="0"
                placeholder="0.0"
                fontSize="24px"
                paddingRight="40px"
                color="#FFFFFF"
                opacity="0.5"
              />
            </NumberInput>

            <InputRightElement marginRight="5px">
              <Text
                cursor="pointer"
                color="rgba(64, 186, 213, 1)"
                onClick={() => setFromInputMax()}
                marginTop="3px"
              >
                max
              </Text>
            </InputRightElement>
          </InputGroup>

          <Flex alignItems="center">
            <Menu>
              <Button
                onClick={onOpen}
                border="0px"
                h="30px"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                bg={fromSelectedToken.name ? 'none' : '#40BAD5'}
                marginBottom="5px"
                color="white"
                px="3"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
                rightIcon={<ChevronDownIcon />}
              >
                {typeof fromSelectedToken.symbol !== 'undefined' &&
                  fromSelectedToken.symbol !== 'SELECT A TOKEN' &&
                  !fromSelectedToken.imported && (
                    <>
                      <Circle size="40px" color="rgba(64, 186, 213,0.35)">
                        <Image src={fromSelectedToken.logoURI} />
                      </Circle>
                    </>
                  )}
                {fromSelectedToken.imported && (
                  <Box px="0">
                    <NullImage24 />
                  </Box>
                )}
                <Text
                  ml={fromSelectedToken.symbol !== 'SELECT A TOKEN' ? '4' : '0'}
                >
                  {fromSelectedToken.symbol}
                </Text>
              </Button>
              <TokenListBox
                setSelectedToken={setFromSelectedToken}
                setPathArray={setFromAddress}
                isOpen={isOpen}
                checkIfLiquidityPairExist={checkIfLiquidityPairExist}
                onClose={onClose}
                isOpenModal={isOpenModal}
                onOpenModal={onOpenModal}
                onCloseModal={onCloseModal}
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
LiquidityFromBox.propTypes = {
  fromValue: PropTypes.string.isRequired,
  setFromValue: PropTypes.func.isRequired,
  fromSelectedToken: PropTypes.object.isRequired,
  setFromAddress: PropTypes.func.isRequired,
  setFromSelectedToken: PropTypes.func.isRequired,
  checkIfLiquidityPairExist: PropTypes.func.isRequired,
  label: PropTypes.string,
  wallet: PropTypes.object,
};

export default LiquidityFromBox;
