/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField, Paper, Container, Typography, Button, Link } from '@material-ui/core';
import TermsAndConditionsDialog from 'components/SignUp/TermsAndConditionsDialog';
import { createUserAndSignIn as createUserAndSignInRedux } from 'actions/users';

export class SignUp extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailWarning: true,
    passWarning: true,
    passwordMatchWarning: true,
    openTerms: false,
    redirect: false,
  };

  /**
   * Connect components to state
   */
  handleChange = (e) => {
    this.setState(
      {
        [e.target.id]: e.target.value,
      },
      this.handleCreateWarnings,
    );
  };

  /**
   * Opens terms and conditions upon called
   */
  handleTermsClick = () => {
    const { openTerms } = this.state;
    this.setState({
      openTerms: !openTerms,
    });
  };

  /**
   * create an user and sign in
   */
  register = () => {
    const { username, password, email, name, passwordMatchWarning, passWarning } = this.state;
    const { createUserAndSignIn } = this.props;
    if (!passwordMatchWarning && !passWarning) {
      createUserAndSignIn(username, password, email, name);
      this.setState({
        redirect: true,
      });
    }
    // handle error here
  };

  /**
   * returns true if an email is qualified
   */
  qualifiedEmail = (email) => {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(email);
  };

  /**
   * returns true if password is 0 character long (user hasn't enter a password yet) or if the password is qualified (contains a number, character, and more than 8 chars long)
   */
  qualifiedPassword = (password) => {
    return (
      password.length === 0 ||
      (password.length >= 8 && /\d/.test(password) && /[A-z]/.test(password))
    );
  };

  /**
   * Create warnings if user has unqualified things in text fields
   */
  handleCreateWarnings() {
    const { email, password, confirmPassword } = this.state;

    this.setState({
      emailWarning: !this.qualifiedEmail(email),
    });
    this.setState({
      passWarning: !this.qualifiedPassword(password),
    });
    this.setState({
      passwordMatchWarning: password !== confirmPassword,
    });
  }

  render() {
    const {
      username,
      name,
      email,
      password,
      confirmPassword,
      openTerms,
      emailWarning,
      passWarning,
      passwordMatchWarning,
      redirect,
    } = this.state;
    const termsText = 'By clicking Resgister, you agree with our ';
    if (redirect) {
      return <Redirect exact to="/" />;
    }
    return (
      <Container maxWidth="lg">
        <Paper className="paper">
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
              error={emailWarning}
              helperText={emailWarning ? `Email needs to match the format example@domain.com` : ''}
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
              error={passWarning}
              helperText={
                passWarning
                  ? `Password needs to have at least 8 characters AND at least 1 number`
                  : ''
              }
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
              error={passwordMatchWarning}
              helperText={passwordMatchWarning ? `Password doesn't match` : ''}
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
              {termsText}
              <Link id="sign-up-terms-and-condition" onClick={this.handleTermsClick}>
                Terms and Conditions
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.register}
              disabled={passWarning || passwordMatchWarning}
            >
              Register
            </Button>
          </form>
          <TermsAndConditionsDialog open={openTerms} onClose={this.handleTermsClick} />
        </Paper>
      </Container>
    );
  }
}

SignUp.propTypes = {
  createUserAndSignIn: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  createUserAndSignIn: createUserAndSignInRedux,
};

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
