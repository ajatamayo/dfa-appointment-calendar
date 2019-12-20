import moment from 'moment';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Calendar, notification } from 'antd';
import { getDatesRequest, setDate, setMonth } from '../../actions/dateActions';
import {
  Loading, Main, Timeslots,
} from '../../components';
import './calendar.css';

const ButtonGroup = Button.Group;

class Dates extends Component {
  constructor(props) {
    super(props);

    this.dateCellRender = this.dateCellRender.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
    this.showNextAction = this.showNextAction.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onSelect = this.onSelect.bind(this);
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

  onSelect(value) {
    this.showNextAction(null, value);
  }

  dateCellRender(value) {
    const { dates } = this.props;
    const { match: { params: { siteId } } } = this.props;
    if (dates[value.format('YYYYMMDD')]) {
      return <Timeslots preferredDate={value.format('YYYY-MM-DD')} siteId={siteId} />;
    }
    return null;
  }

  handleKeyUp(e, selectedDate) {
    if (e.key === 'Enter') {
      this.showNextAction(e, selectedDate);
    }
  }

  showNextAction(e, selectedDate) {
    if (e) {
      e.preventDefault();
    }
    notification.close('next-action');
    const { dates } = this.props;
    if (Object.keys(dates).indexOf(selectedDate.format('YYYYMMDD')) === -1) {
      return;
    }
    const dateDisplay = moment(selectedDate, 'YYYY-MM-DD').format('LL');
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
    let value;
    if (activeMonth) {
      value = moment(activeMonth);
    } else if (month) {
      value = moment(`01-${month}`, 'DD-MM-YYYY');
    } else {
      value = moment();
    }
    return (
      <Fragment>
        <Main>
          {sites.length ? (
            <Calendar
              className={`calendar ${!activeMonth || isFetching || !Object.values(dates).some(Boolean) ? 'hide-dates' : ''}`}
              dateCellRender={this.dateCellRender}
              onPanelChange={this.onPanelChange}
              validRange={validRange}
              defaultValue={value}
              disabledDate={(currentDate) => {
                if (!activeMonth) return false;
                const monthStart = moment(activeMonth).startOf('month');
                const monthEnd = moment(activeMonth).endOf('month');
                return !currentDate.isBetween(monthStart, monthEnd, null, '[]');
              }}
              onSelect={this.onSelect}
              headerRender={({ onChange }) => (
                <Fragment>
                  <div className="pointer">Next, select a month:</div>
                  <div className="months-selector-container">
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
                  {!isFetching && activeMonth ? (
                    <p className="slogan">
                      {Object.values(dates).some(Boolean) ? (
                        `Here are all available slots for individual appointments for ${value.format('MMMM YYYY')}.`
                      ) : (
                        `Oops, seems like there aren't any more slots for ${value.format('MMMM YYYY')}. You should check again in 5 minutes or so, some slots do get freed up! Goodluck!`
                      )}
                    </p>
                  ) : null}
                  {isFetching && activeMonth ? (
                    <Loading text="Fetching timeslots ..." />
                  ) : null}
                </Fragment>
              )}
            />
          ) : null}
          <div className="calendar-list">
            {!isFetching && activeMonth ? (
              Object.keys(dates).map((i) => {
                if (dates[i]) {
                  return (
                    <div
                      key={i}
                      className="calendar-list-item"
                      onClick={e => this.showNextAction(e, moment(i, 'YYYYMMDD'))}
                      onKeyUp={e => this.handleKeyUp(e, moment(i, 'YYYYMMDD'))}
                      role="button"
                      tabIndex="0"
                    >
                      <p className="date-day-month">{moment(i, 'YYYYMMDD').format('ddd [|] MMM')}</p>
                      <p className="date-day">{moment(i, 'YYYYMMDD').format('DD')}</p>
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
