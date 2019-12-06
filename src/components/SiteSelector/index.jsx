import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { getSitesRequest, setSite } from '../../actions/siteActions';
import { Loading } from '..';
import './siteselector.css';

const { Option } = Select;

class SiteSelector extends Component {
  componentDidMount() {
    const { pathname } = this.props;
    const defaultSiteSlug = pathname.length ? pathname.split('/')[1] : '';
    this.props.getSitesRequest(defaultSiteSlug);
  }

  onSiteSelect = (value) => {
    this.props.setSite(value);
  }

  render() {
    const { sites, pathname } = this.props;
    const defaultSiteSlug = pathname.length ? pathname.split('/')[1] : '';
    const defaultSite = sites.find(site => site.slug === defaultSiteSlug);
    const defaultSiteId = defaultSite ? defaultSite.Id : null;
    return (
      <Fragment>
        <p className="pointer">First, select a site:</p>
        {sites.length ? (
          <div className="site-selector-container">
            <Select
              size="large"
              onChange={this.onSiteSelect}
              defaultValue={defaultSiteId}
              className="site-selector"
              showSearch
              filterOption={(input, option) => {
                const text = option.props.children.toLowerCase();
                return text.indexOf(input.toLowerCase()) >= 0;
              }}
            >
              {sites.map(o => (
                <Option key={o.Id} value={o.Id}>{o.Name}</Option>
              ))}
            </Select>
          </div>
        ) : (
          <Loading text="Loading sites ..." />
        )}
      </Fragment>
    );
  }
}

SiteSelector.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
  getSitesRequest: PropTypes.func.isRequired,
  setSite: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { sites: { sites, isFetching } } = state;
  const { router: { location: { pathname } } } = state;
  return {
    sites,
    isFetching,
    pathname,
  };
};

const mapDispatchToProps = {
  getSitesRequest,
  setSite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteSelector);
