import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';

import HideOnScroll from './HideOnScroll';
import LoginButton from './LoginButton';

class CustomAppBar extends Component {
  state = {};

  render() {
    const { color } = this.props;
    return (
      <HideOnScroll>
        <AppBar color={color}>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <img src="/img/logo.svg" alt="site logo" />
            </IconButton>
            <Typography style={{ flexGrow: '1' }} />
            <LoginButton />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  }
}

CustomAppBar.propTypes = {
  color: PropTypes.string.isRequired,
};

export default CustomAppBar;
