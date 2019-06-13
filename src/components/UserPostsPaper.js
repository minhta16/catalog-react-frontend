import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Paper, Avatar, Grid } from '@material-ui/core';
import PostList from './PostList';

export function UserPostsPaper(props) {
  const { username, posts } = props;
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
      <PostList posts={posts} />
    </Paper>
  );
}

UserPostsPaper.propTypes = {
  username: PropTypes.string.isRequired,
  posts: PropTypes.array,
};

UserPostsPaper.defaultProps = {
  posts: [],
};

export default UserPostsPaper;
