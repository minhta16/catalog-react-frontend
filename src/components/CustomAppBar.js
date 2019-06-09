import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import HideOnScroll from './HideOnScroll';

class CustomAppBar extends Component {
  state = {};

  render() {
    return (
      <HideOnScroll>
        <AppBar>
          <Toolbar color="primary">
            <Typography>Got It, Inc. Final Project</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  }
}

export default CustomAppBar;
