import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  signIn as signInRedux,
  signOut as signOutRedux,
  clearError as clearErrorRedux,
} from 'actions/users';
import { selectCurrentUser, selectLoginErrorMessage } from 'selectors/users';
import LoginButton from './LoginButton';
import LoginDialog from './LoginDialog';

export class CustomAppBar extends Component {
  state = {
    open: false,
  };

  handleOpenDialog = () => {
    this.setState({
      open: true,
    });
  };

  handleCloseDialog = () => {
    const { clearError } = this.props;
    clearError();
    this.setState({
      open: false,
    });
  };

  /**
   * close the login dialog if currentUser token exists, meaning that the user just logged in
   */
  componentDidUpdate = (prevProps) => {
    const { currentUser } = this.props;
    if (!prevProps.currentUser.token && currentUser.token) {
      this.handleCloseDialog();
    }
  };

  render() {
    const { open } = this.state;
    const { color, currentUser, signIn, signOut, errorMessage } = this.props;
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
            onClick={this.handleOpenDialog}
            signOut={signOut}
          />
          <LoginDialog
            open={open}
            onClose={this.handleCloseDialog}
            onClick={signIn}
            errorMessage={errorMessage}
          />
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
  errorMessage: PropTypes.array,
  clearError: PropTypes.func.isRequired,
};

CustomAppBar.defaultProps = {
  currentUser: {},
  errorMessage: [],
};

export const mapSelectorToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  errorMessage: selectLoginErrorMessage(state),
});

export const mapDispatchToProps = {
  signIn: signInRedux,
  signOut: signOutRedux,
  clearError: clearErrorRedux,
};

export default connect(
  mapSelectorToProps,
  mapDispatchToProps,
)(CustomAppBar);
