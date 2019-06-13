import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signIn as signInRedux, signOut as signOutRedux } from 'actions/users';
import { selectCurrentUser } from 'selectors/users';
import LoginButton from './LoginButton';
import LoginDialog from './LoginDialog';

export class CustomAppBar extends Component {
  state = {
    open: false,
  };

  handleLoginClick = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  render() {
    const { open } = this.state;
    const { color, currentUser, signIn, signOut } = this.props;
    return (
      <AppBar color={color}>
        <Toolbar>
          <IconButton edge="start" color="inherit" component={Link} exact="true" to="/">
            <img src="/img/logo.svg" alt="site logo" />
          </IconButton>
          <Typography style={{ flexGrow: '1' }} />
          <LoginButton
            id="custom-app-bar-login-button"
            variant="contained"
            color="primary"
            currentUser={currentUser}
            onClick={this.handleLoginClick}
            signOut={signOut}
          />
          <LoginDialog open={open} onClose={this.handleLoginClick} onClick={signIn} />
        </Toolbar>
      </AppBar>
    );
  }
}

CustomAppBar.propTypes = {
  color: PropTypes.string.isRequired,
  currentUser: PropTypes.object,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

CustomAppBar.defaultProps = {
  currentUser: {},
};

export const mapSelectorToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export const mapDispatchToProps = {
  signIn: signInRedux,
  signOut: signOutRedux,
};

export default connect(
  mapSelectorToProps,
  mapDispatchToProps,
)(CustomAppBar);
