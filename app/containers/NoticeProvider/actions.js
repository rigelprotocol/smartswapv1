/*
 *
 * NoticeProvider actions
 *
 */

import { DEFAULT_ACTION, NOTICE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const notify = message => dispatch => {
  return dispatch({
    type: NOTICE,
    message,
  });
}
