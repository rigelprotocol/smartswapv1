/*
 *
 * NoticeProvider actions
 *
 */

import { DEFAULT_ACTION, NOTICE, OFF_NOTICE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const notify = message => dispatch =>
  dispatch({
    type: NOTICE,
    message,
  });

export const offNotice = () => dispatch => dispatch({ type: OFF_NOTICE });
