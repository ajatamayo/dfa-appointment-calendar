import {
  GET_SITES_REQUEST,
  GET_SITES_SUCCESS,
  GET_SITES_FAILURE,
} from './actionTypes';

export function getSitesRequest() {
  return { type: GET_SITES_REQUEST };
}

export function getSitesSuccess(sites) {
  return { type: GET_SITES_SUCCESS, sites };
}

export function getSitesFailure() {
  return { type: GET_SITES_FAILURE };
}
