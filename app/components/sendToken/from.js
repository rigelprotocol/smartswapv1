// @ts-nocheck
import React, { useState, useEffect } from 'react';
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

import { BUSDToken, router } from 'utils/SwapConnect';
import { connect } from 'react-redux';
import { ethers } from 'ethers';
import InputSelector from './InputSelector';
import RGPImage from '../../assets/rgp.svg';
import BNBImage from '../../assets/bnb.svg';
import ArrowDownImage from '../../assets/arrow-down.svg';
import ETHImage from '../../assets/eth.svg';
import { TOKENS, TOKENS_CONTRACT, SMART_SWAP } from '../../utils/constants';

const From = ({
  fromAmount,
  handleChangeFromAmount,
  setPathArray,
  wallet,
  wallet_props,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedToken, setSelectedToken] = useState(TOKENS.RGP);
  const [rgpBalance, setRGPBalance] = useState('0.0');
  const [busdBalance, setBUSDBalance] = useState('0.0');
  const [ETHBalance, setETHBalance] = useState('0.0');

  //state value for smartSwap
  const [amountIn, setAmountIn] = useState('2');

  useEffect(() => {
    const getBalance = async () => {
      if (wallet.signer !== 'signer') {
        const bnb = await BUSDToken();
        setRGPBalance(wallet_props[0] ? wallet_props[0].rgp : '0.0');
        setETHBalance(wallet ? wallet.balance : '0.0');
        setBUSDBalance(
          ethers.utils
            .formatEther(await bnb.balanceOf(wallet.address))
            .toString(),
        );
      }
    };
    getBalance();
  }, [wallet]);

    // onclick of Approve should be set to (approval) for busd
  useEffect(() => {
    const busdApproval = async () => {
      if (wallet.signer !== 'signer') {
        const bnb = await BUSDToken();
        const walletBal = ethers.utils.parseUnits(await bnb.balanceOf(wallet.address)).toString();
        await bnb.approve(SMART_SWAP.SMART_SWAPPING, walletBal, { from: wallet.address });
      }
    };
    busdApproval();
  }, [wallet]);

     // onclick of Approve should be set to (approval) for busd
     useEffect(() => {
      const rgpApproval = async () => {
        if (wallet.signer !== 'signer') {
          const rgp = await rigelToken();
          const walletBal = ethers.utils.parseUnits(await rgp.balanceOf(wallet.address)).toString();
          await rgp.approve(SMART_SWAP.SMART_SWAPPING, walletBal, { from: wallet.address });
        }
      };
      rgpApproval();
    }, [wallet]);

  // useEffect(() => {
  //   const getOutPutPrice = async () => {
  //     if (wallet.signer !== 'signer') {
  //       const rout = await router();
  //       setAmountIn(amountIn);
  //       const passOutPut = ethers.utils.parseUnits("100").toString();
  //       const rgp = ethers.utils.getAddress(TOKENS_CONTRACT.RGP);
  //       const bnb = ethers.utils.getAddress(TOKENS_CONTRACT.BNB);
  //       const outPut = await rout.getAmountsOut(passOutPut, [rgp, bnb])
  //       console.log('AmountOut', outPut)
  //     }
  //   };
  //   getOutPutPrice();
  // }, [wallet]);

  // onclick of Enter an Amount should be set to (swapTokenForTokens)
  useEffect(() => {
    const swapTokenForTokens = async () => {
      if (wallet.signer !== 'signer') {
        const rout = await router();
        setAmountIn(amountIn);
        const deadL = Math.floor(new Date().getTime()/1000.0+300)
        const rgp = ethers.utils.getAddress(TOKENS_CONTRACT.RGP);
        const bnb = ethers.utils.getAddress(TOKENS_CONTRACT.BNB);
        const passOutPut = (amountIn);
        await rout.swapExactTokensForTokens(amountIn, passOutPut, [bnb, rgp], wallet.address, deadL,
          { from: wallet.address,
            gasLimit: 150000, gasPrice: ethers.utils.parseUnits('20', 'gwei')})
        console.log('Router', deadL)
      }
    };
    swapTokenForTokens();
  }, [wallet]);

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
          selectedToken={selectedToken}
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
                setSelectedToken(TOKENS.ETH);
                setPathArray(wallet.address);
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
const mapStateToProps = ({ wallet }) => ({
  wallet: wallet.wallet,
  wallet_props: wallet.wallet_props,
});

export default connect(
  mapStateToProps,
  {},
)(From);
