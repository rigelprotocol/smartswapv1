/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { connect } from 'react-redux';
import InputSelector from './InputSelector';
import TokenListBox from '../TokenListBox/index';
import { erc20Token } from '../../utils/SwapConnect';
import { ethers } from 'ethers';

const From = ({
  fromAmount,
  handleChangeFromAmount,
  setPathArray,
  checkIfLiquidityPairExist,
  selectedToken,
  setSelectedToken,
  wallet,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  // move this to the actually state created
  // useEffect(() => {
  //   setSelectedToken(tokenWhere('rgp'));
  // }, [wallet]);

  const [balance, setBalance] = useState('');

  useEffect(() => {
    const getBalance = async () => {
      if (wallet.wallet.address != '0x') {
        try {
          const token = await erc20Token(selectedToken.address);
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
        h="100%"
        justifyContent="space-between"
        px={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            From
          </Text>
          <Text pr={4} fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {selectedToken.balance ? selectedToken.balance : balance}
          </Text>
        </Flex>
        <InputSelector
          handleChange={handleChangeFromAmount}
          value={fromAmount}
          max
          onOpen={onOpen}
          selectedToken={selectedToken}
        />
      </Box>
      <TokenListBox
        setSelectedToken={setSelectedToken}
        setPathArray={setPathArray}
        isOpen={isOpen}
        onClose={onClose}
        checkIfLiquidityPairExist={checkIfLiquidityPairExist}
        isOpenModal={isOpenModal}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
      />
    </>
  );
};
const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(
  mapStateToProps,
  {},
)(From);
