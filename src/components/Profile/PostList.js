import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import InfoSnackbar from 'components/Shared/InfoSnackbar';
import PostItem from './PostItem';

export class PostList extends Component {
  state = {
    openSnackbar: false,
  };

  closeSnackbar = (close) => () => {
    this.setState({
      openSnackbar: !close,
    });
  };

  render() {
    const { posts } = this.props;
    const { openSnackbar } = this.state;
    return (
      <div style={{ margin: '.5rem' }}>
        <Typography variant="h4" className="center-margin">
          Your Posts
        </Typography>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} openSnackbar={this.closeSnackbar(false)} />
        ))}

        <InfoSnackbar
          open={openSnackbar}
          onClose={this.closeSnackbar(true)}
          message="Post Deleted!"
        />
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
