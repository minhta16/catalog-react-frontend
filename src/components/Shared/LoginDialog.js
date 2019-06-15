import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Link,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export class LoginDialog extends Component {
  state = {
    username: '',
    password: '',
  };

  onClickSubmit = () => {
    const { onClick } = this.props;
    const { username, password } = this.state;
    onClick(username, password);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { open, onClose, errorMessage } = this.props;
    const { username, password } = this.state;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Typography variant="body1" color="error">
              {`${errorMessage}`}
            </Typography>
          )}
          <form autoComplete="off">
            <TextField
              required
              id="username"
              label="Username"
              value={username}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              id="password"
              label="Password"
              value={password}
              onChange={this.handleChange}
              type="password"
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </form>
          <Link onClick={onClose} component={RouterLink} exact="true" to="/register">
            Haven’t got an account yet? Register here!
          </Link>
        </DialogContent>
        <DialogActions>
          <Button id="login-dialog-login" onClick={this.onClickSubmit} color="primary">
            Login
          </Button>
          <Button id="login-dialog-close" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  errorMessage: PropTypes.string,
};

LoginDialog.defaultProps = {
  onClose: () => {},
  onClick: async (username, password) => `${username}_${password}`,
  open: true,
  errorMessage: '',
};
export default LoginDialog;
