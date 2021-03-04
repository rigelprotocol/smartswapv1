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

export function notify(message) {
  return {
    type: NOTICE,
    message,
  };
}
