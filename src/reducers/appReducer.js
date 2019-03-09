import {
  APP_ALERT,
  APP_ALERT_CLEAR,
} from '../actions/actionTypes';

const initialState = {
  message: null,
  alertType: null,
  error: null,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_ALERT:
      return {
        ...state,
        message: action.message,
        alertType: action.alertType,
        error: action.error,
      };
    case APP_ALERT_CLEAR:
      return {
        ...state,
        message: null,
        alertType: null,
        error: null,
      };

    default:
      return state;
  }
}

export default appReducer;
