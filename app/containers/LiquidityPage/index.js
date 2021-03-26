/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// @ts-nocheck
/**
 *
 * LiquidityPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Flex } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import Layout from 'components/layout/index';
import Index from 'components/liquidity/index';
import AddLiquidity from 'components/liquidity/addLiquidity';
import { LIQUIDITYTABS } from "./constants";
import makeSelectLiquidityPage from './selectors';

export function LiquidityPage() {

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [selectingToken, setSelectingToken] = useState([
    { id: 0, name: 'Select a token', img: '' },
    { id: 1, name: 'BNB', img: 'bnb.svg' },
    { id: 2, name: 'ETH', img: 'eth.svg' },
    { id: 3, name: 'RGP', img: 'rgp.svg' },
  ]);
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
    setPopupText("Approve BNB")
    setButtonValue("Invalid pair")
    setDisplayButton(false)
    setSelectedValue({
      id: 0,
      name: 'Select a token',
      img: '',
    })
  }

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

      let data = {
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
    modal2Disclosure.onOpen();
    setTimeout(() => {
      openModal3();
    }, 5000);
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
  function calculateToValue() {
    setToValue((fromValue * 10) - 4.637)
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

LiquidityPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ state }) => ({ state });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LiquidityPage);
