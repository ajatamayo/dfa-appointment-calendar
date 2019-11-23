import moment from 'moment';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Calendar, Spin } from 'antd';
import { getDatesRequest, setDate, setMonth } from '../../actions/dateActions';
import {
  Main, Timeslots,
} from '../../components';
import './calendar.css';

const ButtonGroup = Button.Group;

class Dates extends Component {
  constructor(props) {
    super(props);

    this.dateCellRender = this.dateCellRender.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  componentDidMount() {
    const { match: { params: { siteId, month } } } = this.props;
    const value = month ? moment(`01-${month}`, 'DD-MM-YYYY') : moment();
    const startDate = value.startOf('month').format('YYYY-MM-DD');
    const endDate = value.endOf('month').format('YYYY-MM-DD');

    if (month) {
      this.props.setMonth(moment(`01-${month}`, 'DD-MM-YYYY').format(), siteId);
    }

    this.props.getDatesRequest(undefined, startDate, endDate, siteId);
  }

  onPanelChange(value) {
    const { match: { params: { siteId } } } = this.props;
    const startDate = value.startOf('month').format('YYYY-MM-DD');
    const endDate = value.endOf('month').format('YYYY-MM-DD');
    this.props.getDatesRequest(undefined, startDate, endDate, siteId);
    this.props.setDate(value);
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
    const {
      sites, dates, isFetching, activeMonth,
    } = this.props;
    const { match: { params: { siteId, month } } } = this.props;
    const validMonthsCount = 3;
    const validRange = [moment(), moment().startOf('month').add(validMonthsCount - 1, 'months').endOf('month')];
    const validMonths = [];
    for (let i = 0; i < validMonthsCount; i += 1) {
      validMonths.push(moment().startOf('month').add(i, 'months'));
    }
    const value = activeMonth ? moment(activeMonth) : moment();
    return (
      <Fragment>
        <Main>
          {sites.length ? (
            <Calendar
              className="calendar"
              dateCellRender={this.dateCellRender}
              onPanelChange={this.onPanelChange}
              validRange={validRange}
              value={value}
              headerRender={({ onChange }) => (
                <div>
                  <div style={{ marginBottom: '10px' }}>Next, select a month:</div>
                  <ButtonGroup>
                    {validMonths.map(o => (
                      <Button
                        key={o.format('MMM YYYY')}
                        size="large"
                        onClick={() => {
                          onChange(o);
                          this.props.setMonth(o.format(), siteId);
                        }}
                        type={month === o.format('MM-YYYY') ? 'primary' : 'default'}
                      >
                        {o.format('MMM YYYY')}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              )}
            />
          ) : null}
          {isFetching && sites.length ? <Spin /> : null}
          <div className="calendar-list">
            {!isFetching ? (
              Object.keys(dates).map((i) => {
                if (dates[i]) {
                  return (
                    <div key={i} className="calendar-list-item">
                      <h3>{moment(i, 'YYYYMMDD').format('ll')}</h3>
                      <Timeslots preferredDate={moment(i, 'YYYYMMDD').format('YYYY-MM-DD')} siteId={siteId} />
                    </div>
                  );
                }
                return null;
              })
            ) : null}
          </div>
        </Main>
      </Fragment>
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
      month: PropTypes.string,
    }).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  getDatesRequest: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  activeMonth: PropTypes.string,
};

Dates.defaultProps = {
  activeMonth: '',
};

const mapStateToProps = (state) => {
  const { dates: { dates, isFetching, activeMonth } } = state;
  const { sites: { sites } } = state;
  const { timeslots: { timeslots } } = state;
  return {
    dates,
    sites,
    timeslots,
    isFetching,
    activeMonth,
  };
};

const mapDispatchToProps = {
  getDatesRequest,
  setDate,
  setMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dates);
