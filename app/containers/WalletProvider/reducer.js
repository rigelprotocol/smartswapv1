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
  CLEAR_WALLET,
  CLOSE_LOADING_WALLET,
  CHANGE_DEADLINE,
} from './constants';

export const initialState = {
  wallet: {
    balance: 0,
    address: '0x',
    provider: 'provider',
    signer: 'signer',
    chainId: 'chainId',
  },
  wallet_props: '0.0000',
  connected: false,
  loading: false,
  transactionDeadLine: '1378747',
  slippageValue: '383993939993',
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
        draft.wallet_props = action.payload.rgpBalance;
        break;
      case CLEAR_WALLET:
        draft.wallet = {
          balance: 0,
          address: '0x',
          provider: 'provider',
          signer: 'signer',
          chainId: 'chainId',
        };
      case CHANGE_DEADLINE:
        console.log(action.payload);
        draft.transactionDeadLine = action.payload.actualTransactionDeadline;
        draft.slippageValue = action.payload.slippageValue;
        break;
      default:
        return state;
    }
  });

export default walletProviderReducer;
