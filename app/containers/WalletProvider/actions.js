/*
 *
 * WalletProvider actions
 *
 */

import { DEFAULT_ACTION, WALLET_CONNECTED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// export function connectWallet() {
//   console.log('Event Fired');
//   return {
//     type: WALLET_CONNECTED,
//   };
// };

export const connectWallet = payload => dispatch =>
  dispatch({
    type: WALLET_CONNECTED,
    payload,
  });

export const connectedWallet = wallet => ({
  type: WALLET_CONNECTED,
  wallet,
});
