import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSitesRequest } from '../../actions/siteActions';
import './sites.css';

class Sites extends Component {
  componentDidMount() {
    this.props.getSitesRequest();
  }

  render() {
    const { sites, isFetching } = this.props;

    if (isFetching) {
      return <p>Loading sites...</p>;
    }

    return (
      <Fragment>
        <h1>Sites</h1>
        <ul className="sites-list">
          {sites.map(o => (
            <li key={o.Id}>
              <Link to={`/${o.Id}`}>{o.Name}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

Sites.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  getSitesRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { sites: { sites, isFetching } } = state;

  return {
    sites,
    isFetching,
  };
};

const mapDispatchToProps = {
  getSitesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
