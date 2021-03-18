/*
 *
 * WalletProvider actions
 *
 */

import {
  DEFAULT_ACTION,
  WALLET_CONNECTED,
  WALLET_PROPS,
  LOADING_WALLET,
  CLOSE_LOADING_WALLET,
} from './constants';

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

export function connectingWallet(option) {
  console.log(option);
  return dispatch => {
    dispatch({
      type: option ? LOADING_WALLET : CLOSE_LOADING_WALLET,
      payload: !!option,
    });
  };
}
