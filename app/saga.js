import { all, fork } from 'redux-saga/effects';
import WalletSagas from './app/containers/WalletProvider/saga';
export default function* rootSaga() {
  yield all([fork(WalletSagas)]);
}
