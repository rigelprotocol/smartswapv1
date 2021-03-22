/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { connect } from 'react-redux';
import { ethers } from 'ethers';
import { notify } from 'containers/NoticeProvider/actions';
import { BUSDToken, rigelToken, router } from '../../utils/SwapConnect';
import ArrowDownImage from '../../assets/arrow-down.svg';
import From from './from';
import To from './to';
import SwapSettings from "./SwapSettings";
import { SMART_SWAP, TOKENS_CONTRACT } from "../../utils/constants";

const Manual = props => {

  const [fromAmount, setFromAmount] = useState('');
  const [path, setPath] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedToToken, setSelectedToToken] = useState('');
  const [rgpBalance, setRGPBalance] = useState('0.0');
  const [busdBalance, setBUSDBalance] = useState('0.0');
  const [ETHBalance, setETHBalance] = useState('0.0');
  const [amountIn, setAmountIn] = useState('5');

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
  const { wallet, wallet_props } = props.wallet;
  /**
   * @describe this Function is suppose to get the
   * amount of token for the ToField
   * @param {*} tokenAddress
   * @param {*} symbol
   */
  
  const getToAmount = async (tokenAddress, symbol) => {
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const { fromPath } = path[0]
      const { toPath } = path[1]
      const amount = await rout.getAmountsOut(SMART_SWAP.SMART_SWAPPING, fromAmount, [fromPath, toPath]);
      console.log("starting......", fromPath, toPath, amount);
    }
    console.log('Final Show');
  };

  const rgpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      await rgp.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
        from: wallet.address,
      });
    }
  };
  
  // console.log("get otput amount", amountIn)

  // useEffect(() => {
    const swapTokenForTokens = async () => {
      if (wallet.signer !== 'signer') {
        const rout = await router();
        // setAmountIn(amountIn);
        const deadL = Math.floor(new Date().getTime() / 1000.0 + 300);
        const rgp = ethers.utils.getAddress(TOKENS_CONTRACT.RGP);
        const bnb = ethers.utils.getAddress(TOKENS_CONTRACT.BNB);
        const passOutPut = amountIn;
        await rout.swapExactTokensForTokens(
          amountIn,
          passOutPut,
          [bnb, rgp],
          wallet.address,
          deadL,
          {
            from: wallet.address,
            gasLimit: 150000,
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
          },
        );
        console.log("Amount Input: ", amountIn, "OutputAmount: ", passOutPut,
         "From: ", bnb, "To: ", rgp, "Recipient: ", wallet.address,
          'Deadline: ', deadL);
      }
    };
  //   swapTokenForTokens();
  // }, [wallet]);

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


  const sendNotice = (message) => {
    props.notify({
      title: 'Site Information',
      body: message,
      type: 'info'
    })
  }

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
          getToAmount={getToAmount}
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
                sendNotice('Please use the Connect button above')
                : typeof wallet.signer === 'object' && fromAmount == parseFloat(0.0)
                  ? sendNotice('Enter the amount of token to exchange')
                  : typeof wallet.signer === 'object' && fromAmount != parseFloat(0.0) && selectedToToken === 'Select a token'
                    ? sendNotice('Select the designated token')
                    : typeof wallet.signer === 'object' &&
                      fromAmount != parseFloat(0.0) && selectedToToken !== 'Select a token'
                      ? swapTokenForTokens()
                      // ? rgpApproval()
                      : swapTokenForTokens()
                      
            }}
          >
            {wallet.signer === 'signer' ?
              'connect to Wallet'
              : typeof wallet.signer === 'object' && fromAmount == parseFloat(0.0)
                ? 'Enter Amount'
                : typeof wallet.signer === 'object' && fromAmount != parseFloat(0.0) && selectedToToken === 'Select a token'
                  ? 'Click Select a Token'
                  : typeof wallet.signer === 'object' &&
                    fromAmount != parseFloat(0.0) && selectedToToken !== 'Select a token'
                    ? 'Swap Amount'
                    : 'Approve Amount'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};
const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(
  mapStateToProps,
  { notify },
)(Manual);

function setPathObject(path, target) {
  const pathObject = path.find(value => value.hasOwnProperty('fromPath'));
  if (pathObject) pathObject.fromPath = target;
  else path.push({ fromPath: target });
}
