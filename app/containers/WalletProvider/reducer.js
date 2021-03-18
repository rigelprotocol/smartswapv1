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
  wallet: {},
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
        console.log('go hello');
        draft.loading = action.payload;
        break;
      case CLOSE_LOADING_WALLET:
        console.log('Dagogo Show');
        draft.loading = action.payload;
        break;
      case WALLET_CONNECTED:
        draft.wallet = action.wallet;
        draft.connected = true;
        break;
      case WALLET_PROPS:
        return draft.wallet_props.push(action.payload);
      default:
        return state;
    }
  });

export default walletProviderReducer;
