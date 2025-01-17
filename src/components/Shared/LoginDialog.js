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

/**
 * This creates a basic login dialog where the user can login with an username and password and create an account if they haven't got one
 */
export class LoginDialog extends Component {
  state = {
    username: '',
    password: '',
  };

  /**
   * Register when submit
   */
  onClickSubmit = (e) => {
    e.preventDefault();
    const { onClick } = this.props;
    const { username, password } = this.state;
    onClick(username, password);
  };

  // Connect component with state
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
        <form autoComplete="off" onSubmit={this.onClickSubmit}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            {/* Display the error message if an error occured */}
            {errorMessage &&
              errorMessage.map((message) => (
                <Typography key={message} variant="body1" color="error">
                  {`${message}`}
                </Typography>
              ))}
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
            <Link onClick={onClose} component={RouterLink} exact="true" to="/register">
              Haven’t got an account yet? Register here!
            </Link>
          </DialogContent>
          <DialogActions>
            <Button id="login-dialog-login" type="submit" color="primary">
              Login
            </Button>
            <Button id="login-dialog-close" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  errorMessage: PropTypes.array,
};

LoginDialog.defaultProps = {
  onClose: () => {},
  onClick: async (username, password) => `${username}_${password}`,
  open: true,
  errorMessage: [],
};
export default LoginDialog;
