// @ts-nocheck
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, theme } from '@chakra-ui/react';
import { ToastProvider } from 'react-toast-notifications';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';

import HomePage from 'containers/HomePage/Loadable';
import FarmingPage from 'containers/FarmingPage/Loadable';
import MarginTradingPage from 'containers/MarginTradingPage/Loadable';
import SmartSwappingPage from 'containers/SmartSwappingPage/Loadable';
import LiquidityPage from 'containers/LiquidityPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Splash from 'components/splash/index';

import '../../styles/globals.css';
import { WalletContext } from '../../context';
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
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [splashView, setSplashView] = useState(true);
  const { wallet } = props.state;
  useEffect(() => {
    // listener(wallet);
    reConnector(props);
    return showSplashScreen(setSplashView);
  }, [props]);
  return (
    <ToastProvider placement="bottom-right" autoDismiss autoDismissTimeout={5}>
      <ThemeProvider theme={newTheme}>
        <Toast style={{ zIndex: '99999' }} {...props} />
        <WalletContext.Provider
          value={{
            connected,
            loading,
            show,
            setConnected,
            setLoading,
            setShow,
          }}
        >
          {splashView ? (
            <Splash />
          ) : (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/farming" component={FarmingPage} />
              <Route exact path="/liquidity" component={LiquidityPage} />
              <Route
                exact
                path="/smart-swapping"
                component={SmartSwappingPage}
              />
              <Route
                exact
                path="/margin-trading"
                component={MarginTradingPage}
              />
              <Route component={NotFoundPage} />
            </Switch>
          )}
        </WalletContext.Provider>
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
    window.ethereum.isConnected() &&
    window.ethereum.selectedAddress &&
    window.ethereum.isMetaMask
  ) {
    props.reConnect(window.ethereum);
  }
}

function listener(wallet) {
  window.ethereum.on('accountsChanged', async accounts => {
    if (accounts.length === 0) {
      // disconnectUser();
      console.log('>>> are you leaving');
    } else if (accounts[0] !== wallet.address) {
      const address = accounts[0];
      return console.log(address);
    }
  });
}

function showSplashScreen(setSplashView) {
  const timer = setTimeout(() => {
    setSplashView(false);
  }, 3000);
  return () => clearTimeout(timer);
}
