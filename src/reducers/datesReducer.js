import moment from 'moment';
import { mapValues, keyBy } from 'lodash';
import {
  GET_DATES_REQUEST,
  GET_DATES_SUCCESS,
  GET_DATES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  dates: {},
  isFetching: false,
};

function datesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_DATES_SUCCESS: {
      const dates = action.dates.map(i => ({
        AppointmentDate: moment(i.AppointmentDate).format('YYYYMMDD'),
        IsAvailable: i.IsAvailable,
      }));
      return {
        ...state,
        dates: mapValues(keyBy(dates, 'AppointmentDate'), 'IsAvailable'),
        isFetching: false,
      };
    }

    case GET_DATES_FAILURE: {
      return {
        ...state,
        dates: {},
        isFetching: false,
      };
    }

    default:
      return state;
  }
}

export default datesReducer;
