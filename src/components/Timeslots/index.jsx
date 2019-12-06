import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification } from 'antd';
import moment from 'moment';
import './timeslots.css';

class Timeslots extends Component {
  constructor(props) {
    super(props);

    this.showNextAction = this.showNextAction.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.showNextAction(e);
    }
  }

  showNextAction(e) {
    e.preventDefault();
    notification.close('next-action');
    const { preferredDate } = this.props;
    const dateDisplay = moment(preferredDate, 'YYYY-MM-DD').format('LL');
    const args = {
      message: "What's next?!",
      description: (
        <Fragment>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line,max-len */}
          Seems like you want to book an appointment for <strong>{dateDisplay}</strong>. You can&apos;t do that from here though! Go on now to <a href="//passport.gov.ph">passport.gov.ph</a> and book your appointment from there. Thank you!
        </Fragment>
      ),
      key: 'next-action',
      duration: 0,
      onClose: this.onNotifClose,
    };
    notification.open(args);
  }

  render() {
    const { timeslots, preferredDate } = this.props;
    const html = timeslots[preferredDate].replace(/onclick="RemoveDisabledButton\(\)"/g, '');
    return (
      // eslint-disable-next-line react/no-danger
      <div className="timeslots" dangerouslySetInnerHTML={{ __html: html }} onClick={this.showNextAction} onKeyUp={this.handleKeyUp} role="button" tabIndex="0" />
    );
  }
}

Timeslots.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  timeslots: PropTypes.object.isRequired,
  preferredDate: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { timeslots: { timeslots } } = state;

  return {
    timeslots,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Timeslots);
