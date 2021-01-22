
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../reducers/search';
import { fetchSearchResult } from '../../service/api';

function* fetchSearchSaga(params) {
  yield put({ type: actionTypes.setLoadingStatus, payload: true });

  try {
    const { searchTerm, company, position } = params.payload;
    const result = yield call(fetchSearchResult, { searchTerm, company, position });
    yield put({
      type: actionTypes.loadSearchSucceed,
      result: result.data
    });
  } catch(error) {
    yield put({ type: actionTypes.loadSearchFail, error });
  }

  yield put({ type: actionTypes.setLoadingStatus, payload: false });
}

export function* watchSearch() {
  yield takeLatest(actionTypes.loadSearchRequest, fetchSearchSaga);
}
