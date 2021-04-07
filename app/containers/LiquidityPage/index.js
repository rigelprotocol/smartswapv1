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
import { useDisclosure } from '@chakra-ui/react';
import Layout from 'components/layout/index';
import Index from 'components/liquidity/index';
import AddLiquidity from 'components/liquidity/addLiquidity';
import SwapSettings from "../../components/sendToken/SwapSettings"
import { showErrorMessage } from 'containers/NoticeProvider/actions';
import { router, rigelToken, BUSDToken } from '../../utils/SwapConnect';
import { tokenList, tokenWhere } from '../../utils/constants';
import { LIQUIDITYTABS } from "./constants";
import { SMART_SWAP } from './../../utils/constants';
// 35,200
export function LiquidityPage(props) {
  const { wallet, wallet_props } = props.wallet;
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [isNewUser, setIsNewUser] = useState(false)
  const [selectingToken, setSelectingToken] = useState(tokenList);
  const [fromSelectedToken, setFromSelectedToken] = useState(tokenWhere('rgp'))
  const [fromAddress, setFromAddress] = useState(fromSelectedToken.address)
  const [toAddress, setToAddress] = useState('')
  const [toSelectedToken, setToSelectedToken] = useState({})
  const [selectedValue, setSelectedValue] = useState({
    name: 'Select Token',
    img: '',
  });
  const [liquidities, setLiquidities] = useState([])
  const [liquidityTab, setLiquidityTab] = useState("INDEX")
  const [popupText, setPopupText] = useState('Approving Account');
  const [displayButton, setDisplayButton] = useState(false);
  const [approveBNBPopup, setApproveBNBPopup] = useState(false);
  const [buttonValue, setButtonValue] = useState('Invalid pair');
  const [openSupplyButton, setOpenSupplyButton] = useState(true);
  const [approveTokenSpending, setApproveTokenSpending] = useState(false);
  const [transactionDeadline, setTransactionDeadline] = useState("1234")
  useEffect(() => {

    displayBNBbutton();
    calculateToValue();
    changeButtonValue();

  }, [fromValue, selectedValue, liquidities]);
  useEffect(() => {
    checkAllowance();
    checkUser();
  }, [])

  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const modal3Disclosure = useDisclosure();

  function addDataCloseInputs(data) {
    setLiquidities([...liquidities, data])
    // close all opened values
    setApproveBNBPopup(false)
    setFromValue(0)
    calculateToValue()
    setOpenSupplyButton(true)
    setPopupText(`Approve`)
    setButtonValue("Invalid pair")
    setDisplayButton(false)
    setSelectedValue({
      name: 'Select a token',
      img: '',
    })
  }

  const addingLiquidity = async () => {
    if (wallet.signer !== 'signer') {
      try {
        const rout = await router();
        const deadLine = Math.floor(new Date().getTime() / 1000.0 + 300);
        const amountADesired = Web3.utils.toWei(fromValue.toString())
        const amountBDesired = Web3.utils.toWei(toValue.toString())
        const amountAMin = Web3.utils.toWei((amountADesired / amountBDesired).toString())
        const amountBMin = Web3.utils.toWei((amountBDesired / amountADesired).toString())
        await rout.addLiquidity(
          fromAddress,
          toAddress,
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          wallet.address,
          deadLine,
          {
            from: wallet.address,
          },
        );
      } catch (e) {
        props.showErrorMessage(e)
      }
    }

  };

  const removingLiquidity = async () => {
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const deadLine = Math.floor(new Date().getTime() / 1000.0 + 300);
      const amountAMin = Web3.utils.toWei(fromValue.toString())
      const amountBMin = Web3.utils.toWei(toValue.toString())
      await rout.removeLiquidity(
        fromAddress,
        toAddress,
        uintLiquidity,
        amountAMin,
        amountBMin,
        wallet.signer,
        deadLine,
        {
          from: wallet.signer,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  const open = () => {
    modal1Disclosure.onOpen();
  };

  const closeModal1 = () => {
    modal1Disclosure.onClose();
  };
  const closeModal3 = () => {
    modal3Disclosure.onClose();
  };
  // open the last modal
  const openModal3 = () => {
    modal3Disclosure.onOpen();
    // close all modal one by one
    setTimeout(() => {
      closeModal3();
    }, 5000);
    setTimeout(() => {
      closeModal2();
    }, 6000);
    setTimeout(() => {
      closeModal1();
      setPopupText(`Add ${fromValue} RGP and ${toValue} ${selectedValue.name}`);
      setApproveBNBPopup(true);
    }, 7000);
    setTimeout(() => {
      setLiquidityTab("INDEX")
      // add transaction to liquidity array and fix all opened input

      const data = {
        id: 1,
        imageFrom: '<BNBImage/>',
        imageTo: '<RGPImage/>',
        from: 'BNB',
        to: 'RGP',
        pooledRGP: 1,
        pooledBNB: '1.89849849',
        poolToken: '0.838383',
        poolShare: '0.00%',
      }
      addDataCloseInputs(data)
    }, 12000)
  };
  const confirmingSupply = () => {
    addingLiquidity()
  };

  const back = () => {
    setLiquidityTab("INDEX")
  }
  const addLiquidityPage = () => {
    setLiquidityTab("ADDLIQUIDITY")
  }
  const closeModal2 = () => {
    modal2Disclosure.onClose();
  };
  function displayBNBbutton() {
    if (fromValue !== '' && selectedValue.id !== 0) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  }
  function changeButtonValue() {
    if (!selectedValue.symbol) {
      setButtonValue('Invalid pair');
    } else if (selectedValue.symbol && fromValue > 0) {
      setButtonValue('Supply');
    } else {
      setButtonValue('Enter an Amount');
    }
  }
  async function calculateToValue() {
    if (typeof wallet.signer !== 'string' && toAddress !== '' && fromValue > 0) {
      try {
        const rout = await router(wallet.signer)
        const fromPath = ethers.utils.getAddress(fromAddress);
        const toPath = ethers.utils.getAddress(toAddress);
        const amount = await rout.getAmountsOut(
          Web3.utils.toWei(fromValue.toString()),
          [fromPath, toPath]
        );
        return setToValue(
          ethers.utils.formatEther(amount[1]).toString())
      } catch (e) {
        props.showErrorMessage(e)
      }
    }
    return false;
  }

  async function approveBNB() {
    setApproveBNBPopup(true);
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

  async function checkAllowance() {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      return await rgp.allowance(wallet.address, SMART_SWAP.MasterChef, { from: wallet.address });
    }
  }

  //checking user status
  async function checkUser() {
    if (wallet.signer !== 'signer') {
      console.log("checking user")
      const allowAmount = await checkAllowance();
      console.log("the main val: ", allowAmount.toString());
      console.log(allowAmount);
      console.log(allowAmount.toString(), typeof allowAmount.toString());
      console.log(typeof allowAmount);
      console.log(allowAmount.toString() !== "0");
      if (allowAmount.toString() !== "0") {
        alert("you have approved")
        setIsNewUser(true)
        setApproveTokenSpending(true)
      } else {
        alert("please approve first")
        await approveBNB()
        if (allowAmount.toString() !== "0") {
          setIsNewUser(true)
          setApproveTokenSpending(true)
        } else {
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
              isNewUser={isNewUser}
              openModal3={openModal3}
              closeModal1={closeModal1}
              closeModal2={closeModal2}
              closeModal3={closeModal3}
              buttonValue={buttonValue}
              setToAddress={setToAddress}
              setFromValue={setFromValue}
              approveTokenSpending={approveTokenSpending}
              displayButton={displayButton}
              selectedValue={selectedValue}
              setFromAddress={setFromAddress}
              selectingToken={selectingToken}
              toSelectedToken={toSelectedToken}
              approveBNBPopup={approveBNBPopup}
              displayBNBbutton={displayBNBbutton}
              setSelectedValue={setSelectedValue}
              modal1Disclosure={modal1Disclosure}
              modal2Disclosure={modal2Disclosure}
              modal3Disclosure={modal3Disclosure}
              openSupplyButton={openSupplyButton}
              confirmingSupply={confirmingSupply}
              fromSelectedToken={fromSelectedToken}
              setToSelectedToken={setToSelectedToken}
              setOpenSupplyButton={setOpenSupplyButton}
              setFromSelectedToken={setFromSelectedToken}
            />
          }

        </Flex>
        {/* <SwapSettings
          transactionDeadline={transactionDeadline}
          setTransactionDeadline={setTransactionDeadline}
        /> */}
      </Layout>
    </div>
  );
}


const mapStateToProps = ({ wallet }) => ({ wallet })

export default connect(
  mapStateToProps,
  { showErrorMessage },
)(LiquidityPage);
