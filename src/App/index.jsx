import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppAlert,
  SiteSelector,
} from '../components';
import {
  Dates,
  Sites,
} from '../screens';
import './App.css';

const App = props => (
  <div className="app">
    <AppAlert />
    <div className="pointer large">
      <h1 className="site-title">
        <a href="/">
          Pasaporte.
          <span>ph</span>
        </a>
      </h1>
    </div>
    <p className="slogan">See all available appointment timeslots for the whole month!</p>
    <SiteSelector />
    {props.sites.length ? (
      <Switch>
        <Route exact path="/" render={ownProps => <Sites {...ownProps} />} />
        <Route exact path="/:siteId" render={ownProps => <Dates {...ownProps} />} />
        <Route exact path="/:siteId/:month" render={ownProps => <Dates {...ownProps} />} />
      </Switch>
    ) : null}
  </div>
);

App.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  const { sites: { sites } } = state;
  return {
    sites,
  };
};

export default withRouter(connect(mapStateToProps)(App));
