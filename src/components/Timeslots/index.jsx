import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './timeslots.css';

const Timeslots = (props) => {
  const { timeslots } = props;
  const { preferredDate } = props;
  return (
    // eslint-disable-next-line react/no-danger
    <div className="timeslots" dangerouslySetInnerHTML={{ __html: timeslots[preferredDate] }} />
  );
};

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
