import { SENDING_TRANSACTION, CONFIRM_TRANSACTION } from '../constants';

export const sendTransaction = hash => dispatch => {
  dispatch({ type: SENDING_TRANSACTION, payload: { hash } });
};

export const confirmationTransaction = hash => dispatch => {
  dispatch({ type: CONFIRM_TRANSACTION, payload: { hash } });
};
