import moment from 'moment';
import {
  all, call, put, select, takeLatest,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { GET_DATES_REQUEST, SET_MONTH } from '../actions/actionTypes';
import { getDatesSuccess } from '../actions/dateActions';
import { appAlertError } from '../actions/appActions';
import { getDatesService } from '../services/dates';
import { getTimeslotsService } from '../services/timeslots';
import { getTimeslotsSuccess } from '../actions/timeslotActions';
import { getSitesFlow } from './sitesSagas';

export const getSites = state => state.sites.sites;

export function* getDatesFlow({ siteId, fromDate, toDate }) {
  try {
    const sites = yield select(getSites);
    if (!sites.length) {
      yield call(getSitesFlow);
    }
    const response = yield call(getDatesService, siteId, fromDate, toDate);
    const dates = response.data;
    const availableDates = dates.filter(i => i.IsAvailable).map(i => moment(i.AppointmentDate).format('YYYY-MM-DD'));
    const responses = yield all(availableDates.map(preferredDate => (
      call(getTimeslotsService, siteId, preferredDate)
    )));
    for (let i = 0; i < availableDates.length; i += 1) {
      yield put(getTimeslotsSuccess(responses[i].data, moment(availableDates[i]).format('YYYY-MM-DD')));
    }
    yield put(getDatesSuccess(dates));
  } catch (error) {
    const { message } = error.response.data;
    yield put(appAlertError(message, error));
  }
}

export function* setMonthFlow({ date, siteId }) {
  yield put(push(`/${siteId}/${moment(date).format('MM-YYYY')}`));
}

export function* watchDatesFlow() {
  yield all([
    takeLatest(GET_DATES_REQUEST, getDatesFlow),
    takeLatest(SET_MONTH, setMonthFlow),
  ]);
}

const dateSagas = [watchDatesFlow()];

export default dateSagas;
