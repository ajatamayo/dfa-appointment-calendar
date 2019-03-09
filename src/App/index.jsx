import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
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
    <Switch>
      <Route exact path="/" render={ownProps => <Sites {...ownProps} />} />
      <Route exact path="/:siteId" render={ownProps => <Dates {...ownProps} />} />
    </Switch>
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
