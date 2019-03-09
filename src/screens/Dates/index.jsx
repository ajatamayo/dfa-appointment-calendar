import moment from 'moment';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Calendar } from 'antd';
import { getDatesRequest } from '../../actions/dateActions';
import { Navigation, Timeslots } from '../../components';

class Dates extends Component {
  constructor(props) {
    super(props);

    this.dateCellRender = this.dateCellRender.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  componentDidMount() {
    const { match: { params: { siteId } } } = this.props;
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    this.props.getDatesRequest(siteId, startDate, endDate);
  }

  onPanelChange(value) {
    const { match: { params: { siteId } } } = this.props;
    const startDate = value.startOf('month').format('YYYY-MM-DD');
    const endDate = value.endOf('month').format('YYYY-MM-DD');
    this.props.getDatesRequest(siteId, startDate, endDate);
  }

  dateCellRender(value) {
    const { dates } = this.props;
    const { match: { params: { siteId } } } = this.props;
    return dates[value.format('YYYYMMDD')] ? <Timeslots preferredDate={value.format('YYYY-MM-DD')} siteId={siteId} /> : null;
  }

  render() {
    const { isFetching } = this.props;

    return (
      <Fragment>
        <h1>Dates</h1>
        {isFetching ? <p>Fetching</p> : null}
        <Calendar dateCellRender={this.dateCellRender} onPanelChange={this.onPanelChange} />
        <Navigation />
      </Fragment>
    );
  }
}

Dates.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dates: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      siteId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  getDatesRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { dates: { dates, isFetching } } = state;

  return {
    dates,
    isFetching,
  };
};

const mapDispatchToProps = {
  getDatesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dates);
