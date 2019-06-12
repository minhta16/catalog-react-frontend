import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CustomAppBar from 'components/CustomAppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'App.css';

import routes from 'routes';
import store from 'references/redux/store';

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

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <CustomAppBar color="secondary" />
        <Toolbar style={{ minHeight: '6em' }} />
        <div className="App">{routing}</div>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

export default App;
