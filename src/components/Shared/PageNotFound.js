import React from 'react';
import { Typography } from '@material-ui/core';

const PageNotFound = () => (
  <div>
    <Typography variant="h3">404: Page Not Found!</Typography>
    <Typography variant="body1">
      Please check your URL. We could not find where you are trying to go!
    </Typography>
  </div>
);

export default PageNotFound;
