import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Avatar, Menu, MenuItem, Grid, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ExitIcon from '@material-ui/icons/ExitToApp';

export class LoginButton extends Component {
  state = {
    anchorEl: undefined,
  };

  handleClickAvatar = (e) => {
    this.setState({
      anchorEl: e.target,
    });
  };

  handleCloseMenu = () => {
    this.setState({
      anchorEl: undefined,
    });
  };

  handleSignOut = () => {
    const { signOut } = this.props;
    signOut();
    this.handleCloseMenu();
  };

  render() {
    const { onClick, variant, color, currentUser } = this.props;
    const { anchorEl } = this.state;

    const menu = (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={this.handleCloseMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={this.handleCloseMenu} component={Link} exact="true" to="/profile">
          <Grid container alignItems="center">
            <PersonIcon color="primary" style={{ margin: '0 0.5rem 0 0' }} />
            <Typography variant="body1">Profile</Typography>
          </Grid>
        </MenuItem>
        <MenuItem
          id="login-button-logout"
          onClick={this.handleSignOut}
          component={Link}
          exact="true"
          to="/"
        >
          <ExitIcon color="primary" style={{ margin: '0 0.5rem 0 0' }} />
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    );
    return (
      <div>
        {Object.keys(currentUser).length ? (
          <Grid container alignItems="center">
            <Typography variant="body1">{`Welcome, ${currentUser.username}`}</Typography>
            <Avatar
              style={{ backgroundColor: '#fdb600', color: '#fff', margin: '0.5rem' }}
              onClick={this.handleClickAvatar}
            >
              {currentUser.username.charAt(0)}
            </Avatar>
            {menu}
          </Grid>
        ) : (
          <Button id="login-button" onClick={onClick} variant={variant} color={color}>
            Login
          </Button>
        )}
      </div>
    );
  }
}

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

LoginButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
};

export default LoginButton;
