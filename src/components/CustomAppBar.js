import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginButton from './LoginButton';

export function CustomAppBar(props) {
  const { color, currentUser } = props;
  return (
    <AppBar color={color}>
      <Toolbar>
        <IconButton edge="start" color="inherit" component={Link} exact="true" to="/">
          <img src="/img/logo.svg" alt="site logo" />
        </IconButton>
        <Typography style={{ flexGrow: '1' }} />
        <LoginButton currentUser={currentUser} />
      </Toolbar>
    </AppBar>
  );
}

CustomAppBar.propTypes = {
  color: PropTypes.string.isRequired,
  currentUser: PropTypes.object,
};

CustomAppBar.defaultProps = {
  currentUser: { username: '', password: '', token: '' },
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(CustomAppBar);
