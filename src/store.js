import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import automateAsyncAction from 'middlewares/automate-async-action';
import rootReducer from './reducers';
import {
  saveCategories,
  saveCurrentUser,
  loadCurrentUser,
  loadCategories,
  savePosts,
  loadPosts,
} from './localStorage';

const initialState = {
  categoriesReducer: loadCategories(),
  postsReducer: loadPosts(),
  currentUserReducer: loadCurrentUser(),
};
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk, automateAsyncAction)),
);

store.subscribe(() => {
  saveCategories(store.getState().categoriesReducer);
  saveCurrentUser(store.getState().currentUserReducer);
  savePosts(store.getState().postsReducer);
});
export default store;
