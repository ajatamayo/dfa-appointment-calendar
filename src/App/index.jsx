import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import {
  AppAlert,
  SiteSelector,
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
    <SiteSelector />
    <Switch>
      <Route exact path="/" render={ownProps => <Sites {...ownProps} />} />
      <Route exact path="/:siteId" render={ownProps => <Dates {...ownProps} />} />
      <Route exact path="/:siteId/:month" render={ownProps => <Dates {...ownProps} />} />
    </Switch>
  </div>
);

export default withRouter(App);
