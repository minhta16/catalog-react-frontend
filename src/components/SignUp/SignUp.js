/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TextField, Paper, Container, Typography, Button, Link } from '@material-ui/core';
import TermsAndConditionsDialog from 'components/SignUp/TermsAndConditionsDialog';
import { createUser as createUserRedux, clearError as clearErrorRedux } from 'actions/users';
import { openSnackbar as openSnackbarRedux } from 'actions/misc';
import { selectLoginErrorMessage, selectCreateAccountSuccess } from 'selectors/users';

export class SignUp extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    usernameWarning: false,
    emailWarning: false,
    passWarning: false,
    passwordMatchWarning: false,
    openTerms: false,
  };

  /**
   * Clear all errors when mount sign up
   */
  componentDidMount = () => {
    const { clearError } = this.props;
    clearError();
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
  register = (e) => {
    e.preventDefault();
    const { username, password, email, name, passwordMatchWarning, passWarning } = this.state;
    const { createUser } = this.props;
    if (!passwordMatchWarning && !passWarning) {
      createUser(username, password, email, name);
    }
    // handle error here
  };

  /**
   * returns true if an email is qualified
   */
  qualifiedUsername = (username) => {
    return username.length === 0 || username.length >= 5;
  };

  /**
   * returns true if an email is qualified
   */
  qualifiedEmail = (email) => {
    return email.length === 0 || /^\S+@[A-z]+\.[A-z]+$/.test(email);
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
    const { username, email, password, confirmPassword } = this.state;

    this.setState({
      usernameWarning: !this.qualifiedUsername(username),
      emailWarning: !this.qualifiedEmail(email),
      passWarning: !this.qualifiedPassword(password),
      passwordMatchWarning: password !== confirmPassword,
    });
  }

  render() {
    const { errorMessage, createAccountSuccess } = this.props;
    const {
      username,
      name,
      email,
      password,
      confirmPassword,
      openTerms,
      usernameWarning,
      emailWarning,
      passWarning,
      passwordMatchWarning,
    } = this.state;
    const termsText = 'By clicking Resgister, you agree with our ';
    if (createAccountSuccess) {
      return <Redirect exact to="/" />;
    }

    return (
      <Container maxWidth="lg">
        <Paper className="paper">
          <Typography variant="h4">Register now!</Typography>
          {/* Display error messages if they are available */}
          {errorMessage &&
            errorMessage.map((message) => (
              <Typography key={message} variant="body1" color="error">
                {`${message}`}
              </Typography>
            ))}
          <form autoComplete="off" onSubmit={this.register}>
            <TextField
              required
              error={usernameWarning}
              helperText={usernameWarning ? `Username needs to be at least 5 characters` : ''}
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
              type="submit"
              // disabled={usernameWarning || emailWarning || passWarning || passwordMatchWarning}
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
  createUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.array,
  createAccountSuccess: PropTypes.bool.isRequired,
  clearError: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  errorMessage: [],
};

const mapStateToProps = (state) => ({
  errorMessage: selectLoginErrorMessage(state),
  createAccountSuccess: selectCreateAccountSuccess(state),
});
const mapDispatchToProps = {
  createUser: createUserRedux,
  clearError: clearErrorRedux,
  openSnackbar: openSnackbarRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
