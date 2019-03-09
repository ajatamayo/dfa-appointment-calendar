import moment from 'moment';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Calendar, Col, Row, Spin,
} from 'antd';
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
    const { sites, dates, isFetching } = this.props;
    const { match: { params: { siteId } } } = this.props;
    const site = sites.find(i => i.Id.toString() === siteId);
    return (
      <div className="cf dates">
        <div className="sidebar">
          {sites.length ? (
            <Fragment>
              <SiteInfo site={site} />
              <Navigation />
            </Fragment>
          ) : <Spin />}
        </div>
        {sites.length ? (
          <Calendar
            className={`calendar ${(!sites.length || isFetching) ? 'loading' : ''}`}
            dateCellRender={this.dateCellRender}
            onPanelChange={this.onPanelChange}
            validRange={[moment(), moment().startOf('month').add(2, 'months').endOf('month')]}
          />
        ) : null}
        {isFetching && sites.length ? <Spin /> : null}
        <div className="calendar-list">
          {!isFetching ? (
            <Row>
              {Object.keys(dates).map((i) => {
                if (dates[i]) {
                  return (
                    <Col key={i} xs={12} sm={8} md={6} className="calendar-list-item">
                      <h3>{moment(i, 'YYYYMMDD').format('LL')}</h3>
                      <Timeslots preferredDate={moment(i, 'YYYYMMDD').format('YYYY-MM-DD')} siteId={siteId} />
                    </Col>
                  );
                }
                return null;
              })}
            </Row>
          ) : null}
        </div>
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
  const { timeslots: { timeslots } } = state;

  return {
    dates,
    sites,
    timeslots,
    isFetching,
  };
};

const mapDispatchToProps = {
  getDatesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dates);
