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
  console.log('Sooner')
  return {
    type: NOTICE,
    message,
  };
}
