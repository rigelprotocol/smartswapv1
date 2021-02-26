/*
 *
 * WalletProvider reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, WALLET_CONNECTED } from './constants';

export const initialState = {
  wallet: {},
  connected: false,
};

/* eslint-disable default-case, no-param-reassign */
const walletProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case WALLET_CONNECTED:
        console.log('Got to reducer');
        draft.wallet = action.wallet;
        draft.connected = true;
        break;
    }
  });

export default walletProviderReducer;
