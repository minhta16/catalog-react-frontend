import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';
import { currentUserReducer } from './users';

const rootReducer = combineReducers({
  categoriesReducer,
  postsReducer,
  currentUserReducer,
});

export default rootReducer;
