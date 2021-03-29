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
// import { SMART_SWAP, TOKENS_CONTRACT } from "../../utils/constants";
import { BUSDToken, rigelToken, router } from '../../utils/SwapConnect';
import { tokenList, TOKENS_CONTRACT } from '../../utils/constants';
import { LIQUIDITYTABS } from "./constants";

export function LiquidityPage(props) {
  const { wallet, wallet_props } = props.wallet;
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [selectingToken, setSelectingToken] = useState([
    { id: 0, name: 'Select a token', img: '' },
    { id: 1, name: 'BNB', img: 'bnb.svg', balance: wallet_props.length === 0 ? 0 : wallet_props[0].bnb },
    { id: 2, name: 'ETH', img: 'eth.svg', balance: typeof wallet.signer !== 'object' ? 0 : wallet.balance },
    { id: 3, name: 'RGP', img: 'rgp.svg', balance: wallet_props.length === 0 ? 0 : wallet_props[0].rgp },
  ]);
  const [fromSelectedToken, setFromSelectedToken] = useState({
    id: 3,
    name: 'RGP',
    img: 'rgp.svg',
    balance: wallet_props.length === 0 ? 0 : wallet_props[0].rgp
  })
  const [toSelectedToken, setToSelectedToken] = useState({})
  const [selectedValue, setSelectedValue] = useState({
    id: 0,
    name: 'Select a token',
    img: '',
  });
  const [liquidities, setLiquidities] = useState([])
  const [liquidityTab, setLiquidityTab] = useState("INDEX")
  const [popupText, setPopupText] = useState('Approve BNB');
  const [displayButton, setDisplayButton] = useState(false);
  const [approveBNBPopup, setApproveBNBPopup] = useState(false);
  const [buttonValue, setButtonValue] = useState('Invalid pair');
  const [openSupplyButton, setOpenSupplyButton] = useState(true);

  useEffect(() => {
    displayBNBbutton();
    calculateToValue();
    changeButtonValue();
  }, [fromValue, selectedValue, liquidities]);
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
      id: 0,
      name: 'Select a token',
      img: '',
    })
  }

  const addingLiquidity = async () => {
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const deadLine = Math.floor(new Date().getTime() / 1000.0 + 300);
      const tokenA = tokenList.filter((fields) => fields.symbol === fromSelectedToken.name);
      const tokenB = tokenList.filter((fields) => fields.symbol === toSelectedToken.name);
      const amountADesired = Web3.utils.toWei(fromValue.toString())
      const amountBDesired = Web3.utils.toWei(fromValue.toString())
      const amountAMin = amountADesired / amountBDesired
      const amountBMin = amountBDesired / amountADesired
      await rout.addLiquidity(
        tokenA.length > 0 ? tokenA[0].address : '', // tokenA,
        tokenB.length > 0 ? tokenB[0].address : '', // tokenB,
        // amountADesired and amountBDesired = (The amount of tokenA to add as liquidity if the B/A price)
        // input amount from and input amount to
        amountADesired,
        amountBDesired,

        // not to be shown in FE
        // checkOut
        amountAMin, // input amount of amountADesired / input amount of amountBDesired
        amountBMin, // input amount of amountADesired / input amount of amountBDesired
        wallet.address, // the recipient wallet address
        deadLine,
        {
          from: wallet.address,
        },

      );
      console.log(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin)
    }

  };

  const removingLiquidity = async () => {
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const deadLine = Math.floor(new Date().getTime() / 1000.0 + 300);
      await rout.removeLiquidity(
        // for the tokens kindly note that they will be selected from the drop down.
        // instance user select rgp for tokenA and bnb for tokenB so the token should be addressed to the listed token in TOKENS_CONTRACT
        tokenA,
        tokenB,
        uintLiquidity, // input from max
        // not to be shown in FE
        amountAMin, // inout amount of amountADesired / input amount of amountBDesired
        amountBMin, // inout amount of amountADesired / input amount of amountBDesired
        wallet.signer, // the recipient wallet address
        deadLine,
        {
          from: wallet.signer,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  useEffect(() => {

  }, [wallet]);

  // console.log('state', wallet)
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
    if (selectedValue.id === 0) {
      setButtonValue('Invalid pair');
    } else if (selectedValue.id && displayButton) {
      setButtonValue('Supply');
    } else {
      setButtonValue('Enter an Amount');
    }
  }
  async function calculateToValue() {
    const rout = await router(wallet.signer)
    try {
      //come back to this let set the Address on the state first
      const amount = await rout.getAmountsOut(
        Web3.utils.toWei(fromValue.toString()),
        (field !== 'to') ? [fromPath, toPath] : [toPath, fromPath]
      );
      return (field !== "to" ? setToValue(
        ethers.utils.formatEther(amount[1]).toString()) : setFromValue(ethers.utils.formatEther(amount[1]).toString()))
    } catch (e) {
      console.log(e)
    }
  }

  function approveBNB() {
    setApproveBNBPopup(true);
    setTimeout(() => {
      setApproveBNBPopup(false);
      setOpenSupplyButton(false);
    }, 3000);
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
          {liquidityTab === LIQUIDITYTABS.INDEX && <Index
            liquidities={liquidities}
            addLiquidityPage={addLiquidityPage} />}
          {liquidityTab === LIQUIDITYTABS.ADDLIQUIDITY && <AddLiquidity
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            back={back}
            selectingToken={selectingToken}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            fromSelectedToken={fromSelectedToken}
            toSelectedToken={toSelectedToken}
            setToSelectedToken={setToSelectedToken}
            setFromSelectedToken={setFromSelectedToken}
            displayBNBbutton={displayBNBbutton}
            displayButton={displayButton}
            setOpenSupplyButton={setOpenSupplyButton}
            popupText={popupText}
            confirmingSupply={confirmingSupply}
            approveBNBPopup={approveBNBPopup}
            approveBNB={approveBNB}
            buttonValue={buttonValue}
            openSupplyButton={openSupplyButton}
            open={open}
            openModal3={openModal3}
            closeModal1={closeModal1}
            closeModal2={closeModal2}
            closeModal3={closeModal3}
            modal1Disclosure={modal1Disclosure}
            modal2Disclosure={modal2Disclosure}
            modal3Disclosure={modal3Disclosure}
          />}

        </Flex>
      </Layout>
    </div>
  );
}

const mapStateToProps = ({ wallet }) => ({ wallet })

export default connect(
  mapStateToProps,
  null,
)(LiquidityPage);
