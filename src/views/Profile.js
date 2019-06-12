import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPostsPaper from 'components/UserPostsPaper';
import { Container } from '@material-ui/core';
import { selectCurrentUser } from 'references/redux/selectors/users';

export function Post(props) {
  const { currentUser } = props;
  return (
    <Container maxWidth="lg">
      <UserPostsPaper username={currentUser.username} token={currentUser.token} />
    </Container>
  );
}

Post.propTypes = {
  currentUser: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});
Post.propTypes = {};

export default connect(mapStateToProps)(Post);
