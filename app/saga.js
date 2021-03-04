import { all } from 'redux-saga/effects';
import walletProviderSaga from './containers/WalletProvider/saga';
export default function* rootSaga(getState) {
  yield all([walletProviderSaga()]);
}
