import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import PostItem from './PostItem';

export function PostList(props) {
  const { posts } = props;
  return (
    <div style={{ margin: '.5rem' }}>
      <Typography variant="h4" className="center-margin">
        Your Posts
      </Typography>
      {posts.reverse().map((post) => (
        <PostItem key={post.name} post={post} />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
