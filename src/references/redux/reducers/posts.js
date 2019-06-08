import { FETCH_POSTS } from '../actions/types';

export default (state = { 0: { name: '' } }, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
};
