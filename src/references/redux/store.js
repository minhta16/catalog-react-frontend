import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { saveCategories, saveCurrentUser, loadCurrentUser, loadCategories } from './localStorage';

const initialState = { categories: loadCategories(), posts: {}, currentUser: loadCurrentUser() };
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
  saveCategories(store.getState().categories);
  saveCurrentUser(store.getState().currentUser);
});
export default store;
