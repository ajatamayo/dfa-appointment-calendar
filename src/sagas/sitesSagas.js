import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

import { GET_SITES_REQUEST } from '../actions/actionTypes';
import { getSitesSuccess } from '../actions/siteActions';
import { appAlertError } from '../actions/appActions';
import { getSitesService } from '../services/sites';

export function* getSitesFlow() {
  try {
    const response = yield call(getSitesService);
    const { Sites } = response.data;
    yield put(getSitesSuccess(Sites));
  } catch (error) {
    const { message } = error.response.data;
    yield put(appAlertError(message, error));
  }
}

export function* watchSitesFlow() {
  yield all([
    takeLatest(GET_SITES_REQUEST, getSitesFlow),
  ]);
}

const siteSagas = [watchSitesFlow()];

export default siteSagas;
