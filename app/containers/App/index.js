/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, theme } from '@chakra-ui/react';
import { ToastProvider } from 'react-toast-notifications';
import { connect } from 'react-redux';
import Web3Provider, { Connectors } from 'web3-react';
import WebFont from 'webfontloader';

import HomePage from 'containers/HomePage/Loadable';
import FarmingPage from 'containers/FarmingPage/Loadable';
import MarginTradingPage from 'containers/MarginTradingPage/Loadable';
import SmartSwappingPage from 'containers/SmartSwappingPage/Loadable';
import LiquidityPage from 'containers/LiquidityPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import '../../styles/globals.css';
import { WalletContext } from '../../context';
import Toast from '../../components/Toast';

const { InjectedConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });
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
function App(props) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <ToastProvider>
      <ThemeProvider theme={newTheme}>
        <Toast {...props} />
        <Web3Provider connectors={{ MetaMask }} libraryName="ethers.js">
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
          </WalletContext.Provider>
        </Web3Provider>
      </ThemeProvider>
    </ToastProvider>
  );
}
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {},
)(App);
