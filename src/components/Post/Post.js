import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PostPaper from 'components/Post/PostPaper';
import { Container, CircularProgress } from '@material-ui/core';
import { selectPost, selectPostLoading } from 'selectors/posts';
import { selectCategory } from 'selectors/categories';
import { fetchPosts as fetchPostsRedux } from 'actions/posts';
import { openSnackbar as openSnackbarRedux } from 'actions/misc';

export class Post extends Component {
  state = {
    redirect: false,
    postNotFound: false,
  };

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

  /**
   * Redirects if post does not exist
   */
  componentDidUpdate = (prevProps) => {
    const { currentPost, postsLoading } = this.props;
    if (!currentPost && !postsLoading && prevProps.postsLoading) {
      this.setState({
        postNotFound: true,
      });
    }
  };

  render() {
    const { match, currentPost, category } = this.props;
    const { redirect, postNotFound } = this.state;

    if (postNotFound) {
      return <Redirect to="/not-found" />;
    }
    if (redirect) {
      return <Redirect exact="true" to="/" />;
    }
    return (
      <Container maxWidth="lg">
        {/* Only display post paper if currentPost and category is available */}
        {currentPost && category ? (
          <PostPaper
            header={currentPost.name}
            created={currentPost.created}
            description={currentPost.description}
            price={currentPost.price}
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
  postsLoading: PropTypes.bool.isRequired,
};

Post.defaultProps = {
  currentPost: undefined,
  category: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  currentPost: selectPost(state, ownProps.match.params.postId),
  category: selectCategory(state, ownProps.match.params.id),
  postsLoading: selectPostLoading(state),
});

const mapDispatchToProps = {
  fetchPosts: fetchPostsRedux,
  openSnackbar: openSnackbarRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
