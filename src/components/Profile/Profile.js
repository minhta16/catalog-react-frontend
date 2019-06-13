import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPostsPaper from 'components/Profile/UserPostsPaper';
import { Container } from '@material-ui/core';
import { fetchCurrentUserPost as fetchCurrentUserPostRedux } from 'actions/users';
import { selectCurrentUser, selectCurrentUserPosts } from 'selectors/users';

export class Profile extends Component {
  componentDidMount() {
    const { fetchCurrentUserPost, currentUser } = this.props;
    fetchCurrentUserPost(currentUser.token);
  }

  render() {
    const { currentUser, currentUserPosts } = this.props;
    return (
      <Container maxWidth="lg">
        <UserPostsPaper
          username={currentUser.username}
          token={currentUser.token}
          posts={currentUserPosts}
        />
      </Container>
    );
  }
}
Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchCurrentUserPost: PropTypes.func.isRequired,
  currentUserPosts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  currentUserPosts: selectCurrentUserPosts(state),
});

const mapDispatchToProps = {
  fetchCurrentUserPost: fetchCurrentUserPostRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
