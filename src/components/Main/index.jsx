import React from 'react';
import PropTypes from 'prop-types';
import { SiteSelector } from '..';

const Main = props => (
  <div className="main">
    <SiteSelector defaultSite={props.siteId} />
    {/* eslint-disable-next-line react/prop-types */}
    {props.children}
  </div>
);

Main.propTypes = {
  siteId: PropTypes.string,
};

Main.defaultProps = {
  siteId: '',
};

export default Main;
