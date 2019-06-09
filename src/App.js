import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CustomAppBar from 'components/CustomAppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import routes from 'routes';
import store from 'references/redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#411bd0',
    },
  },
});

const routing = (
  <Router>
    <Switch>
      {routes.map(route => (
        <Route key={route} exact={route.exact} path={route.path} component={route.view} />
      ))}
    </Switch>
  </Router>
);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar />
      <Toolbar />
      <div className="App">{routing}</div>
    </MuiThemeProvider>
  </Provider>
);

export default App;
