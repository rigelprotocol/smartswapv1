import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the liquidityPage state domain
 */

const selectLiquidityPageDomain = state => state.liquidityPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LiquidityPage
 */

const makeSelectLiquidityPage = () =>
  createSelector(
    selectLiquidityPageDomain,
    substate => substate,
  );

export default makeSelectLiquidityPage;
export { selectLiquidityPageDomain };
