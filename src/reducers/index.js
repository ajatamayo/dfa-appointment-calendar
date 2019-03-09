import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './appReducer';
import dates from './datesReducer';
import sites from './sitesReducer';
import timeslots from './timeslotsReducer';

export default combineReducers({
  router: routerReducer,
  app,
  dates,
  sites,
  timeslots,
});
