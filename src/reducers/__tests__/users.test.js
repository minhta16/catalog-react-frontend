/* eslint-disable no-undef */
import { usersReducer, currentUserReducer } from '../users';
import { UsersType } from '../../actions/types';

describe('reducers/users', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual({});
  });

  it('should return the payload with FETCH_USERS', () => {
    const action = {
      type: UsersType.FETCH_USERS,
      payload: 'yum',
    };
    expect(usersReducer({}, action)).toEqual(action.payload);
  });

  it('should return the payload with SIGN_IN', () => {
    const action = {
      type: UsersType.SIGN_IN,
      payload: { username: 'meomeo', token: 'abc' },
    };
    expect(currentUserReducer({}, action)).toEqual({
      username: 'meomeo',
      token: 'abc',
      posts: {},
      error: false,
      errorMessage: '',
    });
  });

  it('should return the payload with SIGN_OUT', () => {
    const action = {
      type: UsersType.SIGN_OUT,
      payload: 'yum',
    };
    expect(currentUserReducer({}, action)).toEqual({
      username: '',
      token: '',
      posts: {},
      error: false,
      errorMessage: '',
    });
  });

  it('should return the payload in post with FETCH_CURRENT_USER_POST', () => {
    const action = {
      type: UsersType.FETCH_CURRENT_USER_POST,
      payload: 'yum',
    };
    expect(currentUserReducer({}, action)).toEqual({ posts: action.payload });
  });

  it('should return the payload in post with  AUTH_ERROR', () => {
    const action = {
      type: UsersType.AUTH_ERROR,
      payload: 'yum',
    };
    expect(currentUserReducer({}, action)).toEqual({
      error: true,
      errorMessage: 'Invalid username or password. Try again.',
    });
  });
});
