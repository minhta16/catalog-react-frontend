import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Paper, Container } from '@material-ui/core';

const PageNotFound = () => (
  <Container maxWidth="lg">
    <Paper style={{ padding: '1rem' }}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Typography variant="h3">Page Not Found</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            The link you followed may be broken, or the page may have been removed.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" component={Link} exact="true" to="/">
            Go back to Home
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);

export default PageNotFound;
