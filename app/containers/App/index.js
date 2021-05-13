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

import HomePage from 'containers/HomePage/index';
import FarmingPage from 'containers/FarmingPage/index';
import MarginTradingPage from 'containers/MarginTradingPage/index';
import LiquidityPage from 'containers/LiquidityPage/index';
import NotFoundPage from 'containers/NotFoundPage/index';
import Splash from 'components/splash/index';
import '../../styles/globals.css';
import Toast from '../../components/Toast';
import { reConnect } from '../WalletProvider/actions';


const breakpoints = ['360px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
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


  if (window.ethereum) {
    ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    });
  }

  useEffect(() => {
    listener(wallet, props);
    reConnector(props);
  }, [wallet]);
  return (
    <ToastProvider placement="bottom-right">
      <ThemeProvider theme={newTheme}>
        <Toast {...props} />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/farming" component={FarmingPage} />
          <Route exact path="/liquidity" component={LiquidityPage} />
          <Route exact path="/smart-swapping" component={HomePage} />
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
  { reConnect },
)(App);

function reConnector(props) {
  if (
    window.ethereum &&
    window.ethereum.isConnected() &&
    window.ethereum.selectedAddress &&
    window.ethereum.isMetaMask &&
    !props.state.wallet.connected
  ) {
    props.reConnect(window.ethereum);
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
  }
}
