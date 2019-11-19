import {
  GET_DATES_REQUEST,
  GET_DATES_SUCCESS,
  GET_DATES_FAILURE,
  SET_DATE,
} from './actionTypes';

export function getDatesRequest(siteId, fromDate, toDate) {
  return {
    type: GET_DATES_REQUEST, siteId, fromDate, toDate,
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
