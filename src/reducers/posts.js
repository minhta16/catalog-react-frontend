import { actionNameUtil } from 'middlewares/automate-async-action';
import { PostsType } from '../actions/types';

const initialState = {
  posts: {},
  loading: false,
  error: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionNameUtil.createRequest(PostsType.FETCH_POSTS):
      return { ...state, loading: true };
    case actionNameUtil.createSuccess(PostsType.FETCH_POSTS):
      return { ...state, posts: action.payload, error: '', loading: false };
    case actionNameUtil.createFailure(PostsType.FETCH_POSTS):
      return { ...state, posts: {}, error: action.payload, loading: false };
    default:
      return state;
  }
};
