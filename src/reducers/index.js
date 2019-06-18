import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';
import { currentUserReducer } from './users';
import miscReducer from './misc';

const rootReducer = combineReducers({
  categoriesReducer,
  postsReducer,
  currentUserReducer,
  miscReducer,
});

export default rootReducer;
