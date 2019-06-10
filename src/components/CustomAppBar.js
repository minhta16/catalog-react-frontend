import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import HideOnScroll from './HideOnScroll';
import LoginButton from './LoginButton';

class CustomAppBar extends Component {
  state = {};

  render() {
    const { color, currentUser } = this.props;
    return (
      <HideOnScroll>
        <AppBar color={color}>
          <Toolbar>
            <IconButton edge="start" color="inherit" component={Link} exact="true" to="/">
              <img src="/img/logo.svg" alt="site logo" />
            </IconButton>
            <Typography style={{ flexGrow: '1' }} />
            <LoginButton currentUser={currentUser} />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  }
}

CustomAppBar.propTypes = {
  color: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    token: PropTypes.string,
  }),
};

CustomAppBar.defaultProps = {
  currentUser: { username: '', password: '', token: '' },
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(CustomAppBar);
