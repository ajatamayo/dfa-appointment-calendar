import {
  GET_SITES_REQUEST,
  GET_SITES_SUCCESS,
  GET_SITES_FAILURE,
  SET_SITE,
} from '../actions/actionTypes';

const initialState = {
  sites: [],
  isFetching: false,
  activeSite: null,
};

function siteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SITES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_SITES_SUCCESS: {
      const { sites } = action;
      return {
        ...state,
        sites: sites.map(site => ({
          ...site,
          slug: site.Name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z ]/g, ' ')
            .split(' ')
            .filter(Boolean)
            .join('-')
            .toLowerCase(),
        })),
        isFetching: false,
      };
    }

    case GET_SITES_FAILURE: {
      return {
        ...state,
        sites: [],
        isFetching: false,
      };
    }

    case SET_SITE:
      return {
        ...state,
        activeSite: action.siteId,
      };

    default:
      return state;
  }
}

export default siteReducer;
