/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
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
import { Button, useDisclosure } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import Layout from 'components/layout/index';
import Index from 'components/liquidity/index';
import AddLiquidity from 'components/liquidity/addLiquidity';
import RemoveALiquidity from 'components/liquidity/removeALiquidity';
import { showErrorMessage, notify } from 'containers/NoticeProvider/actions';
import { BUSDToken, rigelToken, BNBTOKEN, router, LPTokenContract, WETH, smartSwapLPToken, erc20Token, SmartFactory, LiquidityPairInstance } from 'utils/SwapConnect';
import { runApproveCheck, approveToken } from 'utils/wallet-wiget/TokensUtils';
import { tokenList, tokenWhere, SMART_SWAP,  checkIfTokenIsListed } from '../../utils/constants';
import { changeRGPValue } from '../WalletProvider/actions';
import { LIQUIDITYTABS } from "./constants";
import { isNotEmpty , getDeadline, createURLNetwork } from "../../utils/UtilFunc";
import {getTokenList } from "../../utils/tokens"

import { useLocalStorage } from '../../utils/hooks/storageHooks'
import { create } from 'react-test-renderer';

// 35,200
export function LiquidityPage(props) {
  const history = useHistory()
  const { wallet, wallet_props } = props.wallet;
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [isNewUser, setIsNewUser] = useState(false)
  const [selectingToken, setSelectingToken] = useState(tokenList);
  const [fromSelectedToken, setFromSelectedToken] = useState(tokenWhere('rgp'))
  const [fromAddress, setFromAddress] = useState(fromSelectedToken.address)
  const [toAddress, setToAddress] = useState('')
  const [toSelectedToken, setToSelectedToken] = useState(tokenWhere('SELECT A TOKEN'))
  const [liquidities, setLiquidities] = useState([])
  const [liquidityTab, setLiquidityTab] = useState("INDEX");
  const [popupText, setPopupText] = useState('Approving Account');
  const [displayButton, setDisplayButton] = useState(false);
  const [approveBNBPopup, setApproveBNBPopup] = useState(false);
  const [buttonValue, setButtonValue] = useState('Supply');
  const [openSupplyButton, setOpenSupplyButton] = useState(false);
  const [approveTokenSpending, setApproveTokenSpending] = useState(false);
  const [percentValue, setPercentValue] = useState(0)
  const [liquidityToRemove, setLiquidityToRemove] = useState({})
  const [smartSwapLPBalance, setSmartSwapLPBalance] = useState("")
  const [hasAllowedFromToken, setHasAllowedFromToken] = useState(false)
  const [hasAllowedToToken, setHasAllowedToToken] = useState(false)
  const [showApprovalBox, setShowApprovalBox] = useState(true)
  const [tokenFromValue, setTokenFromValue] = useState("")
  const [trxHashed, setTrxHashed] = useState({})
  const [sendingTransaction, setSendingTransaction] = useState(false)
  const [tokenToValue, setTokenToValue] = useState("")
  const [URLNetwork, setURLNetwork] = useState("")
  const [fromTokenAllowance, setFromTokenAllowance] = useState('')
  const [toTokenAllowance, setToTokenAllowance] = useState('')
  const [liquidityLoading, setLiquidityLoading] = useState(false)
  const [liquidityPairRatio, setLiquidityPairRatio] = useState(0)
  const [hasApprovedLPTokens, setHasApprovedLPTokens] = useState(false)
  const [approving, setApproving] = useState(false)
  const [addLiquidityPageHeading, setAddLiquidityPageHeading] = useState(false)
  const [newTokenPairButton, setNewTokenPairButton] = useState(false)
  const [addMoreLiquidityButton, setAddMoreLiquidityButton] = useState(false)
  const [insufficientBalanceButton, setInsufficientBalanceButton] = useState(false)
  const [fromURL, setFromURL] = useState("")
  const [toURL, setToURL] = useState("")
  const [disableToSelectInputBox, setDisableToSelectInputBox] = useState(true)
  const [deadline, setDeadline] = useLocalStorage('deadline', 20)
  const [determineInputChange, setDetermineInputChange] = useState("");
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
  useEffect(() => {
      setPopupText("")
  },[liquidityTab,showApprovalBox,openSupplyButton,insufficientBalanceButton])
  useEffect(() => {
    displayBNBbutton();
  }, [toSelectedToken, liquidities]);

  useEffect(() => {
    if (props.match.params.pair !== undefined) {
      const { pair } = props.match.params;
      const pairArray = pair.split('-');
      setLiquidityTab("ADDLIQUIDITY")
      if(pairArray.length===2 ){
        setFromURL(pairArray[0])
        setToURL(pairArray[1])
 getTokensListed(pairArray)
      }else{
        history.push("/liquidity")
      }
    }
  }, [wallet])

  
  useEffect(() => {
    setUpUrl(fromSelectedToken,toSelectedToken)
    if (fromSelectedToken.symbol !== "SELECT A TOKEN" && toSelectedToken.symbol !== "SELECT A TOKEN") {
   checkIfLiquidityPairExist(fromSelectedToken.address,toSelectedToken.address)
    }
  }, [fromSelectedToken, toSelectedToken,fromAddress,toAddress])

  useEffect(async () => {
    if(determineInputChange==="from"){
      handleFromAmount()
   }else if(determineInputChange==="to"){
     handleToAmount()
   }
    if (!isNotEmpty(fromSelectedToken) && fromValue != '') {
      const tokenAllowance = await runApproveCheck(fromSelectedToken, wallet.address, wallet.signer);
      setFromTokenAllowance(tokenAllowance);

      if (Number(tokenAllowance) > Number(fromValue)) {
        setHasAllowedFromToken(true);
      } else {
        setHasAllowedFromToken(false);
      }

    }
    if (!isNotEmpty(toSelectedToken) && toValue != '') {
      const tokenAllowance = await runApproveCheck(toSelectedToken, wallet.address, wallet.signer);
      setToTokenAllowance(tokenAllowance);

      if (Number(tokenAllowance) > Number(toValue)) {
        setHasAllowedToToken(true)
      } else {
        setHasAllowedToToken(false);
      }
    }
    if((parseInt(fromValue) > parseInt(fromSelectedToken.balance)) || (parseInt(toValue) > parseInt(toSelectedToken.balance))){
      setInsufficientBalanceButton(true)
    }else{
      setInsufficientBalanceButton(false)
    } 
  }, [fromValue, toValue])

  useEffect(() => {
    if (wallet.address != "0x") {
      getAllLiquidities();
    }
  }, [wallet])
  useEffect(() => {
    if (wallet.address != "0x") {
     checkIfTokensHasBeenApproved()
    }
  }, [hasAllowedFromToken,hasAllowedToToken])
  useEffect(() => {
    const balanceOfUserLPs = async () => {

      if (wallet.address != "0x") {
        try {
          const smartSwapLP = await smartSwapLPToken();
          const walletBal = await smartSwapLP.balanceOf(wallet.address);
          const checkWalletBal = ethers.utils.formatEther(walletBal, 'ether');
          const liquidityValue = liquidities.length && (liquidities[0].path[0].fromPath);
          const convertValue = ethers.utils.formatEther(liquidityValue, 'ether');
          const stateValue = Number((convertValue.toString() * percentValue) / 100) / 1e+18;
          const value = (checkWalletBal.toString() * percentValue) / 100;
          setSmartSwapLPBalance(stateValue)
        } catch (error) {
          console.error(error)
        }
      }
    }


    const getBalance = async () => {
      await balanceOfUserLPs()
      if (smartSwapLPBalance) {
        await getAmountForLiquidity(smartSwapLPBalance)
      }
    }
    getBalance()
  }, [percentValue, wallet])

  const handleFromAmount = () => {
    if(!newTokenPairButton){
      setToValue((fromValue * liquidityPairRatio).toString());
    }
  }
  const handleToAmount = () => {
    if(!newTokenPairButton){
      setFromValue((toValue / liquidityPairRatio).toString());
    }
  }

const getTokensListed = async (pairArray) => {
 const selection0 = await getTokenList(pairArray[0],wallet)
 const selection1 = await getTokenList(pairArray[1],wallet)
setFromAndToToken(selection0,selection1)
 if(selection0 !== [] && selection1[0]!== []){
   checkIfLiquidityPairExist()  
 }
}
const setUpUrl = () => {
  if (fromSelectedToken.symbol !== "SELECT A TOKEN" && toSelectedToken.symbol !== "SELECT A TOKEN") {
    const toTokenURL = checkIfTokenIsListed(fromSelectedToken.symbol) ? fromSelectedToken.symbol : fromSelectedToken.address
    const fromTokenURL = checkIfTokenIsListed(toSelectedToken.symbol) ? toSelectedToken.symbol : toSelectedToken.address
    setFromURL(fromTokenURL)
        setToURL(toTokenURL)
    history.push(`/liquidity/${toTokenURL}-${fromTokenURL}`)
  } else{
    history.push('/liquidity')
  }
 
}

  const checkIfLiquidityPairExist = async (fromAddress = fromSelectedToken.address,toAddress = toSelectedToken.address) => {
      const factory = await SmartFactory();
    const fromPath = ethers.utils.getAddress(fromAddress);
    const toPath = ethers.utils.getAddress(toAddress);
    const LPAddress = await factory.getPair(toPath,fromPath)
if (LPAddress !== "0x0000000000000000000000000000000000000000" ){ 
   setNewTokenPairButton(false)
   setButtonValue("Supply")
  getLiquidityPairRatio()
}else{
  openModal7()
}
  }
  const getLiquidityPairRatio = async () => {
    try {
      const factory = await SmartFactory();
      const fromPath = ethers.utils.getAddress(fromAddress);
      const toPath = ethers.utils.getAddress(toAddress);
      const LPAddress = await factory.getPair(toPath, fromPath);
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
const setFromAndToToken =(selection0,selection1)=>{
 
  if(selection0 !== []) {
    setFromSelectedToken(selection0[0])
    setFromAddress(selection0[0].address)
   }
  if(selection1 !== []) {
    setToSelectedToken(selection1[0])
    setToAddress(selection1[0].address)
   }
}
  const changeButtonCreateNewTokenPair = async () =>{
    closeModal7()
    setNewTokenPairButton(true)
    setDisableToSelectInputBox(false)
    setButtonValue("Create a new pool")
  }
  useEffect(() => {
    const checkData = async () => {
      if (wallet.signer !== 'signer') {
        await checkUser()
      }
    }
    checkData()
  }, [fromAddress])


 

  const getAllPairs = (length, allPairs) => {
    const pairs = [];
    for (let i = 0; i < length; i++) {
      pairs.push(allPairs(i))
    }
    return pairs;
  }

  const getPoolData = async (address) => {
    const liquidity = await LiquidityPairInstance(address);
    const [balance, totalSupply, reserves, token0, token1] = await Promise.all([
      liquidity.balanceOf(wallet.address),
      liquidity.totalSupply(),
      liquidity.getReserves(),
      liquidity.token0(),
      liquidity.token1()
    ])
    const [erc20Token0, erc20Token1] = await Promise.all([
      erc20Token(token0),
      erc20Token(token1)
    ])
    const [symbol0, symbol1] = await Promise.all([
      erc20Token0.symbol(),
      erc20Token1.symbol()
    ])
    const pooledToken0 = ((balance / totalSupply) * reserves[0]) / 1e+18;
    const pooledToken1 = ((balance / totalSupply) * reserves[1]) / 1e+18;

    const liquidityObject = {
      pairAddress: address,
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
    return liquidityObject;
  }


  const getAllLiquidities = async () => {
    setLiquidityLoading(true);
    try {
      const smartFactory = await SmartFactory();
      const allLiquidityPairs = await smartFactory.allPairsLength();
      const allExchange = await Promise.all(getAllPairs(allLiquidityPairs.toNumber(), smartFactory.allPairs))
      const pairsData = await Promise.all(allExchange.map((address) => getPoolData(address)))
      const userPairs = pairsData.filter(pair => pair.poolToken != 0)
      setLiquidities(userPairs)

    } catch (error) {
      console.error(error)
    } finally {
      setLiquidityLoading(false)
    }

  }
const checkIfTokensHasBeenApproved =() => {
  if(hasAllowedFromToken && hasAllowedToToken ){ 
    setShowApprovalBox(false);
    setOpenSupplyButton(true);
  }else{
    setShowApprovalBox(true);
    setOpenSupplyButton(false);
  }
}
  const approveToToken = async () => {
    try {
      if (!isNotEmpty(toSelectedToken)) {
        const balance = await tokenBalance(toSelectedToken.address, wallet.address)
        const approveResponse = await approveToken(wallet.address, toSelectedToken.address, wallet.signer, balance);
        const { confirmations, status } = await fetchTransactionData(approveResponse)
        if (confirmations >= 1 && status) {
          closeModal6();
          setShowApprovalBox(false);
          setHasAllowedToToken(true);
          // setOpenSupplyButton(false);
        checkIfTokensHasBeenApproved()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const tokenBalance = async (tokenAddress, walletAddress) => {
    try {
      if (wallet.address != "0x") {
        const token = await erc20Token(tokenAddress);
        const balance = await token.balanceOf(walletAddress);
        return ethers.utils.formatEther(balance);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const approveFromToken = async () => {
    if (!isNotEmpty(fromSelectedToken)) {
      const balance = await tokenBalance(fromSelectedToken.address, wallet.address)
      const approveResponse = await approveToken(wallet.address, fromSelectedToken.address, wallet.signer, balance);
      const { confirmations, status } = await fetchTransactionData(approveResponse)
      if (confirmations >= 1 && status) {
        closeModal6();
        setShowApprovalBox(false);
        setHasAllowedFromToken(true);
        // setOpenSupplyButton(false);
      checkIfTokensHasBeenApproved()
      }
    }
  }
  const setFromInputMax = () =>{
    try{
setDetermineInputChange("from")
    setFromValue(fromSelectedToken.balance)
    }catch(e){
      console.log(e)
    }
    
  }
  const setToInputMax = () =>{
    try{
setDetermineInputChange("to")
    setToValue(toSelectedToken.balance)
    }catch(e){
      console.log(e)
    }
    
  }

  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const modal3Disclosure = useDisclosure();
  const modal4Disclosure = useDisclosure();
  const modal5Disclosure = useDisclosure();
  const modal6Disclosure = useDisclosure();
  const modal7Disclosure = useDisclosure();

  function closeInput() {
    setApproveBNBPopup(false)
    setFromValue("")
    setToValue("")
    setOpenSupplyButton(false)
    setPopupText("Approve")
    setDisplayButton(false)
    setFromSelectedToken(tokenWhere('rgp'))
    setToSelectedToken(tokenWhere("SELECT A TOKEN"))
    setFromAddress("")
    setToAddress("")
    setNewTokenPairButton(false)
    setButtonValue("Supply")
    setInsufficientBalanceButton(false)
    setHasAllowedFromToken(false)
    setHasAllowedToToken(false)
    onCloseModal()
  }

  const addingLiquidity = async () => {
    if (wallet.signer !== 'signer') {
      try {
        const rout = await router();
        const deadLine = getDeadline(deadline);
        const amountADesired = Web3.utils.toWei(fromValue.toString())
        const amountBDesired = Web3.utils.toWei(toValue.toString())
        const amountAMin =Web3.utils.toWei((fromValue * 0.8).toString())
        const amountBMin = Web3.utils.toWei((toValue * 0.8).toString())
        closeModal1()
        modal2Disclosure.onOpen()
        const data = await rout.addLiquidity(
          fromAddress,
          toAddress,
          amountADesired.toString(),
          amountBDesired.toString(),
          amountAMin.toString(),
          amountBMin,
          wallet.address,
          deadLine,
          {
            from: wallet.address,
            gasLimit: newTokenPairButton ? 5900008 : 390000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          },
        );
        setTrxHashed(data)
        const { hash } = data
        setURLNetwork("")
        setTimeout(()=> setURLNetwork(createURLNetwork(wallet.chainId,hash)) ,3000)
        closeModal2()
        openModal3()
      } catch (e) {
        console.log(trxHashed)
        props.showErrorMessage(e)
        closeModal2()
        openModal5()
      }
    }
  };
  const addMoreLiquidity = async (liquidity) =>{
    setAddMoreLiquidityButton(true)
    clearAllPreviousData()
    const { path } = liquidity
    const selection0 = await getTokenList(path[1].toPath,wallet)
    const selection1 = await getTokenList(path[0].fromPath,wallet)
    setFromAndToToken(selection0,selection1)
    setAddMoreLiquidityButton(false)
    setLiquidityTab("ADDLIQUIDITY")

  }
  const clearAllPreviousData = () =>{
    history.push("/liquidity")
    setFromSelectedToken(tokenWhere('SELECT A TOKEN'))
    setToSelectedToken(tokenWhere('SELECT A TOKEN'))
    setFromValue("")
    setToValue("0")
    setLiquidityPairRatio(0)
    setToAddress("")
    setFromAddress("")
  }
  const fetchTransactionData = async (sendTransaction) => {
    modal6Disclosure.onOpen();
    const { confirmations, status } = await sendTransaction.wait(1);
    return { confirmations, status }
  }

  const addingLiquidityForETH = async () => {
    if (wallet.signer !== 'signer') {
      try {
        let EthValue; let amountTokenDesired; let tokenSelected;
        if (fromSelectedToken.symbol === "BNB") {
          EthValue = fromValue;
          amountTokenDesired = toValue;
          tokenSelected = toAddress;
        } else {
          EthValue = toValue;
          amountTokenDesired = fromValue;
          tokenSelected = fromAddress;
        }
        const rout = await router();
        const deadLine = getDeadline(deadline);
        closeModal1()
        modal2Disclosure.onOpen()
        const data = await rout.addLiquidityETH(
          tokenSelected,
          ethers.utils.parseEther(amountTokenDesired.toString(), 'ether'),
          ethers.utils.parseEther((amountTokenDesired * 0.8).toString(), 'ether'),
          ethers.utils.parseEther((EthValue * 0.8).toString(), 'ether'),
          wallet.address.toString(),
          deadLine,
          {
            value: Web3.utils.toWei(EthValue.toString()),
            gasLimit: newTokenPairButton ? 5900008 : 1000000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          }
        );
        setTrxHashed(data)
        closeModal2()
        openModal3()
      } catch (e) {
        props.showErrorMessage(e)
        console.log(e.message)
        openModal5()
      }
    }
  };


  const removingLiquidity = async (liquidity, tokenA, tokenB) => {
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const checking = ethers.utils.parseEther(liquidity.toString());

      const deadLine = getDeadline(deadline);
      try {
        setApproving(true);
        const hasRemovedLiquidity = await rout.removeLiquidity(
          tokenA,
          tokenB,
          checking.toString(),
          0,
          0,
          wallet.address,
          deadLine,
          {
            from: wallet.address,
            gasLimit: 390000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          },
        );
        const { confirmations, status } = await hasRemovedLiquidity.wait(2);
        if (typeof hasRemovedLiquidity.hash !== 'undefined' && confirmations >= 2 && status) {
          setApproving(false);
          props.notify({
            title: 'Process Completed',
            body: 'You have successfully remove the liquidity',
            type: 'success'
          });
          back('ADDLIQUIDITY');
        }
      } catch (error) {
        props.showErrorMessage('Oops we encountered an error please try again later');
      }
    }
  }

  async function approveSmartSwapLPTokens(LPTokenAddress) {
    if (wallet.signer !== 'signer') {
      try {
        setApproving(true);
        const smartSwapLP = await LPTokenContract(LPTokenAddress);
        const walletBal = await smartSwapLP.balanceOf(wallet.address) + 4e18;
        const approveTransaction = await smartSwapLP.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
          from: wallet.address,
        });
        const { confirmations, status } = await approveTransaction.wait(2);
        if (typeof approveTransaction.hash !== 'undefined' && confirmations >= 2 && status) {
          setHasApprovedLPTokens(true);
          setApproving(false);
        }
      } catch (e) {
        props.showErrorMessage('Oops we encountered an error please try again later')
      }
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

  const open = async (value) => {
    // CHECK IF THERE IS LIQUIDITY ON THIS, BY CALLING THE GETPATR FUNCTION ON SMARTFACTORY
    // IF IT DOES CONTINUE WITH THE PROCESS
    // IF NOT SHOW A MODAL THAT TELLS THE USER TO ADD LIQUIDITY TO THIS SET OF PAIRS 
    if(value === "new"){
      const value1 = (parseFloat(fromValue) / parseFloat(toValue)).toFixed(5)
      const value2 = (parseFloat(toValue) / parseFloat(fromValue)).toFixed(5)
      setTokenFromValue(value1)
      setTokenToValue(value2)
    }else{
      await getPriceForToken()
    }
    
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
  const closeModal4 = () => {
    modal4Disclosure.onClose();
    onOpenModal()
    setPopupText("wait you will be redirected")
    getAllCurrentLiquities()
  };
  const getAllCurrentLiquities = async () => {
    await getAllLiquidities()
    props.changeRGPValue(wallet)
    const liquid = liquidities.filter(liquid => (liquid.path[0].token === fromSelectedToken.symbol && liquid.path[1].token === toSelectedToken.symbol) || (liquid.path[0].token === toSelectedToken.symbol && liquid.path[1].token === fromSelectedToken.symbol))[0]
    closeInput()
    if (liquid) {
      removeALiquidity(liquid.pairAddress)
    } else {
      setLiquidityTab("INDEX")
    }

  }
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

  const openModal7 = () =>{
    modal7Disclosure.onOpen()
  }
  const closeModal7 = () =>{
    modal7Disclosure.onClose()
  }

  const closeAllModals = async (val = false) => {

    setPopupText("Waiting for confirmation from metamask. It is better you don't leave this page");
    setApproveBNBPopup(true);
    try {
      const { confirmations, status } = await fetchTransactionData(trxHashed)
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
  const addLiquidityPage = (head,newPair) => {
    setLiquidityTab("ADDLIQUIDITY")
setAddLiquidityPageHeading(head)
newPair ? setNewTokenPairButton(true) : setNewTokenPairButton(false)
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
      const walletBal = await busd.balanceOf(wallet.address) + 4e18;
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
        return await eth.allowance(wallet.address, SMART_SWAP.MasterChef, { from: wallet.address });
      } catch (error) {
      }
    }
  }

  async function BUSDcheckAllowance() {
    if (wallet.signer !== 'signer') {
      const busd = await BUSDToken();
      return await busd.allowance(wallet.address, SMART_SWAP.MasterChef, { from: wallet.address });
    }
  }

  // rgp approval
  const rgpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address) + 4e18;
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
      const walletBal = await bnb.balanceOf(wallet.address) + 4e18;
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
      const walletBal = await eth.balanceOf(wallet.address) + 4e18;
      await eth.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('5', 'gwei')
      });
    }
    return false
  };

  async function checkUser() {
    if (wallet.signer !== 'signer') {
      if (fromSelectedToken.symbol === "RGP") {
        const allowAmount = await RGPCheckAllowance();
        if (allowAmount.toString() !== "0") {
          setIsNewUser(true)
          setOpenSupplyButton(true)
          setApproveTokenSpending(true)
        } else {
          setIsNewUser(false)
          setOpenSupplyButton(false)
          setApproveTokenSpending(false)
        }
      } else if (fromSelectedToken.symbol === "BUSD") {
        const allowAmount = await BUSDcheckAllowance();
        if (allowAmount.toString() !== "0") {
          setIsNewUser(true)
          setOpenSupplyButton(true)
          setApproveTokenSpending(true)
        } else {
          setIsNewUser(false)
          setOpenSupplyButton(false)
          setApproveTokenSpending(false)
        }
      } else if (fromSelectedToken.symbol === "WBNB") {
        const allowAmount = await ETHcheckAllowance();
        if (allowAmount.toString() !== "0") {
          setIsNewUser(true)
          setOpenSupplyButton(true)
          setApproveTokenSpending(true)
        } else {
          setIsNewUser(false)
          setOpenSupplyButton(false)
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
              addMoreLiquidity={addMoreLiquidity}
              removeLiquidity={removingLiquidity}
              addMoreLiquidityButton={addMoreLiquidityButton}
              removeALiquidity={removeALiquidity}
              liquidityLoading={liquidityLoading}
            />
          }
          {liquidityTab === LIQUIDITYTABS.REMOVEALIQUIDITY &&
            <RemoveALiquidity
              back={back}
              approving={approving}
              approveSmartSwapLPTokens={approveSmartSwapLPTokens}
              removingLiquidity={removingLiquidity}
              setPercentValue={setPercentValue}
              wallet={wallet}
              liquidityToRemove={liquidityToRemove}
              hasApprovedLPTokens={hasApprovedLPTokens}
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
              closeModal7={closeModal7}
              changeButtonCreateNewTokenPair={changeButtonCreateNewTokenPair}
              buttonValue={buttonValue}
              insufficientBalanceButton={insufficientBalanceButton}
              newTokenPairButton={newTokenPairButton}
              setToAddress={setToAddress}
              approveToToken={approveToToken}
              approveFromToken={approveFromToken}
              setFromValue={setFromValue}
              displayButton={displayButton}
              setFromAddress={setFromAddress}
              selectingToken={selectingToken}
              toSelectedToken={toSelectedToken}
              addLiquidityPageHeading={addLiquidityPageHeading}
              approveBNBPopup={approveBNBPopup}
              displayBNBbutton={displayBNBbutton}
              modal1Disclosure={modal1Disclosure}
              modal2Disclosure={modal2Disclosure}
              modal3Disclosure={modal3Disclosure}
              modal4Disclosure={modal4Disclosure}
              modal5Disclosure={modal5Disclosure}
              modal6Disclosure={modal6Disclosure}
              modal7Disclosure={modal7Disclosure}
              openSupplyButton={openSupplyButton}
              URLNetwork={URLNetwork}
              checkIfLiquidityPairExist={checkIfLiquidityPairExist}
              approveTokenSpending={approveTokenSpending}
              confirmingSupply={confirmingSupply}
              fromSelectedToken={fromSelectedToken}
              setFromInputMax={setFromInputMax}
              setToInputMax={setToInputMax}
              setToSelectedToken={setToSelectedToken}
              setOpenSupplyButton={setOpenSupplyButton}
              setFromSelectedToken={setFromSelectedToken}
              showApprovalBox={showApprovalBox}
              hasAllowedToToken={hasAllowedToToken}
              hasAllowedFromToken={hasAllowedFromToken}
              tokenFromValue={tokenFromValue}
              tokenToValue={tokenToValue}
              setDetermineInputChange={setDetermineInputChange}
              sendingTransaction={sendingTransaction}
              onCloseModal ={onCloseModal}
              setToValue={setToValue}
              isOpenModal ={isOpenModal}
              disableToSelectInputBox={disableToSelectInputBox}
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
  { showErrorMessage, notify, changeRGPValue },
)(LiquidityPage);
