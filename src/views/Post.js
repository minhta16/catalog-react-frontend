import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPaper from 'components/PostPaper';
import { Container } from '@material-ui/core';
import { selectPost } from 'references/redux/selectors/posts';

export function Post(props) {
  const { match, currentPost } = props;
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
  currentPost: PropTypes.shape.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  currentPost: selectPost(state, ownProps.match.params.postId),
});
Post.propTypes = {};

export default connect(mapStateToProps)(Post);
