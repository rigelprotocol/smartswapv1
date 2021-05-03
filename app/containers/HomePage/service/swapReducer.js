/* eslint-disable consistent-return */
/*
 *
 * SwapReducer
 *
 */
import produce from 'immer';
import { SENDING_TRANSACTION, CONFIRM_TRANSACTION } from '../constants';

export const initialState = {
  transactionHash: '',
  sendingTransaction: false,
};

/* eslint-disable default-case, no-param-reassign */
const swapReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SENDING_TRANSACTION:
        draft.sendingTransaction = true;
        draft.transactionHash = action.payload.hash;
        break;
      case CONFIRM_TRANSACTION:
        draft.sendingTransaction = false;
        break;
      default:
        return state;
    }
  });

export default swapReducer;
