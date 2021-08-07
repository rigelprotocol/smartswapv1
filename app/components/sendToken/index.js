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
import React, { useState, useEffect, useCallback } from 'react';
import { useDisclosure, Spinner } from '@chakra-ui/react';
import { Box, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { connect } from 'react-redux';
import { ethers } from 'ethers';
import { notify } from 'containers/NoticeProvider/actions';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import {
  approveToken,
  runApproveCheck,
  getTokenListBalance,
} from 'utils/wallet-wiget/TokensUtils';
import { getPriceForToken } from 'containers/HomePage/service/swapServices';
import {
  tokenWhere,
  tokenAddressWhere,
  tokenList,
  checkIfTokenIsListed,
  BSCTestnetTokens,
} from 'utils/constants';
import NewTokenModal from 'components/TokenListBox/NewTokenModal';
import {
  router,
  WETH,
  updateOutPutAmountForRouter,
  SmartFactory,
} from '../../utils/SwapConnect';
import ArrowDownImage from '../../assets/arrow-down.svg';
import From from './from';
import To from './to';
import SwapSettings from './SwapSettings';
import ShowMessageBox from '../Toast/ShowMessageBox';
import ConfirmSwapBox from './ConfirmSwapBox';
import {
  changeDeadlineValue,
  changeRGPValue,
  updateToToken,
  updateFromToken,
} from '../../containers/WalletProvider/actions';
import { useLocalStorage } from '../../utils/hooks/storageHooks';
import { getDeadline } from '../../utils/UtilFunc';
import { getTokenList } from '../../utils/tokens';

export const Manual = props => {
  const history = useHistory();
  const { wallet } = props.wallet;
  const [fromAmount, setFromAmount] = useState('');
  const [path, setPath] = useState([
    { fromPath: tokenAddressWhere('RGP'), token: 'RGP' },
  ]);
  const [showBox, setShowBox] = useState(false);
  const [amountIn, setAmountIn] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');
  const [boxMessage, setBoxMessage] = useState('');
  const [selectedToken, setSelectedToken] = useState(tokenWhere('rgp'));
  const [selectedToToken, setSelectedToToken] = useState(
    tokenWhere('SELECT A TOKEN'),
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);
  const [userHasApproveToken, setUserHasApproveToken] = useState(false);
  const [transactionDeadline, setTransactionDeadline] = useState('');
  const [balanceIsSet, setBalanceIsSet] = useState(false);
  const [newTokenPair, setNewTokenPair] = useState(false);
  const [actualTransactionDeadline, setActualTransactionDeadline] = useState(
    Math.floor(new Date().getTime() / 1000.0 + 1200),
  );
  const [slippageValue, setSlippageValue] = useState('0.5');
  const [tokenAllowance, setTokenAllowance] = useState('');
  const [insufficientBalanceButton, setInsufficientBalanceButton] = useState(
    false,
  );
  const [toURL, setToURL] = useState('');
  const [fromURL, setFromURL] = useState('');
  const [disableSwapTokenButton, setDisableSwapTokenButton] = useState(true);
  const [areBothTokensNew, setAreBothTokensNew] = useState(false);
  const [selectedTokenForModal, setSelectedTokenForModal] = useState({});
  const [slippage, setSlippage] = useLocalStorage('slippage', 1.5);
  const [deadline, setDeadline] = useLocalStorage('deadline', 20);

  // Path route to be displayed in the frontend
  const [route, setRoute] = useState('');

  // Array of path address, based on routes
  const [routeAddress, setRouteAddress] = useState([]);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  useEffect(() => {
    props.updateToToken(selectedToToken);
    props.updateFromToken(selectedToken);
  }, [selectedToken, selectedToToken]);

  useEffect(() => {
    fromAmount !== '' && callTransformFunction(fromAmount, 'from');
    checkForAllVariables();
  }, [path, selectedToken, selectedToToken, wallet, slippageValue]);
  useEffect(() => {
    if (props.match.params.pair !== undefined) {
      const { pair } = props.match.params;
      const pairArray = pair.split('-');
      if (pairArray.length === 2) {
        getTokensListed(pairArray);
      } else {
        // history.push("/swap")
      }
    }
  }, [wallet]);
  useEffect(() => {
    setUpUrl(selectedToken, selectedToToken);
    if (Object.entries(selectedTokenForModal).length === 0) {
      checkIfLiquidityPairExist();
    }
  }, [selectedToken, selectedToToken]);

  useEffect(() => {
    changeData();
  }, [transactionDeadline, slippageValue]);
  useEffect(async () => {
    if (wallet.signer !== 'signer') {
      if (selectedToken.symbol === 'BNB') {
        return setUserHasApproveToken(true);
      }
      const allowance = await runApproveCheck(
        selectedToken,
        wallet.address,
        wallet.signer,
      );
      setTokenAllowance(allowance);
      return allowance > 0
        ? setUserHasApproveToken(true)
        : setUserHasApproveToken(false);
    }
  }, [selectedToken, wallet]);

  useEffect(() => {
    if (!newTokenPair) {
      // if (selectedToken.balance !== undefined && parseFloat(fromAmount) > parseFloat(selectedToken.balance)) {
      //   setFromAmount(selectedToken.balance)
      // }
      if (
        parseFloat(tokenAllowance) < parseFloat(fromAmount) &&
        selectedToken.symbol !== 'BNB'
      ) {
        setUserHasApproveToken(false);
      }
      if (fromAmount !== '') {
        console.log(parseFloat(fromAmount), selectedToken.balance);
        if (parseFloat(fromAmount) > parseFloat(selectedToken.balance)) {
          setInsufficientBalanceButton(true);
        } else {
          setInsufficientBalanceButton(false);
        }
      }
    }
  }, [fromAmount, amountIn]);

  useEffect(() => {
    const checkLiquidityPair = async () => {
      const factory = await SmartFactory();
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      const LPAddress = await factory.getPair(toPath, fromPath);

      const RGPBUSDAddress = await factory.getPair(
        BSCTestnetTokens.RGP,
        BSCTestnetTokens.BUSD,
      );

      const RGPBNBAddress = await factory.getPair(
        BSCTestnetTokens.RGP,
        BSCTestnetTokens.BNB,
      );

      const BUSDBNBAddress = await factory.getPair(
        BSCTestnetTokens.BUSD,
        BSCTestnetTokens.BNB,
      );

      const BUSDAddressFrom = await factory.getPair(
        fromPath,
        BSCTestnetTokens.BUSD,
      );

      const BUSDAddressTo = await factory.getPair(
        toPath,
        BSCTestnetTokens.BUSD,
      );

      const BNBAddressFrom = await factory.getPair(
        fromPath,
        BSCTestnetTokens.BNB,
      );

      const BNBAddressTo = await factory.getPair(toPath, BSCTestnetTokens.BNB);

      const RGPAddressFrom = await factory.getPair(
        fromPath,
        BSCTestnetTokens.RGP,
      );

      const RGPAddressTo = await factory.getPair(toPath, BSCTestnetTokens.RGP);

      // checks if both selected tokens have a pair in the factory
      // and if true, routes them directly

      if (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'WBNB') {
        setRoute(`BNB > WBNB`);
      } else if (
        selectedToken.symbol === 'WBNB' &&
        selectedToToken.symbol === 'BNB'
      ) {
        setRoute(`WBNB > BNB`);
      } else if (LPAddress != '0x0000000000000000000000000000000000000000') {
        console.log(
          `${await selectedToken.symbol} > ${await selectedToToken.symbol}`,
        );
        setRoute(
          `${await selectedToken.symbol} > ${await selectedToToken.symbol}`,
        );

        setRouteAddress([selectedToken.address, selectedToToken.address]);
      } else {
        // if both selected tokens do not have a pair in the factory
        // this code checks through th most popular tokens in the factory
        // to see if there's a pair and then routes a transaction through that link
        if (
          BUSDAddressTo != '0x0000000000000000000000000000000000000000' &&
          BUSDAddressFrom != '0x0000000000000000000000000000000000000000'
        ) {
          setRoute(
            `${await selectedToken.symbol} > BUSD > ${await selectedToToken.symbol}`,
          );

          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.BUSD,
            selectedToToken.address,
          ]);
        } else if (
          BNBAddressTo != '0x0000000000000000000000000000000000000000' &&
          BNBAddressFrom != '0x0000000000000000000000000000000000000000'
        ) {
          setRoute(
            `${await selectedToken.symbol} > BNB > ${await selectedToToken.symbol}`,
          );

          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.BNB,
            selectedToToken.address,
          ]);
        } else if (
          RGPAddressTo != '0x0000000000000000000000000000000000000000' &&
          RGPAddressFrom != '0x0000000000000000000000000000000000000000'
        ) {
          setRoute(
            `${await selectedToken.symbol} > RGP > ${await selectedToToken.symbol}`,
          );
          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.RGP,
            selectedToToken.address,
          ]);
        } else if (
          RGPAddressFrom != '0x0000000000000000000000000000000000000000' &&
          RGPBUSDAddress != '0x0000000000000000000000000000000000000000' &&
          (RGPBUSDAddress != '0x0000000000000000000000000000000000000000' &&
            BUSDAddressTo != '0x0000000000000000000000000000000000000000')
        ) {
          setRoute(
            `${await selectedToken.symbol} > RGP > BUSD > ${await selectedToToken.symbol}`,
          );
          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.RGP,
            BSCTestnetTokens.BUSD,
            selectedToToken.address,
          ]);
        } else if (
          BUSDAddressFrom != '0x0000000000000000000000000000000000000000' &&
          RGPBUSDAddress != '0x0000000000000000000000000000000000000000' &&
          (RGPBUSDAddress != '0x0000000000000000000000000000000000000000' &&
            RGPAddressTo != '0x0000000000000000000000000000000000000000')
        ) {
          setRoute(
            `${await selectedToken.symbol} > BUSD > RGP > ${await selectedToToken.symbol}`,
          );
          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.BUSD,
            BSCTestnetTokens.RGP,
            selectedToToken.address,
          ]);
        } else if (
          RGPAddressFrom != '0x0000000000000000000000000000000000000000' &&
          RGPBNBAddress != '0x0000000000000000000000000000000000000000' &&
          (RGPBNBAddress != '0x0000000000000000000000000000000000000000' &&
            BNBAddressTo != '0x0000000000000000000000000000000000000000')
        ) {
          setRoute(
            `${await selectedToken.symbol} > RGP > BNB > ${await selectedToToken.symbol}`,
          );
          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.RGP,
            BSCTestnetTokens.BNB,
            selectedToToken.address,
          ]);
        } else if (
          BNBAddressFrom != '0x0000000000000000000000000000000000000000' &&
          RGPBNBAddress != '0x0000000000000000000000000000000000000000' &&
          (RGPBNBAddress != '0x0000000000000000000000000000000000000000' &&
            RGPAddressTo != '0x0000000000000000000000000000000000000000')
        ) {
          setRoute(
            `${await selectedToken.symbol} > BNB > RGP > ${await selectedToToken.symbol}`,
          );
          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.BNB,
            BSCTestnetTokens.RGP,
            selectedToToken.address,
          ]);
        } else if (
          BUSDAddressFrom != '0x0000000000000000000000000000000000000000' &&
          BUSDBNBAddress != '0x0000000000000000000000000000000000000000' &&
          (BUSDBNBAddress != '0x0000000000000000000000000000000000000000' &&
            BNBAddressTo != '0x0000000000000000000000000000000000000000')
        ) {
          setRoute(
            `${await selectedToken.symbol} > BUSD > BNB > ${await selectedToToken.symbol}`,
          );
          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.BUSD,
            BSCTestnetTokens.BNB,
            selectedToToken.address,
          ]);
        } else if (
          BNBAddressFrom != '0x0000000000000000000000000000000000000000' &&
          BUSDBNBAddress != '0x0000000000000000000000000000000000000000' &&
          (BUSDBNBAddress != '0x0000000000000000000000000000000000000000' &&
            BUSDAddressTo != '0x0000000000000000000000000000000000000000')
        ) {
          setRoute(
            `${await selectedToken.symbol} > BNB > BUSD > ${await selectedToToken.symbol}`,
          );
          setRouteAddress([
            selectedToken.address,
            BSCTestnetTokens.BNB,
            BSCTestnetTokens.BUSD,
            selectedToToken.address,
          ]);
        } else {
          console.log('No trade for this pair, error pop up shows up here');
        }
        // console.log('Nothing to see here');
      }
    };

    checkLiquidityPair();
  }, [selectedToken, selectedToToken]);

  const importToken = token => {
    token.available = true;
    token.imported = true;
    onCloseModal();
    if (areBothTokensNew) {
      setTimeout(() => onOpenModal(), 300);
      setSelectedTokenForModal(selectedToToken);
      setAreBothTokensNew(false);
    } else {
      setSelectedTokenForModal({});
      checkIfLiquidityPairExist();
    }
  };
  const getTokensListed = async pairArray => {
    const selection0 = await getTokenList(pairArray[0], wallet);
    const selection1 = await getTokenList(pairArray[1], wallet);
    setPathArray(selection0[0].address, selection0[0].name);

    setPathToArray(selection1[0].address, selection1[0].name);
    setSelectedToken(selection0[0]);
    setSelectedToToken(selection1[0]);
    setUpUrl(selection0[0], selection1[0]);
    displayModalsForNewToken(selection0[0], selection1[0]);
  };
  const setUpUrl = () => {
    if (
      selectedToken.symbol !== 'SELECT A TOKEN' &&
      selectedToToken.symbol !== 'SELECT A TOKEN'
    ) {
      const toURLToken = checkIfTokenIsListed(selectedToken.symbol)
        ? selectedToken.symbol
        : selectedToken.address;
      setToURL(toURLToken);
      const fromURLToken = checkIfTokenIsListed(selectedToToken.symbol)
        ? selectedToToken.symbol
        : selectedToToken.address;
      setFromURL(fromURLToken);
      history.push(`/swap/${toURLToken}-${fromURLToken}`);
    } else {
      history.push('/swap');
    }
  };
  const displayModalsForNewToken = (selectedToken, selectedToToken) => {
    if (
      selectedToken.symbol !== 'SELECT A TOKEN' &&
      selectedToToken.symbol !== 'SELECT A TOKEN'
    ) {
      if (
        !checkIfTokenIsListed(selectedToken.symbol) &&
        !checkIfTokenIsListed(selectedToToken.symbol)
      ) {
        setDataForModal(true, selectedToken);
      } else if (!checkIfTokenIsListed(selectedToken.symbol)) {
        setDataForModal(false, selectedToken);
      } else if (!checkIfTokenIsListed(selectedToToken.symbol)) {
        setDataForModal(false, selectedToToken);
      } else {
        checkIfLiquidityPairExist();
      }
    } else {
      history.push('/swap');
    }
  };
  const setDataForModal = (value, token) => {
    setAreBothTokensNew(value);
    setSelectedTokenForModal(token);
    onOpenModal();
  };
  const checkIfLiquidityPairExist = async () => {
    const factory = await SmartFactory();
    const fromPath = ethers.utils.getAddress(selectedToken.address);
    const toPath = ethers.utils.getAddress(selectedToToken.address);
    const LPAddress = await factory.getPair(toPath, fromPath);
    if (LPAddress === '0x0000000000000000000000000000000000000000') {
      setNewTokenPair(true);
      openModal5();
    }
  };
  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const modal3Disclosure = useDisclosure();
  const modal4Disclosure = useDisclosure();
  const modal5Disclosure = useDisclosure();

  // handling change ev
  const handleChangeToAmount = event => {
    setAmountIn(event.target.value);
    getToAmount(event.target.value, 'to');
  };

  const handleChangeFromAmount = (event, balance) => {
    const { value } = event.target;
    setFromAmount(value || balance);
    getToAmount(value || balance, 'from');
  };
  const changeData = () => {
    props.changeDeadlineValue({ actualTransactionDeadline, slippageValue });
  };
  const setPathArray = (target, token) => {
    const pathObject = path.filter(value => !value.hasOwnProperty('fromPath'));
    const newArray = [{ fromPath: target, token }, ...pathObject];
    setPath(newArray);
  };

  const setPathToArray = (target, token) => {
    const pathObject = path.filter(value => !value.hasOwnProperty('toPath'));
    const newArray = [...pathObject, { toPath: target, token }];
    setPath(newArray);
  };

  const isLoggedIn = () => {
    if (wallet.signer === 'signer') {
      return false;
    }
    return true;
  };
  const calculateSlippage = amountIn => {
    let calculatedVal;
    if (slippageValue === '1') {
      calculatedVal = amountIn + (amountIn * parseFloat(slippageValue)) / 100;
    } else if (slippageValue === '0.1') {
      calculatedVal = amountIn - (amountIn * parseFloat(slippageValue)) / 100;
    } else if (slippageValue === '0.5') {
      calculatedVal = amountIn;
    }
    return calculatedVal.toString();
  };

  const minimumAmountToReceive = useCallback(
    () => ((100 - Number(slippage)) / 100) * Number(amountIn),
    [slippage, amountIn],
  );

  const liquidityProviderFee = () => 0.003 * fromAmount;

  const checkForAllVariables = () => {
    if (
      isLoggedIn() &&
      fromAmount > 0 &&
      selectedToToken.name !== 'Select a token'
    ) {
      setDisableSwapTokenButton(false);
      return true;
    }
    setDisableSwapTokenButton(true);
    return false;
  };

  const getToAmount = async (fromQty, field) => {
    const askAmount = !fromQty && !field ? fromAmount : fromQty;
    callTransformFunction(askAmount, field);
  };

  const callTransformFunction = async (askAmount = '', field = 'from') => {
    if (wallet.signer !== 'signer' && askAmount.length > 0 && path[1]) {
      if (
        (selectedToken.symbol === 'RGP' && selectedToToken.symbol === 'BUSD') ||
        (selectedToken.symbol === 'BUSD' && selectedToToken.symbol === 'RGP')
      ) {
        await updateSendAmount(
          path,
          selectedToken,
          selectedToToken,
          askAmount,
          setAmountIn,
          setShowBox,
          setBoxMessage,
          setFromAmount,
          field,
          calculateSlippage,
        );
        setDisableSwapTokenButton(false);
      } else if (
        (selectedToken.symbol === 'RGP' && selectedToToken.symbol === 'BNB') ||
        (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'RGP')
      ) {
        await update_RGP_ETH_SendAmount(
          selectedToken,
          selectedToToken,
          path,
          askAmount,
          setAmountIn,
          setShowBox,
          setBoxMessage,
          setFromAmount,
          field,
          calculateSlippage,
        );
        setDisableSwapTokenButton(false);
      } else if (
        (selectedToken.symbol === 'WBNB' && selectedToToken.symbol === 'BNB') ||
        (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'WBNB')
      ) {
        await update_WETH_ETH_SendAmount(
          askAmount,
          setAmountIn,
          amountIn,
          setFromAmount,
          field,
          calculateSlippage,
        );
        setDisableSwapTokenButton(false);
      } else {
        await updateSendAmount(
          path,
          selectedToken,
          selectedToToken,
          askAmount,
          setAmountIn,
          setShowBox,
          setBoxMessage,
          setFromAmount,
          field,
          calculateSlippage,
        );
        setDisableSwapTokenButton(false);
      }
      setDisableSwapTokenButton(false);
    } else {
      setAmountIn('');
      setDisableSwapTokenButton(true);
    }
  };

  const swapUserToken = async () => {
    if (
      (selectedToken.symbol === 'RGP' && selectedToToken.symbol === 'BUSD') ||
      (selectedToken.symbol === 'BUSD' && selectedToToken.symbol === 'RGP')
    ) {
      await swapTokenForTokens();
    } else if (
      (selectedToken.symbol === 'RGP' && selectedToToken.symbol === 'WBNB') ||
      (selectedToken.symbol === 'WBNB' && selectedToToken.symbol === 'RGP')
    ) {
      await swapTokenForTokens();
    } else if (
      selectedToken.symbol === 'BNB' &&
      selectedToToken.symbol === 'WBNB'
    ) {
      await deposit();
    } else if (
      selectedToken.symbol === 'WBNB' &&
      selectedToToken.symbol === 'BNB'
    ) {
      await withdraw();
    } else if (
      (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'RGP') ||
      (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'BUSD')
    ) {
      await swapETHForExactToken();
    } else if (
      (selectedToken.symbol === 'RGP' && selectedToToken.symbol === 'BNB') ||
      (selectedToken.symbol === 'BUSD' && selectedToToken.symbol === 'BNB')
    ) {
      await swapExactTokenForETH();
    } else {
      await swapTokenForTokens();
    }
  };

  const swapUserTokenForRoute = async () => {
    if (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'WBNB') {
      await deposit();
    } else if (
      selectedToken.symbol === 'WBNB' &&
      selectedToToken.symbol === 'BNB'
    ) {
      await withdraw();
    } else if (
      // (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'RGP') ||
      // (selectedToken.symbol === 'BNB' && selectedToToken.symbol === 'BUSD')
      selectedToken.symbol === 'BNB'
    ) {
      await swapETHForExactTokenForRoute();
    } else if (
      // (selectedToken.symbol === 'RGP' && selectedToToken.symbol === 'BNB') ||
      // (selectedToken.symbol === 'BUSD' && selectedToToken.symbol === 'BNB')
      selectedToToken.symbol === 'BNB'
    ) {
      await swapExactTokenForETHforRoute();
    } else {
      await swapTokenForTokensForRoute();
    }
  };

  const triggerAccountCheck = async () => {
    if (checkForAllVariables()) {
      if (userHasApproveToken) {
        return openModal1();
      }
      setIsSendingTransaction(true);
      const sendTransaction = await approveToken(
        wallet.address,
        selectedToken.address,
        wallet.signer,
        selectedToken.balance,
      );
      const { confirmations, status } = await sendTransaction.wait(3);
      if (
        typeof sendTransaction.hash != 'undefined' &&
        confirmations >= 3 &&
        status
      ) {
        setIsSendingTransaction(false);
        return setUserHasApproveToken(true);
      }
    }
  };

  // for three or more routes, swapTokenForThree gets called

  const openLoadingSpinnerAndSwap = async () => {
    if (routeAddress.length >= 3) {
      await swapUserTokenForRoute();
    } else {
      await swapUserToken();
    }
  };

  const swapTokenForTokens = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const rout = await router();
      const deadL = getDeadline(deadline);
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      try {
        setIsSendingTransaction(true);
        const sendTransaction = await rout.swapExactTokensForTokens(
          Web3.utils.toWei(fromAmount.toString()),
          Web3.utils.toWei(minimumAmountToReceive().toString()),
          [fromPath, toPath],
          wallet.address,
          deadL,
          {
            from: wallet.address,
            gasLimit: 290000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          },
        );
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap Execution in progress',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  // Swap tokens for tokens but for transaction with 3 or more routes

  const swapTokenForTokensForRoute = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const rout = await router();
      const deadL = getDeadline(deadline);
      // const fromPath = ethers.utils.getAddress(selectedToken.address);
      // const toPath = ethers.utils.getAddress(selectedToToken.address);
      try {
        setIsSendingTransaction(true);
        const sendTransaction = await rout.swapExactTokensForTokens(
          Web3.utils.toWei(fromAmount.toString()),
          Web3.utils.toWei(minimumAmountToReceive().toString()),
          routeAddress,
          wallet.address,
          deadL,
          {
            from: wallet.address,
            gasLimit: 290000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          },
        );
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap Execution in progress',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  const swapETHForExactToken = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const rout = await router();
      const deadL = getDeadline(deadline);
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
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap execution in process',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  const swapETHForExactTokenForRoute = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const rout = await router();
      const deadL = getDeadline(deadline);
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      const inputAmount = Web3.utils.toWei(amountIn.toString());
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await rout.swapETHForExactTokens(
          inputAmount.toString(),
          routeAddress,
          wallet.address,
          deadL,
          {
            value: Web3.utils.toWei(fromAmount.toString()),
          },
        );
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap execution in process',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  const swapExactTokenForETH = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const rout = await router();
      const deadL = getDeadline(deadline);
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      const inputAmount = Web3.utils.toWei(minimumAmountToReceive().toString());
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await rout.swapExactTokensForETH(
          Web3.utils.toWei(fromAmount.toString()),
          inputAmount,
          [fromPath, toPath],
          wallet.address,
          deadL,
        );
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap Execution in progress',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  const swapExactTokenForETHforRoute = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const rout = await router();
      const deadL = getDeadline(deadline);
      const fromPath = ethers.utils.getAddress(selectedToken.address);
      const toPath = ethers.utils.getAddress(selectedToToken.address);
      const inputAmount = Web3.utils.toWei(minimumAmountToReceive().toString());
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await rout.swapExactTokensForETH(
          Web3.utils.toWei(fromAmount.toString()),
          inputAmount,
          routeAddress,
          wallet.address,
          deadL,
        );
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap Execution in progress',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  const deposit = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const weth = await WETH();
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await weth.deposit({
          value: Web3.utils.toWei(fromAmount.toString()),
        });
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap Execution in progress',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setIsSendingTransaction(false);
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  const withdraw = async () => {
    if (wallet.signer !== 'signer') {
      openModal2();
      const weth = await WETH();
      setIsSendingTransaction(true);
      try {
        const sendTransaction = await weth.withdraw(
          Web3.utils.toWei(fromAmount.toString()),
        );
        props.notify({
          title: 'Transaction  Message',
          body: 'Swap Execution in progress',
          type: 'success',
        });
        setTimeout(() => openModal3(), 1000);
        const { confirmations, status } = await sendTransaction.wait(3);
        if (
          typeof sendTransaction.hash != 'undefined' &&
          confirmations >= 3 &&
          status
        ) {
          setIsSendingTransaction(false);
          props.notify({
            title: 'Transaction  Message',
            body: 'Swap was successful and is confirmed',
            type: 'success',
          });
          getTokenListBalance(tokenList, wallet, setBalanceIsSet);
          props.changeRGPValue(wallet);
        }
      } catch (e) {
        setTimeout(() => openModal4(), 1000);
        props.notify({
          title: 'Transaction Message',
          body: e.message,
          type: 'error',
        });
      }
    }
  };

  const resetAllField = () => {
    setFromAmount('');
    setAmountIn('');
    // setSelectedToken(tokenWhere('rgp'));
    // setSelectedToToken(tokenWhere('SELECT A TOKEN'));
    // setPath([{ fromPath: tokenAddressWhere('RGP'), token: "RGP" }, { toPath: '', token: '' }])
  };

  const sendNotice = message =>
    props.notify({
      title: 'Site Information',
      body: message,
      type: 'info',
    });

  // open First Modal
  const openModal1 = async () => {
    const data = await getPriceForToken(wallet, selectedToken, selectedToToken);
    const convertPriceToEther = Web3.utils.fromWei(data.split(',')[1]);
    setTokenPrice(convertPriceToEther);
    modal1Disclosure.onOpen();
  };

  const closeModal1 = () => {
    modal1Disclosure.onClose();
  };
  // open second Modal
  const openModal2 = () => {
    modal2Disclosure.onOpen();
  };

  const closeModal2 = () => {
    modal2Disclosure.onClose();
  };
  // open third Modal
  const openModal3 = () => {
    modal3Disclosure.onOpen();
  };

  const closeModal3 = () => {
    modal3Disclosure.onClose();
    closeAllModals();
  };

  const openModal4 = () => {
    modal4Disclosure.onOpen();
  };

  const closeModal4 = () => {
    modal4Disclosure.onClose();
    closeAllModals();
  };
  const openModal5 = () => {
    modal5Disclosure.onOpen();
  };

  const closeModal5 = () => {
    modal5Disclosure.onClose();
  };
  const openLiquidityPage = () => {
    props.history.push(`/liquidity/${toURL}-${fromURL}`);
  };
  const closeAllModals = () => {
    setTimeout(() => closeModal2(), 500);
    setTimeout(() => closeModal1(), 1200);
    setTimeout(() => resetAllField(), 1800);
  };
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
          slippageValue={slippage}
          setSlippageValue={setSlippage}
          deadline={deadline}
          setDeadline={setDeadline}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
        <From
          fromAmount={fromAmount}
          handleChangeFromAmount={handleChangeFromAmount}
          path={path}
          setPathArray={setPathArray}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          checkIfLiquidityPairExist={checkIfLiquidityPairExist}
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
          checkIfLiquidityPairExist={checkIfLiquidityPairExist}
          selectedToToken={selectedToToken}
          setSelectedToToken={setSelectedToToken}
          getToAmount={getToAmount}
        />
        <NewTokenModal
          onCloseModal={onCloseModal}
          isOpenModal={isOpenModal}
          selectedTokenForModal={selectedTokenForModal}
          importToken={importToken}
        />

        {/* } */}
        {showBox && <ShowMessageBox boxMessage={boxMessage} />}
        <Box mt={14}>
          {isSendingTransaction ? (
            <Stack direction="row" spacing={4}>
              <Spinner size="xs" color="red.500" />
            </Stack>
          ) : (
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
                wallet.signer === 'signer'
                  ? sendNotice('Please use the Connect button above')
                  : (typeof wallet.signer === 'object' &&
                      fromAmount === undefined) ||
                    fromAmount.length == parseFloat(0.0)
                  ? sendNotice('Enter the amount of token to exchange')
                  : typeof wallet.signer === 'object' &&
                    fromAmount > parseFloat(0) &&
                    selectedToToken.name === 'Select a token'
                  ? sendNotice('Select the designated token')
                  : typeof wallet.signer === 'object' &&
                    fromAmount != parseFloat(0.0) &&
                    selectedToToken.name !== 'Select a token'
                  ? selectedToken.symbol == selectedToToken.symbol
                    ? sendNotice(
                        'Improper token selection, you selected the same token',
                      )
                    : insufficientBalanceButton
                    ? sendNotice(`Insufficient ${selectedToken.symbol} balance`)
                    : triggerAccountCheck()
                  : null
              }
            >
              {wallet.signer === 'signer'
                ? 'connect to Wallet'
                : (typeof wallet.signer === 'object' &&
                    fromAmount === undefined) ||
                  fromAmount.length == parseFloat(0.0)
                ? 'Enter Amount'
                : typeof wallet.signer === 'object' &&
                  fromAmount != parseFloat(0.0) &&
                  selectedToToken.name === 'Select a token'
                ? 'Click Select a Token'
                : typeof wallet.signer === 'object' &&
                  fromAmount != parseFloat(0.0) &&
                  selectedToToken.name !== 'Select a token'
                ? selectedToken.symbol == selectedToToken.symbol
                  ? 'Improper token selection'
                  : insufficientBalanceButton
                  ? `Insufficient ${selectedToken.symbol} balance`
                  : !userHasApproveToken
                  ? 'Approve Transaction'
                  : 'Swap Tokens'
                : ''}
            </Button>
          )}
        </Box>
        <ConfirmSwapBox
          path={path}
          amountIn={amountIn}
          fromAmount={fromAmount}
          liquidityProviderFee={liquidityProviderFee}
          closeModal1={closeModal1}
          closeModal2={closeModal2}
          closeModal3={closeModal3}
          closeModal4={closeModal4}
          closeModal5={closeModal5}
          minimumAmountToReceive={minimumAmountToReceive}
          tokenPrice={tokenPrice}
          selectedToken={selectedToken}
          selectedToToken={selectedToToken}
          modal1Disclosure={modal1Disclosure}
          modal2Disclosure={modal2Disclosure}
          modal3Disclosure={modal3Disclosure}
          modal4Disclosure={modal4Disclosure}
          modal5Disclosure={modal5Disclosure}
          openLiquidityPage={openLiquidityPage}
          openLoadingSpinnerAndSwap={openLoadingSpinnerAndSwap}
          route={route}
        />
      </Box>
    </div>
  );
};
const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(
  mapStateToProps,
  {
    notify,
    changeDeadlineValue,
    changeRGPValue,
    updateToToken,
    updateFromToken,
  },
)(Manual);

async function updateSendAmount(
  path,
  selectedToken,
  selectedToToken,
  askAmount,
  setAmountIn,
  setShowBox,
  setBoxMessage,
  setFromAmount,
  field,
  calculateSlippage,
) {
  const rout = await updateOutPutAmountForRouter();
  if (typeof path[1] != 'undefined') {
    const fromPath = selectedToken.address;
    const toPath = selectedToToken.address;
    try {
      setShowBox(false);
      setBoxMessage('...');
      const amount = await rout.getAmountsOut(
        Web3.utils.toWei(askAmount.toString()),
        field != 'to' ? [fromPath, toPath] : [toPath, fromPath],
      );
      // if(field != 'to' && )
      return field != 'to'
        ? setAmountIn(
            ethers.utils.formatEther(calculateSlippage(amount[1].toString())),
          )
        : setFromAmount(ethers.utils.formatEther(amount[1]).toString());
    } catch (e) {
      setAmountIn('');
      setBoxMessage('Please check your token selection');
      setShowBox(true);
    }
  }
}

async function update_RGP_ETH_SendAmount(
  selectedToken,
  selectedToToken,
  path,
  askAmount,
  setAmountIn,
  setShowBox,
  setBoxMessage,
  setFromAmount,
  field,
  calculateSlippage,
) {
  const routRGPETH = await updateOutPutAmountForRouter();
  if (typeof path[1] != 'undefined') {
    const fromPath = selectedToken.address;
    const toPath = selectedToToken.address;
    try {
      setShowBox(false);
      setBoxMessage('...');
      const amount = await routRGPETH.getAmountsOut(
        Web3.utils.toWei(askAmount.toString()),
        field != 'to' ? [fromPath, toPath] : [toPath, fromPath],
      );
      // * calculateSlippage()
      return field != 'to'
        ? setAmountIn(
            ethers.utils
              .formatEther(calculateSlippage(amount[1].toString()))
              .toString(),
          )
        : setFromAmount(ethers.utils.formatEther(amount[1]).toString());
    } catch (e) {
      setAmountIn('');
      setBoxMessage('Please check your token selection');
      setShowBox(true);
    }
  }
}
async function update_WETH_ETH_SendAmount(
  askAmount,
  setAmountIn,
  amountIn,
  setFromAmount,
  field,
) {
  if (field === 'to') {
    setFromAmount(amountIn);
  } else if (field === 'from') {
    setAmountIn(askAmount);
  }
}
