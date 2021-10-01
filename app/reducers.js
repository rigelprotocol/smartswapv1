/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import NoticeProviderReducer from 'containers/NoticeProvider/reducer';
import WalletProviderReducer from 'containers/WalletProvider/reducer';
import TokenListReducer from 'containers/WalletProvider/extendedTokenListReducer';
import FarmingProviderReducer from 'containers/FarmingPage/reducer';
import FarmingV2ProviderReducer from 'containers/V2FarmingPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    notice: NoticeProviderReducer,
    wallet: WalletProviderReducer,
    ExtendedTokenList: TokenListReducer,
    farming: FarmingProviderReducer,
    farmingv2: FarmingV2ProviderReducer,
    router: connectRouter(history),
  });

  return rootReducer;
}
