/*
 *
 * WalletProvider actions
 *
 */

import { DEFAULT_ACTION, WALLET_CONNECTED, WALLET_PROPS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function connectWallet() {
  return {
    type: WALLET_CONNECTED,
  };
}

export const connectedWallet = wallet => ({
  type: WALLET_CONNECTED,
  wallet,
});

export const setWalletProps = wallet => ({
  type: WALLET_PROPS,
  payload: wallet,
});
