import { ADD_POST, GET_POSTS } from '../actions/types';

export default (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.payload];
    case GET_POSTS:
      return state;
    default:
      return state;
  }
};
