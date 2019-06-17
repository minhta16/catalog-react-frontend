import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CustomAppBar from 'components/Shared/CustomAppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'App.css';
import { fetchCategories as fetchCategoriesRedux } from 'actions/categories';

import routes from 'routes';

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

class App extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <CustomAppBar color="secondary" />
          <Toolbar style={{ minHeight: '6em' }} />
          <div className="App">{routing}</div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
};
export default connect(
  null,
  { fetchCategories: fetchCategoriesRedux },
)(App);
