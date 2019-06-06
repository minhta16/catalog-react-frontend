import React from 'react';
import Home from 'views/Home';
import { Provider } from 'react-redux';
import store from 'references/redux/store';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Home />
    </div>
  </Provider>
);

export default App;
