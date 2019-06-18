import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CustomAppBar from 'components/Shared/CustomAppBar';
import InfoSnackbar from 'components/Shared/InfoSnackbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'App.css';
import { fetchCategories as fetchCategoriesRedux } from 'actions/categories';
import {
  openSnackbar as openSnackbarRedux,
  closeSnackbar as closeSnackbarRedux,
} from 'actions/misc';

import routes from 'routes';
import { selectMiscSnackbarOpen, selectMiscSnackbarMessage } from 'selectors/misc';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#411bd0',
    },
    secondary: {
      main: '#fff',
    },
    overrides: {
      MuiAvatar: {
        colorDefault: {
          '& *': {
            backgroundColor: '#fdb600',
            color: '#fff',
          },
        },
      },
    },
  },
});

const routing = (
  <Switch>
    {routes.map((route) => (
      <Route key={route} exact={route.exact} path={route.path} component={route.view} />
    ))}
  </Switch>
);

export class App extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  render() {
    const { snackbarOpen, snackbarMess, closeSnackbar } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <CustomAppBar color="secondary" />
          <Toolbar style={{ minHeight: '6em' }} />
          <div className="App">{routing}</div>
        </Router>

        <InfoSnackbar open={snackbarOpen} onClose={closeSnackbar} message={snackbarMess} />
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  snackbarOpen: PropTypes.bool.isRequired,
  snackbarMess: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  snackbarOpen: selectMiscSnackbarOpen(state),
  snackbarMess: selectMiscSnackbarMessage(state),
});
export default connect(
  mapStateToProps,
  {
    fetchCategories: fetchCategoriesRedux,
    openSnackbar: openSnackbarRedux,
    closeSnackbar: closeSnackbarRedux,
  },
)(App);
