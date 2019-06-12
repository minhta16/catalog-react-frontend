import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Paper, Avatar, Grid } from '@material-ui/core';

export function UserPostsPaper(props) {
  const { username, token } = props;
  return (
    <Paper className="left-margin">
      <Grid container alignItems="center">
        <Avatar
          style={{
            backgroundColor: '#fdb600',
            color: '#fff',
            margin: '0.5rem',
          }}
        >
          {username.charAt(0)}
        </Avatar>
        <Typography variant="body1">{username}</Typography>
      </Grid>
      <Divider />
      <Typography variant="body1">{token}</Typography>
    </Paper>
  );
}

UserPostsPaper.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default UserPostsPaper;
