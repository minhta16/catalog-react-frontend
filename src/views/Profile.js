import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPostsPaper from 'components/UserPostsPaper';
import { Container } from '@material-ui/core';
import { fetchCurrentUserPost as fetchCurrentUserPostRedux } from 'references/redux/actions/users';
import { selectCurrentUser } from 'references/redux/selectors/users';

export class Post extends Component {
  componentDidMount() {
    const { fetchCurrentUserPost, currentUser } = this.props;
    fetchCurrentUserPost(currentUser.token);
  }

  render() {
    const { currentUser } = this.props;
    return (
      <Container maxWidth="lg">
        <UserPostsPaper
          username={currentUser.username}
          token={currentUser.token}
          posts={currentUser.posts}
        />
      </Container>
    );
  }
}
Post.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchCurrentUserPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = {
  fetchCurrentUserPost: fetchCurrentUserPostRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
