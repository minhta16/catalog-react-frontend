import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';

const rootReducer = combineReducers([categoriesReducer, postsReducer]);

export default rootReducer;
