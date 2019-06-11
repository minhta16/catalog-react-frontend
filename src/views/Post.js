import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPaper from 'components/PostPaper';
import { Container } from '@material-ui/core';

export function Post(props) {
  const { match, selectedCatItems } = props;
  const currentPost = selectedCatItems[match.params.postId];
  return (
    <Container maxWidth="lg">
      <PostPaper
        header={currentPost.name}
        created={currentPost.created}
        body={currentPost.description}
        categoryId={match.params.id}
      />
    </Container>
  );
}

Post.propTypes = {
  match: PropTypes.shape.isRequired,
  selectedCatItems: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  selectedCatItems: state.posts,
});
Post.propTypes = {};

export default connect(mapStateToProps)(Post);
