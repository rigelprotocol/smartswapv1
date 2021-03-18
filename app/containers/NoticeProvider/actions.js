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

export const notify = message => dispatch =>
  dispatch({
    type: NOTICE,
    message,
  });
