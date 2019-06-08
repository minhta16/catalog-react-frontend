import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';

const rootReducer = combineReducers({ categories: categoriesReducer, posts: postsReducer });

export default rootReducer;
