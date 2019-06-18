import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPaper from 'components/Post/PostPaper';
import { Container, CircularProgress } from '@material-ui/core';
import { selectPost } from 'selectors/posts';
import { selectCategory } from 'selectors/categories';
import { fetchPosts as fetchPostsRedux } from 'actions/posts';
import { openSnackbar as openSnackbarRedux } from 'actions/misc';

export class Post extends Component {
  /**
   * Open the snackbar if snackbarMess is available
   */
  componentDidMount = () => {
    const { location, match, fetchPosts, openSnackbar } = this.props;
    fetchPosts(match.params.id);
    if (location.snackbarMess) {
      openSnackbar(location.snackbarMess);
    }
  };

  render() {
    const { match, currentPost, category } = this.props;

    return (
      <Container maxWidth="lg">
        {/* Only display post paper if currentPost and category is available */}
        {currentPost && category ? (
          <PostPaper
            header={currentPost.name}
            created={currentPost.created}
            body={currentPost.description}
            categoryName={category.name}
            categoryId={match.params.id}
          />
        ) : (
          <CircularProgress />
        )}
      </Container>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  currentPost: PropTypes.object,
  category: PropTypes.object,
  location: PropTypes.object.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

Post.defaultProps = {
  currentPost: undefined,
  category: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  currentPost: selectPost(state, ownProps.match.params.postId),
  category: selectCategory(state, ownProps.match.params.id),
});

const mapDispatchToProps = {
  fetchPosts: fetchPostsRedux,
  openSnackbar: openSnackbarRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
