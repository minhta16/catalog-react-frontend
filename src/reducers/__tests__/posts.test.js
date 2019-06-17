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

  it('should clear error with CLEAR_ERROR', () => {
    const action = {
      type: PostsType.CLEAR_ERROR,
    };
    expect(postsReducer({}, action)).toEqual({ error: [] });
  });

  it('should reset addPostSuccess RESET_ADD_POST_SUCCESS', () => {
    const action = {
      type: PostsType.RESET_ADD_POST_SUCCESS,
    };
    expect(postsReducer({}, action)).toEqual({ addPostSuccess: false });
  });

  it('should return loading with ADD_POST_REQUEST', () => {
    const action = {
      type: actionNameUtil.createRequest(PostsType.ADD_POST),
    };
    expect(postsReducer({}, action)).toEqual({ loading: true, addPostSuccess: false });
  });

  it('should return loading false and success with ADD_POST_SUCCESS', () => {
    const action = {
      type: actionNameUtil.createSuccess(PostsType.ADD_POST),
    };
    expect(postsReducer({}, action)).toEqual({ loading: false, addPostSuccess: true });
  });

  it('should return loading false and failure with ADD_POST_FAILURE', () => {
    const action = {
      type: actionNameUtil.createFailure(PostsType.ADD_POST),
      payload: 'meomeo',
    };
    expect(postsReducer({}, action)).toEqual({
      loading: false,
      addPostSuccess: false,
      error: 'meomeo',
    });
  });

  it('should return loading with MODIFY_POST_REQUEST', () => {
    const action = {
      type: actionNameUtil.createRequest(PostsType.MODIFY_POST),
    };
    expect(postsReducer({}, action)).toEqual({ loading: true, addPostSuccess: false });
  });

  it('should return loading false and success with MODIFY_POST_SUCCESS', () => {
    const action = {
      type: actionNameUtil.createSuccess(PostsType.MODIFY_POST),
    };
    expect(postsReducer({}, action)).toEqual({ loading: false, addPostSuccess: true });
  });

  it('should return loading false and failure with MODIFY_POST_FAILURE', () => {
    const action = {
      type: actionNameUtil.createFailure(PostsType.MODIFY_POST),
      payload: 'meomeo',
    };
    expect(postsReducer({}, action)).toEqual({
      loading: false,
      addPostSuccess: false,
      error: 'meomeo',
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
