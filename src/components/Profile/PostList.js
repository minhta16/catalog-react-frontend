import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { openSnackbar as openSnackbarRedux } from 'actions/misc';
import PostItem from './PostItem';

export class PostList extends Component {
  state = {};

  handleOpenSnackbar = () => {
    const { openSnackbar } = this.props;
    openSnackbar('Post created!');
  };

  render() {
    const { posts } = this.props;
    return (
      <div style={{ margin: '.5rem' }}>
        <Typography variant="h4" className="center-margin">
          Your Posts
        </Typography>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default connect(
  null,
  { openSnackbar: openSnackbarRedux },
)(PostList);
