import React from 'react';
import { Affix } from 'antd';

const Sidebar = props => (
  <div className="sidebar">
    <Affix>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </Affix>
  </div>
);

export default Sidebar;
