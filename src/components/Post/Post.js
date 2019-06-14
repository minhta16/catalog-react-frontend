import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPaper from 'components/Post/PostPaper';
import { Container } from '@material-ui/core';
import { selectPost } from 'selectors/posts';
import { selectCategory } from 'selectors/categories';
import InfoSnackbar from 'components/Shared/InfoSnackbar';

export class Post extends Component {
  state = {
    openSnackbar: false,
  };

  componentDidMount = () => {
    const { location } = this.props;
    if (location.snackbarMess) {
      this.closeSnackbar(false);
    }
  };

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
        <PostPaper
          header={currentPost.name}
          created={currentPost.created}
          body={currentPost.description}
          categoryName={category.name}
          categoryId={match.params.id}
        />

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
  currentPost: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  currentPost: selectPost(state, ownProps.match.params.postId),
  category: selectCategory(state, ownProps.match.params.id),
});
Post.propTypes = {};

export default connect(mapStateToProps)(Post);
