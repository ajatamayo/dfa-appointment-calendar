import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Calendar } from 'antd';
import { getDatesRequest } from '../../actions/dateActions';
import { Navigation, SiteInfo, Timeslots } from '../../components';
import './calendar.css';

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
    if (dates[value.format('YYYYMMDD')]) {
      return <Timeslots preferredDate={value.format('YYYY-MM-DD')} siteId={siteId} />;
    }
    return null;
  }

  render() {
    const { sites } = this.props;
    const { match: { params: { siteId } } } = this.props;
    const site = sites.find(i => i.Id.toString() === siteId);
    return (
      <div className="cf dates">
        <div className="sidebar">
          {sites.length ? <SiteInfo site={site} /> : null}
          <Navigation />
        </div>
        <Calendar
          className="calendar"
          dateCellRender={this.dateCellRender}
          onPanelChange={this.onPanelChange}
          validRange={[moment(), moment().startOf('month').add(2, 'months').endOf('month')]}
        />
      </div>
    );
  }
}

Dates.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dates: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sites: PropTypes.array.isRequired,
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
  const { sites: { sites } } = state;

  return {
    dates,
    sites,
    isFetching,
  };
};

const mapDispatchToProps = {
  getDatesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dates);
