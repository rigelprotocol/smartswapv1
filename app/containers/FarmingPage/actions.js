/*
 *
 * FarmingPage actions
 *
 */

import { DEFAULT_ACTION, CHANGE_FARMING_CONTENT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const changeFarmingContent = value => dispatch => {
  console.log(value)
  dispatch({ type: CHANGE_FARMING_CONTENT, payload: value })
}

