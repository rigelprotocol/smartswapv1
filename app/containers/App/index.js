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

import HomePage from 'containers/HomePage/Loadable';
import FarmingPage from 'containers/FarmingPage/Loadable';
import MarginTradingPage from 'containers/MarginTradingPage/Loadable';
import SmartSwappingPage from 'containers/SmartSwappingPage/Loadable';
import LiquidityPage from 'containers/LiquidityPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import '../../styles/globals.css';
import { WalletContext } from '../../context';

const breakpoints = ['360px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};
export default function App() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <ThemeProvider theme={newTheme}>
      <WalletContext.Provider
        value={{ connected, loading, show, setConnected, setLoading, setShow }}
      >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/farming" component={FarmingPage} />
          <Route exact path="/liquidity" component={LiquidityPage} />
          <Route exact path="/smart-swapping" component={SmartSwappingPage} />
          <Route exact path="/margin-trading" component={MarginTradingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </WalletContext.Provider>
    </ThemeProvider>
  );
}
