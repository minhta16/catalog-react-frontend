import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPaper from 'components/Post/PostPaper';
import { Container, CircularProgress } from '@material-ui/core';
import { selectPost } from 'selectors/posts';
import { selectCategory } from 'selectors/categories';
import { fetchPosts as fetchPostsRedux } from 'actions/posts';
import InfoSnackbar from 'components/Shared/InfoSnackbar';

export class Post extends Component {
  state = {
    openSnackbar: false,
  };

  /**
   * Open the snackbar if snackbarMess is available
   */
  componentDidMount = () => {
    const { location, match, fetchPosts } = this.props;
    fetchPosts(match.params.id);
    if (location.snackbarMess) {
      this.closeSnackbar(false)();
    }
  };

  /**
   * close: close snackbar
   * !close: open snackbar
   */
  closeSnackbar = (close) => () => {
    this.setState({
      openSnackbar: !close,
    });
  };

  render() {
    const { match, currentPost, category, location } = this.props;

    const { openSnackbar } = this.state;
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

        <InfoSnackbar
          open={openSnackbar}
          onClose={this.closeSnackbar(true)}
          message={location.snackbarMess}
        />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
