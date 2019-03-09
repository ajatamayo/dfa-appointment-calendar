import {
  GET_TIMESLOTS_REQUEST,
  GET_TIMESLOTS_SUCCESS,
  GET_TIMESLOTS_FAILURE,
} from './actionTypes';

export function getTimeslotsRequest(siteId, preferredDate) {
  return {
    type: GET_TIMESLOTS_REQUEST, siteId, preferredDate,
  };
}

export function getTimeslotsSuccess(html, preferredDate) {
  return { type: GET_TIMESLOTS_SUCCESS, html, preferredDate };
}

export function getTimeslotsFailure() {
  return { type: GET_TIMESLOTS_FAILURE };
}
