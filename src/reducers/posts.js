import { actionNameUtil } from 'middlewares/automate-async-action';
import { PostsType } from '../actions/types';

const initialState = {
  posts: {},
  loading: false,
  addPostSuccess: false,
  error: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case PostsType.CLEAR_ERROR:
      return { ...state, error: [] };
    case PostsType.RESET_ADD_POST_SUCCESS:
      return { ...state, addPostSuccess: false };
    case actionNameUtil.createRequest(PostsType.ADD_POST):
      return { ...state, loading: true, addPostSuccess: false };
    case actionNameUtil.createSuccess(PostsType.ADD_POST):
      return { ...state, loading: false, addPostSuccess: true };
    case actionNameUtil.createFailure(PostsType.ADD_POST):
      return { ...state, loading: false, addPostSuccess: false, error: action.payload };
    case actionNameUtil.createRequest(PostsType.MODIFY_POST):
      return { ...state, loading: true, addPostSuccess: false };
    case actionNameUtil.createSuccess(PostsType.MODIFY_POST):
      return { ...state, loading: false, addPostSuccess: true };
    case actionNameUtil.createFailure(PostsType.MODIFY_POST):
      return { ...state, loading: false, addPostSuccess: false, error: action.payload };
    case actionNameUtil.createRequest(PostsType.FETCH_POSTS):
      return { ...state, loading: true };
    case actionNameUtil.createSuccess(PostsType.FETCH_POSTS):
      return { ...state, posts: action.payload, error: [], loading: false };
    case actionNameUtil.createFailure(PostsType.FETCH_POSTS):
      return { ...state, posts: {}, error: action.payload, loading: false };
    default:
      return state;
  }
};
