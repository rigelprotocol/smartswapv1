/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// @ts-nocheck
/**
 *
 * LiquidityPage
 *
 */

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { connect } from 'react-redux';
import { Flex } from '@chakra-ui/layout';
import { useDisclosure, AlertTitle } from '@chakra-ui/react';
import Layout from 'components/layout/index';
import Index from 'components/liquidity/index';
import AddLiquidity from 'components/liquidity/addLiquidity';
import RemoveALiquidity from 'components/liquidity/removeALiquidity';
import { showErrorMessage } from 'containers/NoticeProvider/actions';
import { BUSDToken, rigelToken, BNBTOKEN, router, LPTokenContract, WETH, smartSwapLPToken, erc20Token, SmartFactory, LiquidityPairInstance } from 'utils/SwapConnect';
import { runApproveCheck, approveToken } from 'utils/wallet-wiget/TokensUtils';
import BigNumber from "bignumber.js";
import { tokenList, tokenWhere, SMART_SWAP, TOKENS_CONTRACT } from '../../utils/constants';
import { LIQUIDITYTABS } from "./constants";
import { isNotEmpty } from "../../utils/UtilFunc";

// 35,200
export function LiquidityPage(props) {
  const { wallet, wallet_props } = props.wallet;
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false)
  const [selectingToken, setSelectingToken] = useState(tokenList);
  const [fromSelectedToken, setFromSelectedToken] = useState(tokenWhere('rgp'))
  const [fromAddress, setFromAddress] = useState(fromSelectedToken.address)
  const [toAddress, setToAddress] = useState('')
  const [toSelectedToken, setToSelectedToken] = useState(tokenWhere('SELECT A TOKEN'))
  const [liquidities, setLiquidities] = useState([])
  // const [liquidityTab, setLiquidityTab] = useState("REMOVEALIQUIDITY")
  const [liquidityTab, setLiquidityTab] = useState("INDEX");
  const [popupText, setPopupText] = useState('Approving Account');
  const [displayButton, setDisplayButton] = useState(false);
  const [approveBNBPopup, setApproveBNBPopup] = useState(false);
  const [buttonValue, setButtonValue] = useState('Supply');
  const [openSupplyButton, setOpenSupplyButton] = useState(true);
  const [approveTokenSpending, setApproveTokenSpending] = useState(false);
  const [percentValue, setPercentValue] = useState(0)
  const [liquidityToRemove, setLiquidityToRemove] = useState({})
  const [smartSwapLPBalance, setSmartSwapLPBalance] = useState("")
  const [hasAllowedFromToken, setHasAllowedFromToken] = useState(false)
  const [hasAllowedToToken, setHasAllowedToToken] = useState(false)
  const [showApprovalBox, setShowApprovalBox] = useState(true)
  const [tokenFromValue, setTokenFromValue] = useState("0")
  const [trxHashed, setTrxHashed] = useState({})
  const [sendingTransaction, setSendingTransaction] = useState(false)
  const [tokenToValue, setTokenToValue] = useState("0")
  const [fromTokenAllowance, setFromTokenAllowance] = useState('')
  const [toTokenAllowance, setToTokenAllowance] = useState('')
  const [liquidityLoading, setLiquidityLoading] = useState(false)
  const [liquidityPairRatio, setLiquidityPairRatio] = useState(0)

  let timer1
  useEffect(() => (
    clearTimeout(timer1)
  ), [liquidityTab])
  useEffect(() => {
    displayBNBbutton();
    // calculateToValue()
    //  changeButtonValue();
  }, [toSelectedToken, liquidities]);
  const handleFromAmount = (value) => {
    setToValue(value * liquidityPairRatio);
    // calculateToValue(value, 'from');
  }


  useEffect(() => {
    if (fromAddress && toAddress) {
      getLiquidityPairRatio();

    }

  }, [fromSelectedToken, toSelectedToken])

  const getLiquidityPairRatio = async () => {
    try {
      const factory = await SmartFactory();
      const fromPath = ethers.utils.getAddress(fromAddress);
      const toPath = ethers.utils.getAddress(toAddress);
      const LPAddress = await factory.getPair(toPath, fromPath);
      console.log(LPAddress);
      const LPcontract = await LPTokenContract(LPAddress)
      const [tokenAReserve, tokenBreserve] = await LPcontract.getReserves()
      const token0 = await LPcontract.token0();
      let liquidityRatio;
      if (token0.toString() == fromPath.toString()) {
        liquidityRatio = tokenBreserve.toString() / tokenAReserve.toString();
      } else {
        liquidityRatio = tokenAReserve.toString() / tokenBreserve.toString();
      }
      setLiquidityPairRatio(liquidityRatio);
    } catch (error) {
      console.error(error)
    }

  }


  useEffect(() => {
    const checkData = async () => {
      if (wallet.signer !== 'signer') {
        await checkUser()
      }
    }
    checkData()
  }, [fromAddress])



  useEffect(async () => {
    if (!isNotEmpty(fromSelectedToken) && fromValue != '') {
      const tokenAllowance = await runApproveCheck(fromSelectedToken, wallet.address, wallet.signer);
      setFromTokenAllowance(tokenAllowance);

      if (Number(tokenAllowance) > Number(fromValue)) {
        setHasAllowedFromToken(true);
        setShowApprovalBox(false);
        setOpenSupplyButton(true);
      } else {
        setHasAllowedFromToken(false);
        setShowApprovalBox(true);
        setOpenSupplyButton(false);
      }

    }
    if (!isNotEmpty(toSelectedToken) && toValue != '') {
      const tokenAllowance = await runApproveCheck(toSelectedToken, wallet.address, wallet.signer);
      setToTokenAllowance(tokenAllowance);


      if (Number(tokenAllowance) > Number(toValue)) {
        setHasAllowedToToken(true)
        setShowApprovalBox(false);
        setOpenSupplyButton(true);
      } else {
        setHasAllowedToToken(false);
        setShowApprovalBox(true);
        setOpenSupplyButton(false);
      }
    }
  }, [fromValue, toValue])


  useEffect(() => {

    const balanceOfUserLPs = async () => {
      if (wallet.signer !== 'signer') {
        const smartSwapLP = await smartSwapLPToken();
        const walletBal = await smartSwapLP.balanceOf(wallet.address);
        const checkWalletBal = ethers.utils.formatEther(walletBal, 'ether')
        const value = (checkWalletBal.toString() * percentValue) / 100
        setSmartSwapLPBalance(value)

        getAllLiquidities();
      }
    }

    const getBalance = async () => {
      await balanceOfUserLPs()
      await getAmountForLiquidity(smartSwapLPBalance)
    }
    getBalance()
  }, [wallet])

  useEffect(() => {

    const balanceOfUserLPs = async () => {

      if (wallet.signer !== 'signer') {
        const smartSwapLP = await smartSwapLPToken();
        const walletBal = await smartSwapLP.balanceOf(wallet.address);
        const checkWalletBal = ethers.utils.formatEther(walletBal, 'ether');
        const liquidityValue = liquidities.length && (liquidities[0].path[0].fromPath);
        const convertValue = ethers.utils.formatEther(liquidityValue, 'ether');
        const stateValue = Number((convertValue.toString() * percentValue) / 100) / 1e+18;
        const value = (checkWalletBal.toString() * percentValue) / 100;
        setSmartSwapLPBalance(stateValue)
      }
    }


    const getBalance = async () => {
      await balanceOfUserLPs()
      await getAmountForLiquidity(smartSwapLPBalance)
    }
    getBalance()
  }, [percentValue, wallet])

  const getAllLiquidities = async () => {
    setLiquidityLoading(true);
    try {
      const pairs = []
      const smartFactory = await SmartFactory();
      const allLiquidityPairs = await smartFactory.allPairsLength();
      for (let i = 0; i < allLiquidityPairs.toString(); i++) {
        const pairAddress = await smartFactory.allPairs(i);
        const liquidity = await LiquidityPairInstance(pairAddress);
        const balance = await liquidity.balanceOf(wallet.address);
        const totalSupply = await liquidity.totalSupply();
        const reserves = await liquidity.getReserves()
        const pooledToken0 = ((balance / totalSupply) * reserves[0]) / 1e+18;
        const pooledToken1 = ((balance / totalSupply) * reserves[1]) / 1e+18;
        const token0 = await liquidity.token0();
        const token1 = await liquidity.token1();
        const erc20Token0 = await erc20Token(token0)
        const erc20Token1 = await erc20Token(token1)
        const symbol0 = await erc20Token0.symbol()
        const symbol1 = await erc20Token1.symbol()
        const liquidityObject = {
          pairAddress: Web3.utils.toChecksumAddress(pairAddress),
          poolToken: Web3.utils.fromWei(balance.toString(), 'ether'),
          totalSupply: totalSupply.toString(),
          poolShare: balance.toString() / totalSupply,
          path: [
            { fromPath: token0, token: symbol0, amount: pooledToken0 },
            { toPath: token1, token: symbol1, amount: pooledToken1 }
          ],
          pooledToken0,
          pooledToken1
        }
        if (liquidityObject.poolToken != 0) {
          pairs.push(liquidityObject);
          console.log(liquidityObject)
        }
      }
      setLiquidities([...pairs])
    } catch (error) {
    } finally {
      setLiquidityLoading(false)
    }

  }

  const approveToToken = async () => {
    if (!isNotEmpty(toSelectedToken)) {
      const approveResponse = await approveToken(wallet.address, toSelectedToken.address, wallet.signer, toValue);
      if (approveResponse.hash !== undefined) {
        setShowApprovalBox(false);
        setHasAllowedToToken(true);
        setOpenSupplyButton(false);
      }
    }
  }

  const approveFromToken = async () => {
    if (!isNotEmpty(fromSelectedToken)) {
      const approveResponse = await approveToken(wallet.address, fromSelectedToken.address, wallet.signer, fromValue);
      if (approveResponse.hash !== undefined) {
        setShowApprovalBox(false);
        setHasAllowedFromToken(true);
        setOpenSupplyButton(false);
      }
    }
  }

  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const modal3Disclosure = useDisclosure();
  const modal4Disclosure = useDisclosure();
  const modal5Disclosure = useDisclosure();
  const modal6Disclosure = useDisclosure();

  function addData(data) {
    setLiquidities([...liquidities, data])
    // close all opened values

  }
  function closeInput() {
    setApproveBNBPopup(false)
    setFromValue("")
    setToValue("")
    setOpenSupplyButton(true)
    setPopupText("Approve")
    // setButtonValue("Invalid pair")
    setDisplayButton(false)
    setFromSelectedToken(tokenWhere('rgp'))
    setToSelectedToken(tokenWhere("SELECT A TOKEN"))
  }

  const addingLiquidity = async () => {
    if (wallet.signer !== 'signer') {

      try {
        const rout = await router();
        const deadLine = Math.floor(new Date().getTime() / 1000.0 + 1200);
        const amountADesired = Web3.utils.toWei(fromValue.toString())
        const amountBDesired = Web3.utils.toWei(toValue.toFixed(4).toString())
        // const amountAMin = (amountADesired / 2)
        // const amountBMin = (amountBDesired / 2)
        const amountAMin = Web3.utils.toWei((fromValue * 0.8).toString())
        const amountBMin = Web3.utils.toWei((toValue * 0.8).toString())

        closeModal1()
        modal2Disclosure.onOpen()
        const data = await rout.addLiquidity(
          fromAddress,
          toAddress,
          amountADesired.toString(),
          amountBDesired.toString(),
          amountAMin.toString(),
          amountBMin.toString(),
          wallet.address,
          deadLine,
          {
            from: wallet.address,
            gasLimit: 290000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          },
        );
        setTrxHashed(data)
        closeModal2()
        openModal3()
      } catch (e) {
        props.showErrorMessage(e)
        closeModal2()
        openModal5()
      }
    }
  };

  const fetchTransactionData = async (sendTransaction) => {
    // let res = await fetch(`https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${hash}&apikey=BPPBU4V7U79BM8NESWJ4AXQWM68AQVPQ35`)
    // let data = await res.json()
    // return data
    modal6Disclosure.onOpen();
    const { confirmations, status } = await sendTransaction.wait(1);

    return { confirmations, status }
  }

  const addingLiquidityForETH = async () => {
    if (wallet.signer !== 'signer') {
      try {
        const EthValue = fromSelectedToken.symbol === "BNB" ? fromValue : toValue;
        const tokenSelected = fromSelectedToken.symbol === "BNB" ? toAddress : fromAddress;
        const rout = await router();
        const deadLine = Math.floor(new Date().getTime() / 1000.0 + 1200);
        closeModal1()
        modal2Disclosure.onOpen()
        const data = await rout.addLiquidityETH(
          tokenSelected,
          ethers.utils.parseEther(fromValue.toString(), 'ether'),
          ethers.utils.parseEther(toValue.toString(), 'ether'),
          0,
          wallet.address.toString(),
          deadLine,
          {
            value: Web3.utils.toWei(EthValue.toString()),
            gasLimit: 1000000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          }
        );
        setTrxHashed(data)
        closeModal2()
        openModal3()
      } catch (e) {
        props.showErrorMessage(e)
        openModal5()
      }
    }
  };


  const removingLiquidity = async (liquidity, tokenA, tokenB) => {
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const checking = ethers.utils.parseEther(liquidity.toString());

      const deadLine = Math.floor(new Date().getTime() / 1000.0 + 1200);
      try {
        await rout.removeLiquidity(
          tokenA,
          tokenB,
          checking.toString(),
          0,
          0,
          wallet.address,
          deadLine,
          {
            from: wallet.address,
            gasLimit: 290000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          },
        );
      } catch (error) {
      }
    }
  }

  async function approveSmartSwapLPTokens(LPTokenAddress) {
    if (wallet.signer !== 'signer') {
      const smartSwapLP = await LPTokenContract(LPTokenAddress);
      const walletBal = await smartSwapLP.balanceOf(wallet.address);
      await smartSwapLP.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
        from: wallet.address,
      });
    }
  }

  const getPriceForToken = async () => {
    const path = [toSelectedToken, fromSelectedToken]
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const fromPath = ethers.utils.getAddress(path[0].address);
      const toPath = ethers.utils.getAddress(path[1].address);
      const valueToCheck = 1;
      const checkPriceOfOne = Web3.utils.toWei(valueToCheck.toString());
      const getValue = await rout.getAmountsOut(
        checkPriceOfOne,
        [fromPath, toPath]
      )
      const getToken2Value = await rout.getAmountsOut(
        checkPriceOfOne,
        [toPath, fromPath]
      )
      const value1 = Web3.utils.fromWei(getValue.toString().split(",")[1])
      const value2 = Web3.utils.fromWei(getToken2Value.toString().split(",")[1])
      setTokenFromValue(value1)
      setTokenToValue(value2)
    }
  }

  const open = async () => {
    await getPriceForToken()
    modal1Disclosure.onOpen();
  };

  const closeModal1 = () => {
    modal1Disclosure.onClose();
  };
  const closeModal3 = () => {
    modal3Disclosure.onClose();
    // close all modal one by one
    closeAllModals()
  };
  // open the last modal
  const openModal3 = () => {
    modal3Disclosure.onOpen();
  };
  const openModal5 = () => {
    modal5Disclosure.onOpen();
  };
  const closeModal4 = async () => {
    modal4Disclosure.onClose();
    setPopupText("wait you will be redirected")
    await getAllLiquidities()
    console.log(liquidities)

    console.log(fromSelectedToken, toSelectedToken)
    // let liquid = liquidities.filter(liquid => liquid.path[0].token === fromSelectedToken.symbol && liquid.path[1].token === toSelectedToken.symbol)[0]
    const liquid = liquidities.filter(liquid => (liquid.path[0].token === fromSelectedToken.symbol && liquid.path[1].token === toSelectedToken.symbol) || (liquid.path[0].token === toSelectedToken.symbol && liquid.path[1].token === fromSelectedToken.symbol))[0]
    console.log(liquid)
    timer1 = setTimeout(() => {
      closeInput()
      if (liquid) {
        removeALiquidity(liquid.pairAddress)
      } else {
        setLiquidityTab("INDEX")
      }
      clearTimeout(timer1)
    }, 3500);

  };
  const closeModal5 = () => {
    modal5Disclosure.onClose();
    closeInput()
    setLiquidityTab("INDEX")
  };
  // open the last modal
  const closeModal6 = () => {
    modal6Disclosure.onClose();
  };
  const openModal4 = () => {
    modal4Disclosure.onOpen();
  };

  const closeAllModals = async (val = false) => {

    setPopupText("Waiting for confirmation from metamask. It is better you don't leave this page");
    setApproveBNBPopup(true);
    try {
      const { confirmations, status } = await fetchTransactionData(trxHashed)
      console.log(confirmations, status)
      if (confirmations >= 1 && status) {
        closeModal6();
        openModal4()
        setPopupText(`Added ${fromValue} ${fromSelectedToken.name} and ${toValue} ${toSelectedToken.name}`);

      }
    } catch (e) {
      closeModal6();
      openModal5()
      setPopupText("Transaction failed.");
    }
  }

  const confirmingSupply = () => {
    if ((fromSelectedToken.symbol !== "BNB" && toSelectedToken.symbol === "BNB") || (fromSelectedToken.symbol === "BNB" && toSelectedToken.symbol !== "BNB")
    ) {
      addingLiquidityForETH()
    } else if ((fromSelectedToken.symbol === "RGP" && toSelectedToken.symbol !== "RGP") || (fromSelectedToken.symbol === "RGP" && toSelectedToken.symbol === "WBNB")) {
      addingLiquidity()
    } else {
      addingLiquidity()
    }
  };

  const back = (tab) => {
    setLiquidityTab(tab)
  }
  const addLiquidityPage = () => {
    setLiquidityTab("ADDLIQUIDITY")
  }
  const getAmountForLiquidity = async (value) => {
    const convertToEther = ethers.utils.parseEther(value.toString())

    setLiquidityToRemove(obj => {
      obj.path[0].amount = value.toString()
      obj.path[1].amount = value.toString()
      return obj
    })
  };
  const removeALiquidity = async (pairAddress) => {
    console.log(pairAddress)
    const liquidity = liquidities.filter(liquidity => liquidity.pairAddress === pairAddress)
    setLiquidityToRemove(liquidity[0])
    await getAmountForLiquidity(smartSwapLPBalance)
    setLiquidityTab("REMOVEALIQUIDITY")
  }
  const closeModal2 = () => {
    modal2Disclosure.onClose();
  };
  function displayBNBbutton() {
    if (fromValue !== '' && toSelectedToken.id !== 0) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  }
  function changeButtonValue() {
    if (!toSelectedToken.symbol) {
      setButtonValue('Invalid pair');
    } else if (toSelectedToken.symbol && fromValue > 0) {
      setButtonValue('Supply');
    } else {
      setButtonValue('Enter an Amount');
    }
  }
  async function calculateToValue(inputAmount = fromValue, field = 'from') {
    if (typeof wallet.signer !== 'string' && toAddress !== '' && inputAmount > 0) {
      try {
        const rout = await router(wallet.signer)
        const fromPath = ethers.utils.getAddress(fromAddress);
        const toPath = ethers.utils.getAddress(toAddress);
        const amount = await rout.getAmountsOut(
          Web3.utils.toWei(inputAmount.toString()),
          (field !== 'to') ? [fromPath, toPath] : [toPath, fromPath]
        );

        const factory = await SmartFactory();

        const LPAddress = await factory.getPair(toPath, fromPath);
        console.log(LPAddress);
        const LPcontract = await LPTokenContract(LPAddress)
        const [tokenAReserve, tokenBreserve] = await LPcontract.getReserves()
        const liqidityRatio = tokenAReserve.toString() / tokenBreserve.toString();

        if (field !== 'to' && toTokenAllowance < amount[1]) {
          setHasAllowedToToken(false);
          setShowApprovalBox(true);
          setOpenSupplyButton(true);
        }


        if (field === 'to' && toTokenAllowance < inputAmount) {
          setHasAllowedToToken(false);
          setShowApprovalBox(true);
          setOpenSupplyButton(true);
        } else {
          setHasAllowedToToken(true);
          setShowApprovalBox(false);
          setOpenSupplyButton(false);
        }
        // return (field !== 'to') ? setToValue(
        //   ethers.utils.formatEther(amount[1]).toString()) : setFromValue(ethers.utils.formatEther(amount[1]).toString())
      } catch (e) {
        props.showErrorMessage(e)
      }
    }
    return false;
  }

  async function approveBNB() {
    // setApproveBNBPopup(true);
    if (wallet.signer !== 'signer') {
      const busd = await BUSDToken();
      const walletBal = await busd.balanceOf(wallet.address);
      await busd.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
        from: wallet.address,
      });
    }
    setApproveBNBPopup(false);
    setOpenSupplyButton(false);
  }

  async function RGPCheckAllowance() {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const check = await rgp.allowance(wallet.address, SMART_SWAP.MasterChef, { from: wallet.address });
      return check;
    }
  }
  async function ETHcheckAllowance() {
    if (wallet.signer !== 'signer') {
      try {
        const eth = await WETH();
        const walletBal = await eth.balanceOf(wallet.address);
        return await eth.allowance(wallet.address, SMART_SWAP.MasterChef, { from: wallet.address });
      } catch (error) {
      }
    }
  }

  async function BUSDcheckAllowance() {
    if (wallet.signer !== 'signer') {
      const busd = await BUSDToken();
      const walletBal = await busd.balanceOf(wallet.address);
      return await busd.allowance(wallet.address, SMART_SWAP.MasterChef, { from: wallet.address });
    }
  }

  // rgp approval
  const rgpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      const result = await rgp.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('5', 'gwei')
      });
    }
  };
  // Approval for BNB Tokens
  const bnbApproval = async () => {
    if (wallet.signer !== 'signer') {
      const bnb = await BNBTOKEN();
      const walletBal = await bnb.balanceOf(wallet.address);
      await bnb.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('5', 'gwei')
      });
    }
  };
  // Approval for ETH Tokens
  const ETHApproval = async () => {
    if (wallet.signer !== 'signer') {
      const eth = await WETH();
      const walletBal = await eth.balanceOf(wallet.address);
      await eth.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('5', 'gwei')
      });
    }
    return false
  };
  // approve token
  const approveLiquidityToken = async () => {
    if (fromSelectedToken.symbol === "RGP") {
      checkUser()
      await rgpApproval()
      // checkUser()
    } else if (fromSelectedToken.symbol === "BUSD") {
      checkUser()
      await bnbApproval()
      // checkUser()
    } else if (fromSelectedToken.symbol === "WBNB") {
      checkUser()
      await ETHApproval()
      // checkUser()
    }
  }

  async function checkUser() {
    if (wallet.signer !== 'signer') {
      if (fromSelectedToken.symbol === "RGP") {
        const allowAmount = await RGPCheckAllowance();
        if (allowAmount.toString() !== "0") {
          setIsNewUser(true)
          setOpenSupplyButton(false)
          setApproveTokenSpending(true)
        } else {
          setIsNewUser(false)
          setOpenSupplyButton(true)
          setApproveTokenSpending(false)
        }
      } else if (fromSelectedToken.symbol === "BUSD") {
        const allowAmount = await BUSDcheckAllowance();
        if (allowAmount.toString() !== "0") {
          setIsNewUser(true)
          setOpenSupplyButton(false)
          setApproveTokenSpending(true)
        } else {
          setIsNewUser(false)
          setOpenSupplyButton(true)
          setApproveTokenSpending(false)
        }
      } else if (fromSelectedToken.symbol === "WBNB") {
        const allowAmount = await ETHcheckAllowance();
        if (allowAmount.toString() !== "0") {
          setIsNewUser(true)
          setOpenSupplyButton(false)
          setApproveTokenSpending(true)
        } else {
          setIsNewUser(false)
          setOpenSupplyButton(true)
          setApproveTokenSpending(false)
        }
      }
    }
  }

  return (
    <div>
      <Layout title="Liquidity Page">
        <Flex
          mx={5}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          minHeight="70vh"
          rounded="lg"
          mb={4}
        >
          {liquidityTab === LIQUIDITYTABS.INDEX &&
            <Index
              liquidities={liquidities}
              addLiquidityPage={addLiquidityPage}
              addLiquidity={addingLiquidity}
              removeLiquidity={removingLiquidity}
              // removeLiquidityForETH={removingLiquidityForETH}
              removeALiquidity={removeALiquidity}
              liquidityLoading={liquidityLoading}
            />
          }
          {liquidityTab === LIQUIDITYTABS.REMOVEALIQUIDITY &&
            <RemoveALiquidity
              back={back}
              approveSmartSwapLPTokens={approveSmartSwapLPTokens}
              removingLiquidity={removingLiquidity}
              setPercentValue={setPercentValue}
              wallet={wallet}
              liquidityToRemove={liquidityToRemove}
            />
          }
          {liquidityTab === LIQUIDITYTABS.ADDLIQUIDITY &&
            <AddLiquidity
              back={back}
              open={open}
              wallet={wallet}
              toValue={toValue}
              fromValue={fromValue}
              popupText={popupText}
              approveBNB={approveBNB}
              checkUser={checkUser}
              approveToken={approveToken}
              isNewUser={isNewUser}
              openModal3={openModal3}
              openModal4={openModal4}
              openModal5={openModal5}
              closeModal1={closeModal1}
              closeModal2={closeModal2}
              closeModal3={closeModal3}
              closeModal4={closeModal4}
              closeModal5={closeModal5}
              closeModal6={closeModal6}
              buttonValue={buttonValue}
              setToAddress={setToAddress}
              approveToToken={approveToToken}
              approveFromToken={approveFromToken}
              setFromValue={setFromValue}
              displayButton={displayButton}
              setFromAddress={setFromAddress}
              selectingToken={selectingToken}
              toSelectedToken={toSelectedToken}
              approveBNBPopup={approveBNBPopup}
              displayBNBbutton={displayBNBbutton}
              modal1Disclosure={modal1Disclosure}
              modal2Disclosure={modal2Disclosure}
              modal3Disclosure={modal3Disclosure}
              modal4Disclosure={modal4Disclosure}
              modal5Disclosure={modal5Disclosure}
              modal6Disclosure={modal6Disclosure}
              openSupplyButton={openSupplyButton}
              approveTokenSpending={approveTokenSpending}
              confirmingSupply={confirmingSupply}
              fromSelectedToken={fromSelectedToken}
              setToSelectedToken={setToSelectedToken}
              setOpenSupplyButton={setOpenSupplyButton}
              setFromSelectedToken={setFromSelectedToken}
              approveLiquidityToken={approveLiquidityToken}
              showApprovalBox={showApprovalBox}
              hasAllowedToToken={hasAllowedToToken}
              hasAllowedFromToken={hasAllowedFromToken}
              tokenFromValue={tokenFromValue}
              tokenToValue={tokenToValue}
              handleFromAmount={handleFromAmount}
              sendingTransaction={sendingTransaction}
            />
          }

        </Flex>
      </Layout>
    </div>
  );
}


const mapStateToProps = ({ wallet }) => ({ wallet })

export default connect(
  mapStateToProps,
  { showErrorMessage },
)(LiquidityPage);
