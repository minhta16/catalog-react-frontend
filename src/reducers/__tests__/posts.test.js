/* eslint-disable no-undef */
import { actionNameUtil } from 'middlewares/automate-async-action';
import postsReducer from '../posts';
import { PostsType } from '../../actions/types';

describe('reducers/posts', () => {
  it('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual({
      error: [],
      addPostSuccess: false,
      loading: false,
      posts: {},
    });
  });

  it('should return loading with FETCH_POSTS_REQUEST', () => {
    const action = {
      type: actionNameUtil.createRequest(PostsType.FETCH_POSTS),
    };
    expect(postsReducer({}, action)).toEqual({ loading: true });
  });

  it('should return the payload with FETCH_POSTS_SUCCESS', () => {
    const action = {
      type: actionNameUtil.createSuccess(PostsType.FETCH_POSTS),
      payload: 'yum',
    };
    expect(postsReducer({}, action)).toEqual({ posts: 'yum', error: [], loading: false });
  });

  it('should return the error with FETCH_POSTS_FAILURE', () => {
    const action = {
      type: actionNameUtil.createFailure(PostsType.FETCH_POSTS),
      payload: 'error',
    };
    expect(postsReducer({}, action)).toEqual({ posts: {}, error: 'error', loading: false });
  });
});
