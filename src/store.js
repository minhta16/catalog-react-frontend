import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import automateAsyncAction from 'middlewares/automate-async-action';
import rootReducer from './reducers';
import { saveCurrentUser, loadCurrentUser } from './localStorage';

const initialState = {
  currentUserReducer: {
    currentUser: loadCurrentUser(),
    loading: false,
    error: {},
    createAccountSuccess: false,

    posts: {},
  },
};
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk, automateAsyncAction)),
);

store.subscribe(() => {
  saveCurrentUser(store.getState().currentUserReducer.currentUser);
});
export default store;
