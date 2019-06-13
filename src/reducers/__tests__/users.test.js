/* eslint-disable no-undef */
import { usersReducer, currentUserReducer } from '../users';
import { FETCH_USERS, SIGN_IN } from '../../actions/types';

describe('reducers/users', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual({});
  });

  it('should return the payload with FETCH_USERS', () => {
    const action = {
      type: FETCH_USERS,
      payload: 'yum',
    };
    expect(usersReducer({}, action)).toEqual(action.payload);
  });

  it('should return the payload with SIGN_IN', () => {
    const action = {
      type: SIGN_IN,
      payload: 'yum',
    };
    expect(currentUserReducer({}, action)).toEqual(action.payload);
  });
});
