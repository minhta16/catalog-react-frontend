import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from 'routes';
import store from 'references/redux/store';

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
    <div className="App">{routing}</div>
  </Provider>
);

export default App;
