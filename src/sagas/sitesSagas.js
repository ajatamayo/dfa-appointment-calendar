import {
  all, call, put, select, takeLatest,
} from 'redux-saga/effects';

import { GET_SITES_REQUEST } from '../actions/actionTypes';
import { getSitesSuccess } from '../actions/siteActions';
import { appAlertError } from '../actions/appActions';
import { getSitesService } from '../services/sites';

export const getSites = state => state.sites.sites;

export function* getSitesFlow() {
  try {
    const sites = yield select(getSites);
    if (sites.length) {
      yield put(getSitesSuccess(sites));
    } else {
      const response = yield call(getSitesService);
      const { Sites } = response.data;
      yield put(getSitesSuccess(Sites));
    }
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
