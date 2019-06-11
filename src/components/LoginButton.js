import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

export class LoginButton extends Component {
  state = {};

  render() {
    const { onClick } = this.props;
    return <Button onClick={onClick}>Login</Button>;
  }
}

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoginButton;
