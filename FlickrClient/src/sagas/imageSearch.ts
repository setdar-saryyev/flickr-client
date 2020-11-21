import {call, put} from 'redux-saga/effects';
import {searchCompleted} from '../actions/searchActions';

import {fetchImages, ImageItem} from '../api/requests';

export function* fetchImagesSaga(action) {
  const query = action.payload;
  const response: Array<ImageItem> = yield call(fetchImages, query);
  yield put(searchCompleted(response));
}
