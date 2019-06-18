import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPostsPaper from 'components/Profile/UserPostsPaper';
import { Container } from '@material-ui/core';
import { fetchCurrentUserPost as fetchCurrentUserPostRedux } from 'actions/users';
import {
  selectCurrentUser,
  selectCurrentUserPosts,
  selectCurrentUserLoading,
} from 'selectors/users';

export class Profile extends Component {
  // Always refetch post if Profile is mounted
  componentDidMount() {
    const { fetchCurrentUserPost, currentUser } = this.props;
    fetchCurrentUserPost(currentUser.token);
  }

  render() {
    const { currentUser, currentUserPosts, currentUserLoading } = this.props;
    return (
      <Container maxWidth="lg">
        <UserPostsPaper
          username={currentUser.username}
          token={currentUser.token}
          posts={currentUserPosts}
          loading={currentUserLoading}
        />
      </Container>
    );
  }
}
Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchCurrentUserPost: PropTypes.func.isRequired,
  currentUserPosts: PropTypes.array.isRequired,
  currentUserLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  currentUserPosts: selectCurrentUserPosts(state, 'reverse'),
  currentUserLoading: selectCurrentUserLoading(state),
});

const mapDispatchToProps = {
  fetchCurrentUserPost: fetchCurrentUserPostRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
