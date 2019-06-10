import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';
import { currentUserReducer } from './users';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
