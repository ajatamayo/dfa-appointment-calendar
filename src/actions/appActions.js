import {
  APP_ALERT,
  APP_ALERT_CLEAR,
} from './actionTypes';

export function appAlertSuccess(message) {
  return { type: APP_ALERT, message, alertType: 'success' };
}

export function appAlertError(message, error) {
  return { type: APP_ALERT, message, alertType: 'error', error };
}

export function appAlertClear() {
  return { type: APP_ALERT_CLEAR };
}
