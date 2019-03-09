import React from 'react';
import { Link } from 'react-router-dom';


const Navigation = () => (
  <p style={{ marginTop: 8 }}>
    <Link to="/">
      &lt; back to list of sites
    </Link>
  </p>
);

export default Navigation;
