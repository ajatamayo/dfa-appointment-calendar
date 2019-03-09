import {
  GET_SITES_REQUEST,
  GET_SITES_SUCCESS,
  GET_SITES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  sites: [],
  isFetching: false,
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
        sites,
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

    default:
      return state;
  }
}

export default siteReducer;
