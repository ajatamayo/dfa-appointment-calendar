import moment from 'moment';
import {
  all, call, put, select, takeLatest,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { GET_SITES_REQUEST, SET_SITE } from '../actions/actionTypes';
import { getSitesSuccess } from '../actions/siteActions';
import { appAlertError } from '../actions/appActions';
import { getSitesService } from '../services/sites';
import { getDatesFlow } from './datesSagas';

export const getSites = state => state.sites.sites;
export const getActiveDate = state => state.dates.activeDate;
export const getActiveMonth = state => state.dates.activeMonth;

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

export function* setSiteFlow({ siteId }) {
  if (siteId) {
    const activeMonth = yield select(getActiveMonth);
    const monthToShow = activeMonth ? moment(activeMonth) : yield select(getActiveDate);
    yield put(push(activeMonth ? `/${siteId}/${moment(activeMonth).format('MM-YYYY')}` : `/${siteId}`));
    const fromDate = monthToShow.startOf('month').format('YYYY-MM-DD');
    const toDate = monthToShow.endOf('month').format('YYYY-MM-DD');
    yield call(getDatesFlow, { siteId, fromDate, toDate });
  } else {
    yield put(push('/'));
  }
}

export function* watchSitesFlow() {
  yield all([
    takeLatest(GET_SITES_REQUEST, getSitesFlow),
    takeLatest(SET_SITE, setSiteFlow),
  ]);
}

const siteSagas = [watchSitesFlow()];

export default siteSagas;
