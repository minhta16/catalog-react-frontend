import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPaper from 'components/Post/PostPaper';
import { Container } from '@material-ui/core';
import { selectPost } from 'selectors/posts';
import { selectCategory } from 'selectors/categories';

export function Post(props) {
  const { match, currentPost, category } = props;
  return (
    <Container maxWidth="lg">
      <PostPaper
        header={currentPost.name}
        created={currentPost.created}
        body={currentPost.description}
        categoryName={category.name}
        categoryId={match.params.id}
      />
    </Container>
  );
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  currentPost: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  currentPost: selectPost(state, ownProps.match.params.postId),
  category: selectCategory(state, ownProps.match.params.id),
});
Post.propTypes = {};

export default connect(mapStateToProps)(Post);
