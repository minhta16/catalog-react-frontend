import React, { Component } from 'react';

import {
  TextField, Paper, Container, Typography, Button,
} from '@material-ui/core';

export class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const {
      username, email, password, confirmPassword,
    } = this.state;

    return (
      <Container maxWidth="lg">
        <Paper style={{ padding: '1em' }}>
          <Typography variant="h4">Register now!</Typography>
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
              id="email"
              label="Email Address"
              value={email}
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
            <TextField
              required
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={this.handleChange}
              type="password"
              margin="normal"
              fullWidth
              variant="outlined"
            />
            <Typography variant="subtitle2">
              By clicking Resgister, you agree with our Terms of Condition.
            </Typography>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default SignUp;
