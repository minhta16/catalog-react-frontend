import { ADD_POST, FETCH_POSTS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.payload];
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
};
