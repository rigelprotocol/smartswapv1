import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the marginTradingPage state domain
 */

const selectMarginTradingPageDomain = state =>
  state.marginTradingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MarginTradingPage
 */

const makeSelectMarginTradingPage = () =>
  createSelector(
    selectMarginTradingPageDomain,
    substate => substate,
  );

export default makeSelectMarginTradingPage;
export { selectMarginTradingPageDomain };
