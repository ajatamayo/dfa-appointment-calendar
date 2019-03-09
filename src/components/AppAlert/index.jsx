import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import { appAlertClear } from '../../actions/appActions';
import './appalert.css';

class AppAlert extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.appAlertClear();
  }

  render() {
    if (!this.props.message) return false;

    return (
      <div className="alert-wrapper">
        <Alert
          message={this.props.message}
          type={this.props.alertType}
          showIcon
          banner
          closable
          afterClose={this.handleClose}
        />
      </div>
    );
  }
}

AppAlert.propTypes = {
  appAlertClear: PropTypes.func.isRequired,
  message: PropTypes.string,
  alertType: PropTypes.string,
};

AppAlert.defaultProps = {
  message: null,
  alertType: null,
};

const mapStateToProps = (state) => {
  const { app: { message, alertType, error } } = state;
  return {
    message,
    alertType,
    error,
  };
};

const mapDispatchToProps = {
  appAlertClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAlert);
