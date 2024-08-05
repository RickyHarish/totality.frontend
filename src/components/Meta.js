import React from 'react';
import { Helmet } from 'react-helmet';

// Using default parameters
const Meta = ({ title = 'Welcome to CLAW Shoppie.in', description = 'We sell the best products for cheap', keywords = 'electronics, buy electronics, cheap electronics' }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta;
