import React from 'react';

const Sidebar = props => (
  <div className="sidebar">
    {/* eslint-disable-next-line react/prop-types */}
    {props.children}
  </div>
);

export default Sidebar;
