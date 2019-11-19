import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import {
  AppAlert,
} from '../components';
import {
  Dates,
  Sites,
} from '../screens';
import './App.css';

const App = () => (
  <div className="app">
    <AppAlert />
    <p>pasaporte.ph</p>
    <p>See all available appointment timeslots for the whole month!</p>
    <Switch>
      <Route exact path="/" render={ownProps => <Sites {...ownProps} />} />
      <Route exact path="/:siteId" render={ownProps => <Dates {...ownProps} />} />
    </Switch>
  </div>
);

export default withRouter(App);
