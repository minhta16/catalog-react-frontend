/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Paper, Container, Typography, Button, Link } from '@material-ui/core';
import TermsAndConditionsDialog from 'components/TermsAndConditionsDialog';
import { createUserAndSignIn as createUserAndSignInRedux } from 'references/redux/actions/users';

export class SignUp extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    openTerms: false,
  };

  handleTermsClick = () => {
    const { openTerms } = this.state;
    this.setState({
      openTerms: !openTerms,
    });
  };

  // register = () => {
  //   const { username, name, email, password, confirmPassword } = this.state;
  //   createUserAndSignin();
  // };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { username, name, email, password, confirmPassword, openTerms } = this.state;

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
              id="name"
              label="Name"
              value={name}
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
              By clicking Resgister, you agree with our
              {' '}
              <Link onClick={this.handleTermsClick}>Terms and Conditions</Link>
            </Typography>
            <Button variant="contained" color="primary" onClick={this.register}>
              Register
            </Button>
          </form>
          <TermsAndConditionsDialog open={openTerms} onClose={this.handleTermsClick} />
        </Paper>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUserAndSignin: (username, name, email, password) => {
    dispatch(createUserAndSignInRedux(username, name, email, password));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
