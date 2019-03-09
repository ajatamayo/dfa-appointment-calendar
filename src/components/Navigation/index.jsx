import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Navigation = () => (
  <p style={{ marginTop: 8 }}>
    <Button size="small">
      <Link to="/">Sites</Link>
    </Button>
  </p>
);

export default Navigation;
