import {
  GET_TIMESLOTS_REQUEST,
  GET_TIMESLOTS_SUCCESS,
  GET_TIMESLOTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  timeslots: {},
  isFetching: false,
};

function timeslotsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TIMESLOTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_TIMESLOTS_SUCCESS: {
      const { preferredDate, html } = action;
      const timeslots = Object.assign(state.timeslots, { [preferredDate]: html });
      return {
        ...state,
        timeslots,
        isFetching: false,
      };
    }

    case GET_TIMESLOTS_FAILURE: {
      return {
        ...state,
        timeslots: {},
        isFetching: false,
      };
    }

    default:
      return state;
  }
}

export default timeslotsReducer;
