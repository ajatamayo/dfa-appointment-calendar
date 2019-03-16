import React, { Fragment } from 'react';


const SiteInfo = (props) => {
  // eslint-disable-next-line react/prop-types
  const { site } = props;
  return (
    <Fragment>
      <h1>{site.Name}</h1>
      <p className="description">{site.Description}</p>
      <p className="address">{site.Address}</p>
      <p className="telephone">{site.Telephone}</p>
    </Fragment>
  );
};

export default SiteInfo;
