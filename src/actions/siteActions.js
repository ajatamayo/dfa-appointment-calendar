import {
  GET_SITES_REQUEST,
  GET_SITES_SUCCESS,
  GET_SITES_FAILURE,
  SET_SITE,
} from './actionTypes';

export function getSitesRequest(siteSlug) {
  return { type: GET_SITES_REQUEST, siteSlug };
}

export function getSitesSuccess(sites) {
  return { type: GET_SITES_SUCCESS, sites };
}

export function getSitesFailure() {
  return { type: GET_SITES_FAILURE };
}

export function setSite(siteId) {
  return { type: SET_SITE, siteId };
}
