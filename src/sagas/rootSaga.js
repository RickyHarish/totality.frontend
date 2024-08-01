import { all, fork } from 'redux-saga/effects';
import { watchCartActions } from './cartSaga';
import { watchOrderActions } from './orderSaga';
import { watchProductActions } from './productSaga';
import { watchUserActions } from './userSaga';

export default function* rootSaga() {
  yield all([
    fork(watchCartActions),
    fork(watchOrderActions),
    fork(watchProductActions),
    fork(watchUserActions)
  ]);
}
