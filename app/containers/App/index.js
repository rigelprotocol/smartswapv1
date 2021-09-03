// @ts-nocheck
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, theme } from '@chakra-ui/react';
import { ToastProvider } from 'react-toast-notifications';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';
import { ethers } from 'ethers';
import HomePage from 'containers/HomePage/index';
import FarmingPage from 'containers/FarmingPage/index';
import MarginTradingPage from 'containers/MarginTradingPage/index';
import LiquidityPage from 'containers/LiquidityPage/index';
import NotFoundPage from 'containers/NotFoundPage/index';
import Splash from 'components/splash/index';
import '../../styles/globals.css';
import { setWallet } from 'containers/WalletProvider/saga';
import { notify } from 'containers/NoticeProvider/actions';
import Toast from '../../components/Toast';
import {
  reConnect,
  disconnectWallet,
  updateChainId,
  getTokenList,
  updateRGPprice,
} from '../WalletProvider/actions';
import TrustWallet from '../../components/TrustWallet/index';
import {
  isSupportedNetwork,
  switchToBSC,
} from '../../utils/wallet-wiget/connection';
import { smartSwapLPTokenPoolOne } from '../../utils/SwapConnect';

const breakpoints = {
  sm: '360px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
};

WebFont.load({
  google: {
    families: [
      'Titillium Web:300,400,700',
      'Poppins:100,200,400',
      'Roboto:300,400,700',
      'sans-serif',
    ],
  },
});
const newTheme = {
  ...theme,
  breakpoints,
};

const App = props => {
  const { wallet } = props.state;
  useEffect(() => {
    (async () => {
      await props.getTokenList();
    })();
  }, [wallet]);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isConnected()) {
      getMetaMaskChain();
      const obj = ethereum.on('chainChanged', chainId => {
        console.log(chainId);
        window.location.reload();
      });
    }else if(window.BinanceChain && window.BinanceChain.isConnected()){
      checkBinanceChain()
    }
  }, []);

  useEffect(() => {
    getRGPprice();
  }, [wallet]);

  const getRGPprice = async () => {
    try {
      const RGPBUSDToken = await smartSwapLPTokenPoolOne();
      const reserves = await RGPBUSDToken.getReserves();
      const RGPprice = ethers.utils.formatUnits(
        reserves[0].mul(10000).div(reserves[1]),
        4,
      );
      props.updateRGPprice(RGPprice);
    } catch (error) {}
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.isConnected()) {
      getMetaMaskChain();
    }else if (window.BinanceChain && window.BinanceChain.isConnected()) {
      getBinanceChain();
    }
  }, [wallet]);
const getMetaMaskChain = async () => {
   let chain= await window.ethereum.request({
      method: 'eth_chainId',
    });
    checkchain(chain)
}
const getBinanceChain = async () => {
   let chain= await window.BinanceChain.request({
      method: 'eth_chainId',
    });
    checkchain(chain)
}
  const checkchain = async (chainID) => {
    props.updateChainId(chainID);
    if (isSupportedNetwork(chainID)) {
      listener(wallet, props);
      reConnector(props);
    } else {
      switchToBSC();
    }
    await props.getTokenList();
  };
  const checkBinanceChain = async () => {
    const chainID = await window.BinanceChain.request({
      method: 'eth_chainId',
    });
    // props.updateChainId(chainID);
    // if (isSupportedNetwork(chainID)) {
    //   listener(wallet, props);
    //   reConnector(props);
    // } else {
    //   switchToBSC();
    // }
    await props.getTokenList();
  };

  return (
    <ToastProvider placement="bottom-right">
      <ThemeProvider theme={newTheme}>
        <TrustWallet />
        <Toast {...props} />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/farming" component={FarmingPage} />
          <Route exact path="/liquidity" component={LiquidityPage} />
          <Route exact path="/liquidity/:pair" component={LiquidityPage} />
          <Route exact path="/swap/" component={HomePage} />
          <Route exact path="/swap/:pair" component={HomePage} />
          <Route exact path="/margin-trading" component={MarginTradingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
    </ToastProvider>
  );
};
const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  {
    reConnect,
    disconnectWallet,
    notify,
    updateChainId,
    getTokenList,
    updateRGPprice,
  },
)(App);

async function reConnector(props)  {
  if (
    window.ethereum &&
    window.ethereum.isConnected() &&
    window.ethereum.selectedAddress &&
    window.ethereum.isMetaMask &&
    !props.state.wallet.connected
  ) {
    props.reConnect(window.ethereum,"ethereum");

  }else if(window.BinanceChain &&
    window.BinanceChain.isConnected() &&
    !props.state.wallet.connected){
      let accounts = await BinanceChain.request({ method: 'eth_accounts' })
      console.log(accounts[0])
      props.reConnect({...window.BinanceChain,selectedAddress:accounts[0]},"BinanceChain");
      // Note that this event is emitted on page load.
      // If the array of accounts is non-empty, you're already
      // connected.
      // BinanceChain.on('accountsChanged', handleAccountsChanged);
      
    }
}

function listener(wallet, props) {
  if (
    window.ethereum &&
    window.ethereum.isConnected() &&
    window.ethereum.selectedAddress &&
    window.ethereum.isMetaMask &&
    props.state.wallet.connected
  ) {
    window.ethereum.on('accountsChanged', async accounts => {
      if (accounts.length === 0) {
        props.disconnectWallet();
      } else if (accounts[0] !== wallet.address) {
        return props.reConnect(window.ethereum);
      }
    });
    window.ethereum.on('disconnect', error => {
      if (error) window.location.reload();
      props.disconnectWallet();
    });
  }else if (
    window.BinanceChain &&
    window.BinanceChain.isConnected() &&
    props.state.wallet.connected
  ) {
    window.BinanceChain.on('accountsChanged', async accounts => {
      if (accounts.length === 0) {
        props.disconnectWallet();
      } else if (accounts[0] !== wallet.address) {
        return props.reConnect({selectedAddress:accounts[0],...window.BinanceChain},"BinanceChain");
      }
    });
    window.BinanceChain.on('disconnect', error => {
      if (error) window.location.reload();
      props.disconnectWallet();
    });
  }
}
