import moment from 'moment';
import { mapValues, keyBy } from 'lodash';
import {
  GET_DATES_REQUEST,
  GET_DATES_SUCCESS,
  GET_DATES_FAILURE,
  SET_DATE,
  SET_MONTH,
  SET_SITE,
} from '../actions/actionTypes';

const initialState = {
  dates: {},
  isFetching: false,
  activeDate: moment(),
  activeMonth: null,
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

    case SET_DATE: {
      return {
        ...state,
        activeDate: action.date,
      };
    }

    case SET_MONTH: {
      return {
        ...state,
        activeMonth: action.date,
      };
    }

    case SET_SITE: {
      if (action.siteId) {
        return {
          ...state,
          isFetching: true,
        };
      }
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

export default datesReducer;
