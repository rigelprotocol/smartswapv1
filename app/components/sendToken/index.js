/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { connect } from 'react-redux';
import { BUSDToken } from 'utils/SwapConnect';
import { ethers } from 'ethers';
import ArrowDownImage from '../../assets/arrow-down.svg';
// eslint-disable-next-line import/no-cycle
import From from './from';
import To from './to';
import SwapSettings from './SwapSettings';

const Manual = props => {

  const [fromAmount, setFromAmount] = useState(0);
  const [path, setPath] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedToToken, setSelectedToToken] = useState('');
  const [rgpBalance, setRGPBalance] = useState('0.0');
  const [busdBalance, setBUSDBalance] = useState('0.0');
  const [ETHBalance, setETHBalance] = useState('0.0');
  const [amountIn, setAmountIn] = useState(0);

  const handleChangeToAmount = event => setAmountIn(event.target.value);
  const handleChangeFromAmount = event => setFromAmount(event.target.value);
  const setPathArray = target => {
    setPathObject(path, target);
  };
  const setPathToArray = target => {
    const pathObject = path.find(value => value.hasOwnProperty('toPath'));
    if (pathObject) pathObject.toPath = target;
    else path.push({ toPath: target });
  };

  console.info(path, selectedToToken);
  const { wallet, wallet_props } = props.wallet;

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

  return (
    <div>
      <Box
        boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
        bg="#120136"
        mt={3}
        p={5}
        rounded="2xl"
      >
        <SwapSettings />
        <From
          fromAmount={fromAmount}
          handleChangeFromAmount={handleChangeFromAmount}
          path={path}
          setPathArray={setPathArray}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          rgpBalance={rgpBalance}
          busdBalance={busdBalance}
          ETHBalance={ETHBalance}
          userWallet={props.wallet}
        />
        <Box textAlign="center">
          <ArrowDownImage />
        </Box>
        <To
          userWallet={props.wallet}
          amountIn={amountIn}
          handleChangeToAmount={handleChangeToAmount}
          setPathToArray={setPathToArray}
          setAmountIn={setAmountIn}
          selectedToToken={selectedToToken}
          setSelectedToToken={setSelectedToToken}
          rgpBalance={rgpBalance}
          busdBalance={busdBalance}
          ETHBalance={ETHBalance}
        />
        <Box mt={14}>
          <Button
            d="block"
            w="100%"
            h="50px"
            color="#40BAD5"
            border="none"
            fontWeight="regular"
            fontSize="lg"
            cursor="pointer"
            rounded="2xl"
            bg="rgba(64, 186, 213,0.25)"
            borderColor="#40BAD5"
            _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
            _active={{ outline: '#29235E', background: '#29235E' }}
            onClick={() => {
              wallet.signer === 'signer' ?
                console.log('connect to Wallet')
                : typeof wallet.signer === 'object' && fromAmount == parseFloat(0.0)
                  ? console.log('Enter Amount')
                  : typeof wallet.signer === 'object' && fromAmount != parseFloat(0.0) && selectedToToken === 'Select a token'
                    ? console.log('Select a Token')
                    : typeof wallet.signer === 'object' &&
                      fromAmount != parseFloat(0.0) && selectedToToken !== 'Select a token'
                      ? console.log('Approve Amount')
                      : console.log('Swap Amount');
            }}
          >
            Enter an Amount
          </Button>
        </Box>
      </Box>
    </div>
  );
};
const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(
  mapStateToProps,
  {},
)(Manual);

function setPathObject(path, target) {
  const pathObject = path.find(value => value.hasOwnProperty('fromPath'));
  if (pathObject) pathObject.fromPath = target;
  else path.push({ fromPath: target });
}
