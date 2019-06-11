import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

export class LoginButton extends Component {
  state = {};

  render() {
    const { onClick, variant, color } = this.props;
    return (
      <Button onClick={onClick} variant={variant} color={color}>
        Login
      </Button>
    );
  }
}

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
};

LoginButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
};

export default LoginButton;
