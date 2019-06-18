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
        {posts.length > 0 ? (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          <Typography className="center-margin" variant="body1">
            You have no post. Go ahead and create some. Our community would appreciate your posts!
          </Typography>
        )}
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
