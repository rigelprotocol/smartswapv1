/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// @ts-nocheck

/**
 * @TODO
 * @Balance_Checker
 * @description => User can't type more than what is in their balance return the user
 * balance
 *
*/
import React, { useState, useEffect } from 'react';
import { useDisclosure, Spinner } from '@chakra-ui/react';
import { Box, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { connect } from 'react-redux';
import { ethers } from 'ethers';
import { notify } from 'containers/NoticeProvider/actions';
import Web3 from 'web3';
import { approveToken, runApproveCheck } from 'utils/wallet-wiget/TokensUtils';
import { getPriceForToken } from 'containers/HomePage/service/swapServices';

import { router, WETH, updateOutPutAmountForRouter } from '../../utils/SwapConnect';
import ArrowDownImage from '../../assets/arrow-down.svg';
import From from './from';
import To from './to';
import SwapSettings from "./SwapSettings";
import { tokenAddressWhere } from "../../utils/constants";
import ShowMessageBox from "../Toast/ShowMessageBox";
import ConfirmSwapBox from './ConfirmSwapBox';
import { changeDeadlineValue } from '../../containers/WalletProvider/actions';

export const Manual = props => {
  const { wallet } = props.wallet;
  const [fromAmount, setFromAmount] = useState('');
  const [path, setPath] = useState([{ fromPath: tokenAddressWhere('RGP'), token: "RGP" }]);
  const [showBox, setShowBox] = useState(false);
  const [amountIn, setAmountIn] = useState('');
  const [tokenPrice, setTokenPrice] = useState('')
  const [boxMessage, setBoxMessage] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedToToken, setSelectedToToken] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);
  const [userHasApproveToken, setUserHasApproveToken] = useState(false)
  const [transactionDeadline, setTransactionDeadline] = useState("")
  const [actualTransactionDeadline, setActualTransactionDeadline] = useState(Math.floor(new Date().getTime() / 1000.0 + 1200))
  const [slippageValue, setSlippageValue] = useState("0.5")
  const [tokenAllowance, setTokenAllowance] = useState('');
  const [disableSwapTokenButton, setDisableSwapTokenButton] = useState(true)

  useEffect(() => {
    (fromAmount.length > 0) && callTransformFunction(fromAmount, 'from');
    checkForAllVariables()
  }, [path, selectedToken, selectedToToken, wallet, slippageValue])

  useEffect(() => {
    props.changeDeadlineValue({ actualTransactionDeadline, slippageValue })
  }, [transactionDeadline, slippageValue])


  useEffect(async () => {
    if (wallet.signer !== 'signer') {
      if (selectedToken.symbol === 'BNB') {
        return setUserHasApproveToken(true)
      }
      const allowance = await runApproveCheck(selectedToken, wallet.address, wallet.signer);
      setTokenAllowance(allowance);
      return allowance > 0 ? setUserHasApproveToken(true) : setUserHasApproveToken(false);
    }
  }, [selectedToken, wallet]);

  useEffect(() => {
    if (selectedToken.balance !== undefined && parseFloat(fromAmount) > parseFloat(selectedToken.balance)) {
      setFromAmount(selectedToken.balance)
    }
    if (tokenAllowance < fromAmount) {
      setUserHasApproveToken(false)
    }
  }, [fromAmount, amountIn]);

  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const modal3Disclosure = useDisclosure();
  const modal4Disclosure = useDisclosure();

  // handling change ev
  const handleChangeToAmount = (event) => {
    setAmountIn(event.target.value);
    getToAmount(event.target.value, 'to');
  };

  const handleChangeFromAmount = (event, balance) => {
    const { value } = event.target;
    setFromAmount(value || balance)
    getToAmount(value || balance, 'from');
  };

  const setPathArray = (target, token) => {
    const pathObject = path.filter(value => !value.hasOwnProperty('fromPath'));
    const newArray = [{ fromPath: target, token }, ...pathObject]
    setPath(newArray)
  };

  const setPathToArray = (target, token) => {
    const pathObject = path.filter(value => !value.hasOwnProperty('toPath'));
    const newArray = [...pathObject, { toPath: target, token }]
    setPath(newArray)
  };

  const isLoggedIn = () => {
    if (wallet.signer === "signer") {
      return false
    }
    return true

  }
  const calculateSlippage = (amountIn) => {
    let calculatedVal
    if (slippageValue === "1") {
      calculatedVal = amountIn + (amountIn * parseInt(slippageValue) / 100)
    } else if (slippageValue === "0.1") {
      calculatedVal = amountIn - (amountIn * parseFloat(slippageValue) / 100)
    } else if (slippageValue === "0.5") {
      calculatedVal = amountIn
    }
    return calculatedVal.toString()
  }

  const checkForAllVariables = () => {
    if (isLoggedIn() && fromAmount > 0 && selectedToToken.name !== 'Select a token') {
      setDisableSwapTokenButton(false)
      return true;
    }
    setDisableSwapTokenButton(true)
    return false;
  }

  const getToAmount = async (fromQty, field) => {
    const askAmount = (!fromQty && !field) ? fromAmount : fromQty;
    callTransformFunction(askAmount, field)
  };

  const callTransformFunction = async (askAmount = '', field = "from") => {
    if (wallet.signer !== 'signer' && askAmount.length > 0 && path[1]) {
      if ((selectedToken.symbol === "RGP" && selectedToToken.symbol === "BUSD") || (selectedToken.symbol === "BUSD" && selectedToToken.symbol === "RGP")) {
        await updateSendAmount(path, selectedToken, selectedToToken, askAmount, setAmountIn, setShowBox, setBoxMessage, setFromAmount, field, calculateSlippage);
        setDisableSwapTokenButton(false);
      } else if ((selectedToken.symbol === "RGP" && selectedToToken.symbol === "BNB") || (selectedToken.symbol === "BNB" && selectedToToken.symbol === "RGP")) {
        await update_RGP_ETH_SendAmount(selectedToken, selectedToToken, path, askAmount, setAmountIn, setShowBox, setBoxMessage, setFromAmount, field, calculateSlippage)
        setDisableSwapTokenButton(false);
      } else if ((selectedToken.symbol === "WBNB" && selectedToToken.symbol === "BNB") || (selectedToken.symbol === "BNB" && selectedToToken.symbol === "WBNB")) {
        await update_WETH_ETH_SendAmount(askAmount, setAmountIn, amountIn, setFromAmount, field, calculateSlippage);
        setDisableSwapTokenButton(false);
      } else {
        await updateSendAmount(path, selectedToken, selectedToToken, askAmount, setAmountIn, setShowBox, setBoxMessage, setFromAmount, field, calculateSlippage);
        setDisableSwapTokenButton(false)
      }
      setDisableSwapTokenButton(false)

    } else {
      setAmountIn('')
      setDisableSwapTokenButton(true)
    }
  }

  const swapUserToken = async () => {
    if ((selectedToken.symbol === "RGP" && selectedToToken.symbol === "BUSD") || (selectedToken.symbol === "BUSD" && selectedToToken.symbol === "RGP")) {
      await swapTokenForTokens()
    } else if ((selectedToken.symbol === "RGP" && selectedToToken.symbol === "WBNB") || (selectedToken.symbol === "WBNB" && selectedToToken.symbol === "RGP")) {
      await swapTokenForTokens()
    } else if (selectedToken.symbol === "BNB" && selectedToToken.symbol === "WBNB") {
      await deposit()
    } else if (selectedToken.symbol === "WBNB" && selectedToToken.symbol === "BNB") {
      await withdraw()
    }
    else if (
      (selectedToken.symbol === "BNB" && selectedToToken.symbol === "RGP") ||
      (selectedToken.symbol === "BNB" && selectedToToken.symbol === "BUSD")
    ) {
      await swapETHForExactToken()
    } else if (
      (selectedToken.symbol === "RGP" && selectedToToken.symbol === "BNB") ||
      (selectedToken.symbol === "BUSD" && selectedToToken.symbol === "BNB")
    ) {
      await swapExactTokenForETH()
    } else {
      await swapTokenForTokens();
    }
  }

  const triggerAccountCheck = async () => {
    if (checkForAllVariables()) {
      if (userHasApproveToken) {
        return openModal1()
      }
      setIsSendingTransaction(true);
      const sendTransaction = await approveToken(wallet.address, selectedToken.address, wallet.signer, fromAmount)
      const { confirmations, status } = await sendTransaction.wait(3);
      if (typeof sendTransaction.hash != 'undefined' && confirmations >= 3 && status) {
        setIsSendingTransaction(false);
        return setUserHasApproveToken(true);
      }
    }
  }

  const openLoadingSpinnerAndSwap = async () => {
    await swapUserToken()
  }
  const swapTokenForTokens = async () => {
    if (wallet.signer !== 'signer') {
      openModal2()
      const rout = await router();
      const deadL = actualTransactionDeadline;
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      try {
        setIsSendingTransaction(true)
        const sendTransaction = await rout.swapExactTokensForTokens(
          Web3.utils.toWei(fromAmount.toString()),
          Web3.utils.toWei(amountIn.toString()),
          [fromPath, toPath],
          wallet.address,
          deadL,
          {
            from: wallet.address,
            gasLimit: 290000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          },
        );
        props.notify({ title: 'Transaction  Message', body: 'Swap Execution in progress', type: 'success' })
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (typeof sendTransaction.hash != 'undefined' && confirmations >= 3 && status) {
          setIsSendingTransaction(false);
          props.notify({ title: 'Transaction  Message', body: 'Swap was successful and is confirmed', type: 'success' })
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000)
        props.notify({ title: 'Transaction Message', body: e.message, type: 'error' })
      }
    }
  };

  const swapETHForExactToken = async () => {
    if (wallet.signer !== 'signer') {
      openModal2()
      const rout = await router();
      const deadL = actualTransactionDeadline;
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      const inputAmount = Web3.utils.toWei(amountIn.toString());
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await rout.swapETHForExactTokens(
          inputAmount.toString(),
          [fromPath, toPath],
          wallet.address,
          deadL,
          {
            value: Web3.utils.toWei(fromAmount.toString()),
          },
        );
        props.notify({ title: 'Transaction  Message', body: 'Swap execution in process', type: 'success' })
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (typeof sendTransaction.hash != 'undefined' && confirmations >= 3 && status) {
          setIsSendingTransaction(false);
          props.notify({ title: 'Transaction  Message', body: 'Swap was successful and is confirmed', type: 'success' })
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000)
        props.notify({ title: 'Transaction Message', body: e.message, type: 'error' })
      }
    }
  };

  const swapExactTokenForETH = async () => {
    if (wallet.signer !== 'signer') {
      openModal2()
      const rout = await router();
      const deadL = actualTransactionDeadline;
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      const inputAmount = Web3.utils.toWei(amountIn.toString());
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await rout.swapExactTokensForETH(
          Web3.utils.toWei(fromAmount.toString()),
          inputAmount,
          [fromPath, toPath],
          wallet.address,
          deadL,
        );
        props.notify({ title: 'Transaction  Message', body: 'Swap Execution in progress', type: 'success' });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (typeof sendTransaction.hash != 'undefined' && confirmations >= 3 && status) {
          setIsSendingTransaction(false);
          props.notify({ title: 'Transaction  Message', body: 'Swap was successful and is confirmed', type: 'success' });
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000)
        props.notify({ title: 'Transaction Message', body: e.message, type: 'error' })
      }
    }
  };


  const deposit = async () => {
    if (wallet.signer !== 'signer') {
      openModal2()
      const weth = await WETH();
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await weth.deposit(
          {
            value: Web3.utils.toWei(fromAmount.toString()),
          },
        );
        props.notify({ title: 'Transaction  Message', body: 'Swap Execution in progress', type: 'success' })
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (typeof sendTransaction.hash != 'undefined' && confirmations >= 3 && status) {
          setIsSendingTransaction(false);
          props.notify({ title: 'Transaction  Message', body: 'Swap was successful and is confirmed', type: 'success' })
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000)
        props.notify({ title: 'Transaction Message', body: e.message, type: 'error' })
      }
    }
  };

  const withdraw = async () => {
    if (wallet.signer !== 'signer') {
      openModal2()
      const weth = await WETH();
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await weth.withdraw(Web3.utils.toWei(fromAmount.toString()));
        props.notify({ title: 'Transaction  Message', body: 'Swap Execution in progress', type: 'success' })
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (typeof sendTransaction.hash != 'undefined' && confirmations >= 3 && status) {
          setIsSendingTransaction(false);
          props.notify({ title: 'Transaction  Message', body: 'Swap was successful and is confirmed', type: 'success' })
        }
      } catch (e) {
        setTimeout(() => openModal4(), 1000)
        props.notify({ title: 'Transaction Message', body: e.message, type: 'error' })
      }
    }
  };

  const resetAllField = () => {
    setFromAmount('')
    setAmountIn('')
    // setSelectedToken(tokenWhere('rgp'));
    // setSelectedToToken(tokenWhere('SELECT A TOKEN'));
    // setPath([{ fromPath: tokenAddressWhere('RGP'), token: "RGP" }, { toPath: '', token: '' }])
  }

  const sendNotice = (message) => props.notify({
    title: 'Site Information',
    body: message,
    type: 'info'
  })

  // open First Modal
  const openModal1 = async () => {
    const data = await getPriceForToken(wallet, selectedToken, selectedToToken)
    const convertPriceToEther = Web3.utils.fromWei(data.split(",")[1])
    setTokenPrice(convertPriceToEther)
    modal1Disclosure.onOpen();
  }

  const closeModal1 = () => {
    modal1Disclosure.onClose();
  };
  // open second Modal
  const openModal2 = () => {
    modal2Disclosure.onOpen();
  }

  const closeModal2 = () => {
    modal2Disclosure.onClose();
  };
  // open third Modal
  const openModal3 = () => {
    modal3Disclosure.onOpen();
  }

  const closeModal3 = () => {
    modal3Disclosure.onClose();
    closeAllModals()
  };

  const openModal4 = () => {
    modal4Disclosure.onOpen();
  }

  const closeModal4 = () => {
    modal4Disclosure.onClose();
    closeAllModals()
  };
  const closeAllModals = () => {
    setTimeout(() => closeModal2(), 500)
    setTimeout(() => closeModal1(), 1200)
    setTimeout(() => resetAllField(), 1800)
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
        <SwapSettings
          transactionDeadline={transactionDeadline}
          setTransactionDeadline={setTransactionDeadline}
          setActualTransactionDeadline={setActualTransactionDeadline}
          slippageValue={slippageValue}
          setSlippageValue={setSlippageValue}
          showErrorMessage={showErrorMessage}
          setShowErrorMessage={setShowErrorMessage}
        />
        <From
          fromAmount={fromAmount}
          handleChangeFromAmount={handleChangeFromAmount}
          path={path}
          setPathArray={setPathArray}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          getToAmount={getToAmount}
          userWallet={props.wallet}
          setPath={setPath}
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
          getToAmount={getToAmount}
        />
        {/* approveSelectedToken() */}
        {showBox && <ShowMessageBox boxMessage={boxMessage} />}
        <Box mt={14}>
          {isSendingTransaction ?
            <Stack direction="row" spacing={4}>
              <Spinner size="xs" color="red.500" />
            </Stack> :
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
              disabled={disableSwapTokenButton}
              onClick={() =>
                wallet.signer === 'signer' ?
                  sendNotice('Please use the Connect button above')
                  : (typeof wallet.signer === 'object' && fromAmount === undefined) || fromAmount.length == parseFloat(0.0)
                    ? sendNotice('Enter the amount of token to exchange')
                    : typeof wallet.signer === 'object' && fromAmount > parseFloat(0) && selectedToToken.name === 'Select a token'
                      ? sendNotice('Select the designated token')
                      : typeof wallet.signer === 'object' &&
                        fromAmount != parseFloat(0.0) && selectedToToken.name !== 'Select a token'
                        ? selectedToken.symbol == selectedToToken.symbol ? sendNotice('Improper token selection, you selected the same token') : triggerAccountCheck() : null
              }
            >
              {wallet.signer === 'signer' ?
                'connect to Wallet'
                : (typeof wallet.signer === 'object' && fromAmount === undefined) || fromAmount.length == parseFloat(0.0)
                  ? 'Enter Amount'
                  : typeof wallet.signer === 'object' && fromAmount != parseFloat(0.0) && selectedToToken.name === 'Select a token'
                    ? 'Click Select a Token'
                    : typeof wallet.signer === 'object' &&
                      fromAmount != parseFloat(0.0) && selectedToToken.name !== 'Select a token'
                      ? (selectedToken.symbol == selectedToToken.symbol ? 'Improper token selection' :
                        (!userHasApproveToken) ? 'Approve Transaction' : 'Swap Tokens')
                      : ''
              }
            </Button>
          }
        </Box>
        <ConfirmSwapBox
          path={path}
          amountIn={amountIn}
          fromAmount={fromAmount}
          closeModal1={closeModal1}
          closeModal2={closeModal2}
          closeModal3={closeModal3}
          closeModal4={closeModal4}
          tokenPrice={tokenPrice}
          selectedToken={selectedToken}
          selectedToToken={selectedToToken}
          modal1Disclosure={modal1Disclosure}
          modal2Disclosure={modal2Disclosure}
          modal3Disclosure={modal3Disclosure}
          modal4Disclosure={modal4Disclosure}
          openLoadingSpinnerAndSwap={openLoadingSpinnerAndSwap}
        />
      </Box>
    </div>
  );
}
const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(
  mapStateToProps,
  { notify, changeDeadlineValue },
)(Manual);

async function updateSendAmount(path, selectedToken, selectedToToken, askAmount, setAmountIn, setShowBox, setBoxMessage, setFromAmount, field, calculateSlippage) {
  const rout = await updateOutPutAmountForRouter();
  if (typeof path[1] != 'undefined') {
    const fromPath = selectedToken.address;
    const toPath = selectedToToken.address;
    try {
      setShowBox(false);
      setBoxMessage('...');
      const amount = await rout.getAmountsOut(
        Web3.utils.toWei(askAmount.toString()),
        (field != 'to') ? [fromPath, toPath] : [toPath, fromPath]
      );
      // if(field != 'to' && )
      return (field != 'to') ? setAmountIn(
        ethers.utils.formatEther(calculateSlippage(amount[1].toString()))) : setFromAmount(ethers.utils.formatEther(amount[1]).toString());
    }
    catch (e) {
      setAmountIn('');
      setBoxMessage("Please check your token selection");
      setShowBox(true);
    }
  }
}

async function update_RGP_ETH_SendAmount(selectedToken, selectedToToken, path, askAmount, setAmountIn, setShowBox, setBoxMessage, setFromAmount, field, calculateSlippage) {
  const routRGPETH = await updateOutPutAmountForRouter();
  if (typeof path[1] != 'undefined') {
    const fromPath = selectedToken.address
    const toPath = selectedToToken.address
    try {
      setShowBox(false);
      setBoxMessage('...');
      const amount = await routRGPETH.getAmountsOut(
        Web3.utils.toWei(askAmount.toString()),
        (field != 'to') ? [fromPath, toPath] : [toPath, fromPath]
      );
      // * calculateSlippage()
      return (field != 'to') ? setAmountIn(
        ethers.utils.formatEther(calculateSlippage(amount[1].toString())).toString()) : setFromAmount(ethers.utils.formatEther(amount[1]).toString());
    } catch (e) {
      setAmountIn('');
      setBoxMessage("Please check your token selection");
      setShowBox(true);
    }
  }
}
async function update_WETH_ETH_SendAmount(askAmount, setAmountIn, amountIn, setFromAmount, field) {
  if (field === 'to') {
    setFromAmount(amountIn)
  } else if (field === 'from') {
    setAmountIn(askAmount)
  }

}
