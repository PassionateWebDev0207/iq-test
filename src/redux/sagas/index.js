import { all } from 'redux-saga/effects';
import { watchSearch } from './search';

export default function* rootSaga() {
  yield all([watchSearch()]);
}
