import {all, takeLatest} from 'redux-saga/effects';

import {fetchImagesSaga} from './imageSearch';
import {SEARCH_STARTED} from '../actions/searchActions';

export default function* rootSaga() {
  yield all([takeLatest(SEARCH_STARTED, fetchImagesSaga)]);
}
