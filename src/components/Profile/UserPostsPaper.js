import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography, Divider, Paper, Avatar, Grid, Fab, CircularProgress } from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import PostList from './PostList';

export function UserPostsPaper(props) {
  const { username, posts, loading } = props;
  return (
    <Paper className="left-margin">
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
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
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            style={{ boxShadow: 'none' }}
            color="primary"
            component={Link}
            exact="true"
            to="/new-item"
          >
            <LibraryAddIcon className="icon-padding" />
            New item
          </Fab>
        </Grid>
      </Grid>
      <Divider />
      {/* Display an animation if loading is true */}
      {loading ? <CircularProgress /> : <PostList posts={posts} />}
    </Paper>
  );
}

UserPostsPaper.propTypes = {
  username: PropTypes.string.isRequired,
  posts: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

UserPostsPaper.defaultProps = {
  posts: [],
};

export default UserPostsPaper;
