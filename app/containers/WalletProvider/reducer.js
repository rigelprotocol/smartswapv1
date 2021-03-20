/*
 *
 * WalletProvider reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  WALLET_CONNECTED,
  WALLET_PROPS,
  LOADING_WALLET,
  CLOSE_LOADING_WALLET,
} from './constants';

export const initialState = {
  wallet: {
    balance: 0,
    address: '0x',
    provider: 'provider',
    signer: 'signer',
    chainId: 'chainId',
  },
  wallet_props: [],
  connected: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const walletProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOADING_WALLET:
        draft.loading = action.payload;
        break;
      case CLOSE_LOADING_WALLET:
        draft.loading = action.payload;
        break;
      case WALLET_CONNECTED:
        draft.wallet = action.wallet;
        draft.connected = true;
        break;
      case WALLET_PROPS:
        draft.wallet_props.push(action.payload);
        break;
      default:
        return state;
    }
  });

export default walletProviderReducer;
