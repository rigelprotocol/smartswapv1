import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the smartSwappingPage state domain
 */

const selectSmartSwappingPageDomain = state =>
  state.smartSwappingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SmartSwappingPage
 */

const makeSelectSmartSwappingPage = () =>
  createSelector(
    selectSmartSwappingPageDomain,
    substate => substate,
  );

export default makeSelectSmartSwappingPage;
export { selectSmartSwappingPageDomain };
