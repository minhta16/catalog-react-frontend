import { createStore, applyMiddleware } from 'redux';
import { compose } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
  posts: [],
};
const store = createStore(initialState, rootReducer, compose(applyMiddleware([thunk])));

export default store;
