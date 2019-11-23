import {
  GET_DATES_REQUEST,
  GET_DATES_SUCCESS,
  GET_DATES_FAILURE,
  SET_DATE,
  SET_MONTH,
} from './actionTypes';

export function getDatesRequest(siteId, fromDate, toDate, siteSlug) {
  return {
    type: GET_DATES_REQUEST, siteId, fromDate, toDate, siteSlug,
  };
}

export function getDatesSuccess(dates) {
  return { type: GET_DATES_SUCCESS, dates };
}

export function getDatesFailure() {
  return { type: GET_DATES_FAILURE };
}

export function setDate(date) {
  return { type: SET_DATE, date };
}

export function setMonth(date, siteId) {
  return { type: SET_MONTH, date, siteId };
}
