import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { getSitesRequest, setSite } from '../../actions/siteActions';
import './siteselector.css';

const { Option } = Select;

class SiteSelector extends Component {
  componentDidMount() {
    this.props.getSitesRequest();

    const { defaultSite } = this.props;
    if (defaultSite) {
      this.props.setSite(defaultSite);
    }
  }

  onSiteSelect = (value) => {
    this.props.setSite(value);
  }

  render() {
    const { sites, isFetching, defaultSite } = this.props;

    if (isFetching) {
      return <p>Loading sites...</p>;
    }

    return (
      <Fragment>
        <p>First, select a site:</p>
        <Select
          size="large"
          onChange={this.onSiteSelect}
          style={{ minWidth: 360 }}
          defaultValue={defaultSite}
        >
          {sites.map(o => (
            <Option key={o.Id}>{o.Name}</Option>
          ))}
        </Select>
      </Fragment>
    );
  }
}

SiteSelector.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  defaultSite: PropTypes.string.isRequired,
  getSitesRequest: PropTypes.func.isRequired,
  setSite: PropTypes.func.isRequired,
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
  setSite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteSelector);
