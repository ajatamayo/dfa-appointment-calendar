import React, { Fragment } from 'react';


const SiteInfo = (props) => {
  // eslint-disable-next-line react/prop-types
  const { site } = props;
  return (
    <Fragment>
      <h1>{site.Name}</h1>
      <p>{site.Description}</p>
      <p>{site.Address}</p>
      <p>{site.Telephone}</p>
    </Fragment>
  );
};

export default SiteInfo;
