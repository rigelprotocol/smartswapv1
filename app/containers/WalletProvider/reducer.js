/*
 *
 * WalletProvider reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, WALLET_CONNECTED, WALLET_PROPS } from './constants';

export const initialState = {
  wallet: {},
  wallet_props: [],
  connected: false,
};

/* eslint-disable default-case, no-param-reassign */
const walletProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case WALLET_CONNECTED:
        draft.wallet = action.wallet;
        draft.connected = true;
        break;
      case WALLET_PROPS:
        console.log(`Action: ${action}`)
        return draft.wallet_props.push(action.payload);
      default:
        return state;
    }
  });

export default walletProviderReducer;
