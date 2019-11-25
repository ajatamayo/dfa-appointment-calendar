import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { notification } from 'antd';
import {
  AppAlert,
  SiteSelector,
} from '../components';
import {
  Dates,
  Sites,
} from '../screens';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifOpen: false,
    };

    this.showWhatsThis = this.showWhatsThis.bind(this);
    this.onNotifClose = this.onNotifClose.bind(this);
  }

  onNotifClose() {
    this.setState({ notifOpen: false });
  }

  showWhatsThis() {
    if (this.state.notifOpen) return;
    const args = {
      message: 'Hey there!',
      description: (
        <Fragment>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line,max-len */}
          Instead of searching for an available passport appointment slot over at <strong>passport.gov.ph</strong> one day at a time, <strong>pasaporte.ph</strong> shows you all available appointment timeslots for the whole month!
        </Fragment>
      ),
      duration: 0,
      onClose: this.onNotifClose,
    };
    notification.open(args);
    this.setState({ notifOpen: true });
  }

  render() {
    return (
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
        <p className="slogan">
          See all available appointment timeslots for the whole month!
          <button type="button" className="whats-this" tabIndex="0" onClick={this.showWhatsThis}>
            <span>What now?</span>
          </button>
        </p>
        <SiteSelector />
        {this.props.sites.length ? (
          <Switch>
            <Route exact path="/" render={ownProps => <Sites {...ownProps} />} />
            <Route exact path="/:siteId" render={ownProps => <Dates {...ownProps} />} />
            <Route exact path="/:siteId/:month" render={ownProps => <Dates {...ownProps} />} />
          </Switch>
        ) : null}
      </div>
    );
  }
}


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
