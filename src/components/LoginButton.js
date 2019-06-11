import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Avatar, Menu, MenuItem } from '@material-ui/core';

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
        <MenuItem onClick={this.handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={this.handleCloseMenu}>Logout</MenuItem>
      </Menu>
    );
    return (
      <div>
        {Object.keys(currentUser).length ? (
          <div>
            <Avatar color={color} onClick={this.handleClickAvatar}>
              {currentUser.username.charAt(0)}
            </Avatar>
            {menu}
          </div>
        ) : (
          <Button onClick={onClick} variant={variant} color={color}>
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
};

LoginButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
};

export default LoginButton;
