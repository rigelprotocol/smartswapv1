import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the farmingPage state domain
 */

const selectFarmingPageDomain = state => state.farmingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FarmingPage
 */

const makeSelectFarmingPage = () =>
  createSelector(
    selectFarmingPageDomain,
    substate => substate,
  );

export default makeSelectFarmingPage;
export { selectFarmingPageDomain };
