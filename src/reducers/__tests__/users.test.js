/* eslint-disable no-undef */
import { actionNameUtil } from 'middlewares/automate-async-action';
import { currentUserReducer } from '../users';
import { UsersType } from '../../actions/types';

describe('reducers/users', () => {
  it('should return the initial state', () => {
    expect(currentUserReducer(undefined, {})).toEqual({
      currentUser: {
        username: '',
        token: '',
      },
      posts: {},
      loading: false,
      error: {},
      errorMessage: '',
    });
  });

  it('should return the username with SIGN_IN', () => {
    const action = {
      type: UsersType.SIGN_IN,
      username: 'yum',
    };
    expect(currentUserReducer({}, action)).toEqual({ currentUser: { username: 'yum' } });
  });

  it('should return loading with SIGN_IN_REQUEST', () => {
    const action = {
      type: actionNameUtil.createRequest(UsersType.SIGN_IN),
    };
    expect(currentUserReducer({}, action)).toEqual({ loading: true });
  });

  it('should return the token with SIGN_IN_SUCCESS', () => {
    const action = {
      type: actionNameUtil.createSuccess(UsersType.SIGN_IN),
      payload: { access_token: 'yum' },
    };
    expect(currentUserReducer({}, action)).toEqual({
      currentUser: {
        token: 'yum',
      },
      loading: false,
      error: {},
      errorMessage: '',
    });
  });

  it('should return the error with SIGN_IN_FAILURE', () => {
    const action = {
      type: actionNameUtil.createFailure(UsersType.SIGN_IN),
      payload: 'yum',
    };
    expect(currentUserReducer({}, action)).toEqual({
      error: 'yum',
      errorMessage: 'Invalid username or password. Try again.',
    });
  });

  it('should return the initialState with SIGN_OUT', () => {
    const action = {
      type: UsersType.SIGN_OUT,
    };
    expect(currentUserReducer({}, action)).toEqual({
      currentUser: {
        username: '',
        token: '',
      },
      posts: {},
      loading: false,
      error: {},
      errorMessage: '',
    });
  });

  it('should return loading with FETCH_CURRENT_USER_POST_REQUEST', () => {
    const action = {
      type: actionNameUtil.createRequest(UsersType.FETCH_CURRENT_USER_POST),
    };
    expect(currentUserReducer({}, action)).toEqual({ loading: true });
  });

  it('should return loading with FETCH_CURRENT_USER_POST_SUCCESS', () => {
    const action = {
      type: actionNameUtil.createSuccess(UsersType.FETCH_CURRENT_USER_POST),
      payload: [
        {
          id: '1',
        },
        {
          id: '2',
        },
      ],
    };
    expect(currentUserReducer({}, action)).toEqual({
      loading: false,
      posts: {
        1: {
          id: '1',
        },
        2: {
          id: '2',
        },
      },
      error: {},
      errorMessage: '',
    });
  });

  it('should return loading with FETCH_CURRENT_USER_POST_SUCCESS', () => {
    const action = {
      type: actionNameUtil.createFailure(UsersType.FETCH_CURRENT_USER_POST),
      payload: 'yum',
    };
    expect(currentUserReducer({}, action)).toEqual({
      loading: false,
      error: 'yum',
    });
  });
});
